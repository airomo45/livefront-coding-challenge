import React from "react";
import "../styles/BadgeCard.css";

interface Props {
  label: string;
  backgroundColor?: string;
}

const BadgeCard: React.FC<Props> = ({ label, backgroundColor = "#D9D9D9" }) => {
  return (
    <span className="badge-card" style={{ backgroundColor }}>
      {label}
    </span>
  );
};

export default BadgeCard;
