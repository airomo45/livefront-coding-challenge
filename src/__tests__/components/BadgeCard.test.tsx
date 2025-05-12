import React from "react";
import { render, screen } from "@testing-library/react";
import BadgeCard from "../../components/BadgeCard";

describe("BadgeCard", () => {
  test("should render label text", () => {
    render(<BadgeCard label="Electric" />);
    expect(screen.getByText("Electric")).toBeInTheDocument();
  });

  test("should uses default background color if no color prop is provided", () => {
    render(<BadgeCard label="Fire" />);
    const badge = screen.getByText("Fire");
    expect(badge).toHaveStyle({ backgroundColor: "#D9D9D9" });
  });

  test("should apply background color when prop is provided", () => {
    render(<BadgeCard label="water" backgroundColor="#000" />);
    const badge = screen.getByText("water");
    expect(badge).toHaveStyle({ backgroundColor: "#000" });
  });
});
