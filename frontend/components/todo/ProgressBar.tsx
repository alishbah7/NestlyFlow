"use client";

import React from "react";
import "./todo.css";

interface ProgressBarProps {
  total: number;
  completed: number;
  remaining: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  total,
  completed,
  remaining,
}) => {
  const percent = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-stats">
        <span>Total: {total}</span>
        <span>Completed: {completed}</span>
        <span>Remaining: {remaining}</span>
      </div>

      <div className="progress-bar-background">
        <div
          className="progress-bar-foreground"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
