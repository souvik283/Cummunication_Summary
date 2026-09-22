import React from "react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F4F1EC" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap"
      />

      <style>{`
        @keyframes float-slow {
          0%   { transform: translateY(0px) translateX(0px); }
          50%  { transform: translateY(-18px) translateX(6px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes float-slower {
          0%   { transform: translateY(0px) translateX(0px); }
          50%  { transform: translateY(14px) translateX(-8px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes fade-up {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        .anim-fade-up-1 { animation: fade-up 0.7s ease-out 0.05s both; }
        .anim-fade-up-2 { animation: fade-up 0.7s ease-out 0.2s both; }
        .anim-fade-up-3 { animation: fade-up 0.7s ease-out 0.35s both; }
        .anim-float-a { animation: float-slow 6s ease-in-out infinite; }
        .anim-float-b { animation: float-slower 7.5s ease-in-out infinite; }
        .anim-float-c { animation: float-slow 5.2s ease-in-out infinite; }
        .anim-pulse-dot { animation: pulse-dot 1.6s ease-in-out infinite; }
      `}</style>

      {/* Hero */}
      <section
        className="relative overflow-hidden h-screen"
        style={{ background: "#10151C" }}
      >
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
          style={{ background: "#FF6B4A" }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{ background: "#4E7C6C" }}
        />

        {/* Nav */}
        <div className="relative flex items-center justify-between px-6 sm:px-10 py-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF6B4A" }} />
            <span
              className="text-lg"
              style={{ fontFamily: "'Fraunces', serif", color: "#F4F1EC" }}
            >
              BrieflyAI
            </span>
          </div>
          <Link
            to="/login"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ color: "#F4F1EC", background: "rgba(255,255,255,0.06)" }}
          >
            Log in
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative px-6 sm:px-10 pt-10 pb-28 sm:pt-16 sm:pb-36 max-w-3xl">
          <p
            className="anim-fade-up-1 inline-flex items-center gap-2 text-xs font-medium tracking-wide px-3 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,107,74,0.12)", color: "#FF9A82" }}
          >
            <span className="anim-pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: "#FF6B4A" }} />
            Built for engineering teams
          </p>

          <h1
            className="anim-fade-up-2 text-4xl sm:text-5xl leading-[1.15] mb-5"
            style={{ fontFamily: "'Fraunces', serif", color: "#F4F1EC" }}
          >
            Know where every project
            <br />
            <span style={{ fontStyle: "italic", color: "#FF9A82" }}>really</span> stands.
          </h1>

          <p
            className="anim-fade-up-2 text-base sm:text-lg mb-9 max-w-xl"
            style={{ color: "#A9B2BD" }}
          >
            Loop turns your team's channel chatter into a live, AI-generated
            summary of project status — so managers stop asking "any update?"
            and developers stop repeating themselves.
          </p>

          <div className="anim-fade-up-3 flex items-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#FF6B4A", color: "#1A0F0B" }}
            >
              Get Started
            </Link>
            <span className="text-sm" style={{ color: "#5C6673" }}>
              No credit card needed
            </span>
          </div>
        </div>

        {/* Floating decorative chat bubbles */}
        <div className="hidden md:block absolute right-10 top-24 w-[340px]">
          <div
            className="anim-float-a absolute right-0 top-0 rounded-2xl rounded-br-sm px-4 py-2 text-sm shadow-lg"
            style={{ background: "#232C37", color: "#C7CFD9" }}
          >
            backend: auth endpoints done ✅
          </div>
          <div
            className="anim-float-b absolute right-16 top-24 rounded-2xl rounded-br-sm px-4 py-2 text-sm shadow-lg"
            style={{ background: "#FF6B4A", color: "#1A0F0B" }}
          >
            AI summary ready for #frontend
          </div>
          <div
            className="anim-float-c absolute right-2 top-48 rounded-2xl rounded-br-sm px-4 py-2 text-sm shadow-lg"
            style={{ background: "#232C37", color: "#C7CFD9" }}
          >
            website redesign: at risk ⚠️
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 sm:px-10 py-16 sm:py-20 max-w-5xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl mb-3"
          style={{ fontFamily: "'Fraunces', serif", color: "#1A0F0B" }}
        >
          Everything status meetings were trying to do.
        </h2>
        <p className="text-sm sm:text-base mb-12 max-w-xl" style={{ color: "#8A8474" }}>
          Channels, updates and an AI that reads the room so you don't have to.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            className="rounded-2xl p-6 border"
            style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg mb-4"
              style={{ background: "#FCEAE3" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9603F" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <h3 className="text-base font-semibold mb-1.5" style={{ color: "#1A0F0B" }}>
              Project channels
            </h3>
            <p className="text-sm" style={{ color: "#8A8474" }}>
              Full-stack, backend, frontend — one channel per slice of the
              project, so updates land where the right people can see them.
            </p>
          </div>

          <div
            className="rounded-2xl p-6 border"
            style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg mb-4"
              style={{ background: "#EDE9FB" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B4FCF" strokeWidth="2">
                <path
                  d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <h3 className="text-base font-semibold mb-1.5" style={{ color: "#1A0F0B" }}>
              AI status summaries
            </h3>
            <p className="text-sm" style={{ color: "#8A8474" }}>
              Loop reads every channel's activity and writes a plain-English
              summary of where the project actually stands, on demand.
            </p>
          </div>

          <div
            className="rounded-2xl p-6 border"
            style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg mb-4"
              style={{ background: "#E4F3EB" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E9B63" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="text-base font-semibold mb-1.5" style={{ color: "#1A0F0B" }}>
              One-line status updates
            </h3>
            <p className="text-sm" style={{ color: "#8A8474" }}>
              Anyone on the team can drop a quick update in a channel —
              no forms, no tickets, no status-meeting dread.
            </p>
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section
        className="px-6 sm:px-10 py-14 text-center"
        style={{ background: "#10151C" }}
      >
        <h2
          className="text-2xl sm:text-3xl mb-4"
          style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#F4F1EC" }}
        >
          Give your team a status update, without the meeting.
        </h2>
        <Link
          to="/login"
          className="inline-flex items-center justify-center h-12 px-7 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: "#FF6B4A", color: "#1A0F0B" }}
        >
          Get Started
        </Link>
        <p className="text-xs mt-8" style={{ color: "#5C6673" }}>
          © {new Date().getFullYear()} Loop. All rights reserved.
        </p>
      </section>
    </div>
  );
};

export default HomePage;