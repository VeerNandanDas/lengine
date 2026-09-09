'use client';

import React from 'react';

export default function DarkGradientHero() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <section
        className="relative flex flex-col items-center justify-center 
                   w-full min-h-screen bg-black text-white 
                   bg-[url('https://cdn.21st.dev/assets/mirror/09/09bbb3e2821571d0229c113a8823333d32c9bf83242c9103a51b83495bf1a02f.svg')] 
                   bg-center bg-cover pb-16 pt-8"
      >
        <nav className="flex items-center border mx-auto w-full max-w-7xl px-6 py-4 border-slate-700 rounded-full text-white text-sm">
          <a href="https://prebuiltui.com" aria-label="PrebuiltUI home">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
              <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
              <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
              <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
            </svg>
          </a>

          <div className="hidden md:flex items-center gap-6 ml-7">
            {['Products', 'Stories', 'Pricing', 'Docs'].map((label) => (
              <a key={label} href="#" className="relative overflow-hidden h-6 group">
                <span className="block group-hover:-translate-y-full transition-transform duration-300">{label}</span>
                <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">{label}</span>
              </a>
            ))}
          </div>

          <div className="hidden ml-14 md:flex items-center gap-4">
            <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
              Contact
            </button>
            <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
              Get Started
            </button>
          </div>

          <button
            aria-label="Open menu"
            className="md:hidden text-gray-400 hover:text-gray-200"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div
            role="dialog"
            aria-modal="true"
            className={[
              'absolute top-0 left-0 w-full h-full bg-black text-base md:hidden flex-col items-center justify-center gap-4',
              mobileOpen ? 'flex' : 'hidden',
            ].join(' ')}
          >
            {['Products', 'Customer Stories', 'Pricing', 'Docs'].map((label) => (
              <a key={label} href="#" className="hover:text-indigo-400" onClick={() => setMobileOpen(false)}>
                {label}
              </a>
            ))}
            <button
              onClick={() => setMobileOpen(false)}
              className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
            >
              Get Started
            </button>
            <button
              aria-label="Close menu"
              className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-sm mt-24 mx-auto">
          <p>Explore how we help grow brands.</p>
          <a href="#" className="flex items-center gap-1 font-medium">
            Read more
            <svg className="mt-0.5" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3.959 9.5h11.083m0 0L9.501 3.96m5.541 5.54-5.541 5.542" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <h1 className="text-4xl md:text-6xl text-center font-semibold max-w-3xl mt-5 bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text">
          Solutions to Elevate Your Business Growth
        </h1>
        <p className="text-slate-300 md:text-base line-clamp-3 max-md:px-2 text-center max-w-2xl mt-3">
          Unlock potential with tailored strategies designed for success. Simplify challenges, maximize results, and stay ahead in the competitive market.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-8 text-sm">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-full">Get Started</button>
          <button className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-6 py-3">
            <span>Learn More</span>
            <svg className="mt-0.5" width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M1.25.5 4.75 4l-3.5 3.5" stroke="currentColor" strokeOpacity=".4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div aria-label="Photos of leaders" className="mt-12 flex max-md:overflow-x-auto gap-6 max-w-4xl w-full pb-6 mx-auto">
          <img alt="" className="w-36 h-44 rounded-lg hover:-translate-y-1 transition duration-300 object-cover flex-shrink-0" height={140} src="https://cdn.21st.dev/assets/mirror/d8/d8a5e2e999639e9a17284b0c687f631434e0db6d2c7ff5f792f0f242b4eb36a8.jpg" width={120} />
          <img alt="" className="w-36 h-44 rounded-lg hover:-translate-y-1 transition duration-300 object-cover flex-shrink-0" height={140} src="https://cdn.21st.dev/assets/mirror/de/decf14ef35a1f0a4f05df36bc83b2fe652f55e99abbd0c222f604d2c42e39920.jpg" width={120} />
          <img alt="" className="w-36 h-44 rounded-lg hover:-translate-y-1 transition duration-300 object-cover flex-shrink-0" height={140} src="https://cdn.21st.dev/assets/mirror/46/46be4412979e3df52f8e02799976ca346e21d3a486012156f65aa9c6a3fc101c.jpg" width={120} />
          <img alt="" className="w-36 h-44 rounded-lg hover:-translate-y-1 transition duration-300 object-cover flex-shrink-0" height={140} src="https://cdn.21st.dev/assets/mirror/00/0066420fa3838dc3237ebb7ff9ba2669e1572de7dc4192f8806c3d705e90329c.jpg" width={120} />
          <img alt="" className="w-36 h-44 rounded-lg hover:-translate-y-1 transition duration-300 object-cover flex-shrink-0" height={140} src="https://cdn.21st.dev/assets/mirror/4f/4f7814b6e60af446617cc970abc54073c0dfec0ab59099b39a29a5ebb31d81a8.jpg" width={120} />
        </div>
      </section>
    </>
  );
}
