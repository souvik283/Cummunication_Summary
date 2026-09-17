import React, { useEffect } from "react";
import { useSummaryStore } from "../store/useSummaryStore";

const AISummaryCard = ({ summary2, updatedAt, onRefresh, loading }) => {
  const {getSummary, isGettingSummary, summary} = useSummaryStore()
  useEffect(()=>{
    getSummary()
  }, [getSummary])

  if(isGettingSummary){
return(
  <div>

  </div>
)
  }

  return (
    <div
      className="mx-6 mt-4 rounded-2xl p-4 border"
      style={{ background: "#161D26", borderColor: "#232C37" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-6 h-6 rounded-md"
            style={{ background: "#232C37" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" strokeWidth="2">
              <path
                d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-sm font-semibold" style={{ color: "#F4F1EC" }}>
            AI Summary
          </span>
          <span className="text-xs" style={{ color: "#5C6673" }}>
            · updated {updatedAt}
          </span>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition-colors disabled:opacity-60"
          style={{ background: "#232C37", color: "#C7CFD9" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={loading ? "animate-spin" : ""}
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36" strokeLinecap="round" />
            <path d="M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Refresh
        </button>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "#C7CFD9" }}>
        {summary}
      </p>
    </div>
  );
};

export default AISummaryCard;