-- ============================================================
-- Phase 4: Contact Enrichment Credit System
-- Run this in Supabase SQL Editor or via `supabase db push`
-- ============================================================

-- 1. User Credits Table
-- Tracks each user's remaining contact unlock credits
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INT NOT NULL DEFAULT 5 CHECK (balance >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own credits
CREATE POLICY "Users can view their own credits"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON public.user_credits FOR UPDATE
  USING (auth.uid() = user_id);

-- Auto-create credit row on signup (via trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user_credits()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, balance)
  VALUES (NEW.id, 5)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_credits
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_credits();

-- ============================================================

-- 2. Contact Unlocks Table
-- Audit log of which contacts each user has unlocked
CREATE TABLE IF NOT EXISTS public.contact_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  buyer_id TEXT NOT NULL,
  contact_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, buyer_id, contact_id)
);

-- Enable RLS
ALTER TABLE public.contact_unlocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own unlocks"
  ON public.contact_unlocks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own unlocks"
  ON public.contact_unlocks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================

-- 3. Atomic Credit Deduction RPC
-- Ensures transactional safety: checks balance, deducts, logs unlock
CREATE OR REPLACE FUNCTION public.deduct_credit(
  p_user_id UUID,
  p_buyer_id TEXT,
  p_contact_id TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_current_balance INT;
  v_already_unlocked BOOLEAN;
  v_new_balance INT;
BEGIN
  -- Check if already unlocked
  SELECT EXISTS(
    SELECT 1 FROM public.contact_unlocks
    WHERE user_id = p_user_id
      AND buyer_id = p_buyer_id
      AND contact_id = p_contact_id
  ) INTO v_already_unlocked;

  IF v_already_unlocked THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'already_unlocked'
    );
  END IF;

  -- Lock the row for update to prevent race conditions
  SELECT balance INTO v_current_balance
  FROM public.user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- If no credit row exists, create one with default balance
  IF v_current_balance IS NULL THEN
    INSERT INTO public.user_credits (user_id, balance)
    VALUES (p_user_id, 5);
    v_current_balance := 5;
  END IF;

  -- Check sufficient balance
  IF v_current_balance <= 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'insufficient_credits',
      'balance', 0
    );
  END IF;

  -- Deduct credit
  v_new_balance := v_current_balance - 1;

  UPDATE public.user_credits
  SET balance = v_new_balance,
      updated_at = now()
  WHERE user_id = p_user_id;

  -- Record unlock
  INSERT INTO public.contact_unlocks (user_id, buyer_id, contact_id)
  VALUES (p_user_id, p_buyer_id, p_contact_id);

  RETURN jsonb_build_object(
    'success', true,
    'new_balance', v_new_balance
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Atomic Batch Credit Deduction RPC (Unlocks full company suite for 5 credits)
CREATE OR REPLACE FUNCTION public.deduct_credits_batch(
  p_user_id UUID,
  p_buyer_id TEXT,
  p_amount INT DEFAULT 5
)
RETURNS JSONB AS $$
DECLARE
  v_current_balance INT;
  v_already_unlocked BOOLEAN;
  v_new_balance INT;
BEGIN
  -- Check if already unlocked for this buyer
  SELECT EXISTS(
    SELECT 1 FROM public.contact_unlocks
    WHERE user_id = p_user_id
      AND buyer_id = p_buyer_id
  ) INTO v_already_unlocked;

  IF v_already_unlocked THEN
    RETURN jsonb_build_object(
      'success', true,
      'already_unlocked', true,
      'message', 'Buyer contacts were already unlocked'
    );
  END IF;

  SELECT balance INTO v_current_balance
  FROM public.user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF v_current_balance IS NULL THEN
    INSERT INTO public.user_credits (user_id, balance)
    VALUES (p_user_id, 15);
    v_current_balance := 15;
  END IF;

  IF v_current_balance < p_amount THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'insufficient_credits',
      'balance', v_current_balance
    );
  END IF;

  v_new_balance := v_current_balance - p_amount;

  UPDATE public.user_credits
  SET balance = v_new_balance,
      updated_at = now()
  WHERE user_id = p_user_id;

  INSERT INTO public.contact_unlocks (user_id, buyer_id, contact_id)
  VALUES (p_user_id, p_buyer_id, 'all_contacts')
  ON CONFLICT DO NOTHING;

  RETURN jsonb_build_object(
    'success', true,
    'new_balance', v_new_balance
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

