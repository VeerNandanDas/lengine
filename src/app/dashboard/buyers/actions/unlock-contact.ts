"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  getUnmaskedContact,
  getAllUnmaskedContacts,
  UnlockedDecisionMaker,
} from "@/lib/contacts-data";

export interface UnlockResult {
  success: boolean;
  contact?: UnlockedDecisionMaker;
  newBalance?: number;
  error?: string;
}

export interface UnlockAllContactsResult {
  success: boolean;
  contacts?: UnlockedDecisionMaker[];
  newBalance?: number;
  error?: string;
}

/**
 * Server Action to unlock ALL decision makers for a buyer by deducting 5 credits.
 * Supports both real Supabase auth with RPC and demo session mode.
 */
export async function unlockAllContacts(
  buyerId: string
): Promise<UnlockAllContactsResult> {
  let userId: string | null = null;
  let useDemo = false;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    userId = data?.user?.id ?? null;
  } catch {
    // Supabase client may throw if URL/key is placeholder
  }

  // Fallback to demo session
  if (!userId) {
    const cookieStore = await cookies();
    const demoSession = cookieStore.get("demo_session")?.value;
    if (demoSession) {
      userId = "demo-user";
      useDemo = true;
    }
  }

  if (!userId) {
    return { success: false, error: "not_authenticated" };
  }

  // --- Demo mode: trust client-side local credit tracking ---
  if (useDemo) {
    const contacts = getAllUnmaskedContacts(buyerId);
    if (!contacts.length) {
      return { success: false, error: "contacts_not_found" };
    }

    return {
      success: true,
      contacts,
      newBalance: undefined,
    };
  }

  // --- Production mode: Supabase RPC (deducts 5 credits) ---
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("deduct_credits_batch", {
      p_user_id: userId,
      p_buyer_id: buyerId,
      p_amount: 5,
    });

    if (error) {
      console.warn("RPC deduct_credits_batch note:", error.message);
      // Fallback in case RPC function isn't yet migrated in Supabase cloud
      const contacts = getAllUnmaskedContacts(buyerId);
      return { success: true, contacts };
    }

    const rpcResult = data as { success: boolean; new_balance?: number; error?: string };

    if (!rpcResult.success) {
      return {
        success: false,
        error: rpcResult.error ?? "insufficient_credits",
      };
    }

    const contacts = getAllUnmaskedContacts(buyerId);
    return {
      success: true,
      contacts,
      newBalance: rpcResult.new_balance,
    };
  } catch (err) {
    console.error("Unlock all contacts error:", err);
    const contacts = getAllUnmaskedContacts(buyerId);
    return { success: true, contacts };
  }
}

/**
 * Legacy Server Action to unlock a single contact (1 credit).
 */
export async function unlockContact(
  buyerId: string,
  contactId: string
): Promise<UnlockResult> {
  let userId: string | null = null;
  let useDemo = false;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    userId = data?.user?.id ?? null;
  } catch {
    // Supabase client may throw if URL/key is placeholder
  }

  if (!userId) {
    const cookieStore = await cookies();
    const demoSession = cookieStore.get("demo_session")?.value;
    if (demoSession) {
      userId = "demo-user";
      useDemo = true;
    }
  }

  if (!userId) {
    return { success: false, error: "not_authenticated" };
  }

  if (useDemo) {
    const contact = getUnmaskedContact(buyerId, contactId);
    if (!contact) {
      return { success: false, error: "contact_not_found" };
    }
    return {
      success: true,
      contact,
      newBalance: undefined,
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("deduct_credit", {
      p_user_id: userId,
      p_buyer_id: buyerId,
      p_contact_id: contactId,
    });

    if (error) {
      console.error("RPC error:", error);
      const contact = getUnmaskedContact(buyerId, contactId);
      return { success: true, contact: contact ?? undefined };
    }

    const rpcResult = data as { success: boolean; new_balance?: number; error?: string };
    if (!rpcResult.success) {
      return {
        success: false,
        error: rpcResult.error ?? "unknown_error",
      };
    }

    const contact = getUnmaskedContact(buyerId, contactId);
    return {
      success: true,
      contact: contact ?? undefined,
      newBalance: rpcResult.new_balance,
    };
  } catch (err) {
    console.error("Unlock contact error:", err);
    return { success: false, error: "server_error" };
  }
}
