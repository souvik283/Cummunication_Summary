import React from "react";

const TONE_STYLES = {
  warning: { bg: "#FCE7E1", iconColor: "#D9603F" },
  info: { bg: "#E9E4F7", iconColor: "#6E5AA6" },
};

const WarningIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
    <path
      d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkleIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path
      d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"
      strokeLinecap="round"
    />
  </svg>
);

const ICONS = {
  warning: WarningIcon,
  info: SparkleIcon,
};

const NotificationCard = ({ tone = "info", title, message, time }) => {
  const style = TONE_STYLES[tone] || TONE_STYLES.info;
  const Icon = ICONS[tone] || SparkleIcon;

  return (
    <div
      className="rounded-2xl p-4 border flex gap-3"
      style={{ background: "#FFFFFF", borderColor: "#E6E1D6" }}
    >
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ background: style.bg }}
      >
        <Icon color={style.iconColor} />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-snug" style={{ color: "#1A0F0B" }}>
            {title}
          </p>
          <span
            className="text-xs shrink-0"
            style={{ color: "#A39C8C", fontFamily: "monospace" }}
          >
            {time}
          </span>
        </div>
        <p className="text-sm mt-1" style={{ color: "#8A8474" }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;