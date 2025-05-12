import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from "../../components/PaginationControls";

describe("PaginationControls", () => {
  test("should render Next button", () => {
    render(
      <PaginationControls page={2} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("should render Previous button", () => {
    render(
      <PaginationControls page={2} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });

  test("should render page indicator", () => {
    render(
      <PaginationControls page={2} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  test('should call onPageChange with page - 1 when clicking "Previous"', () => {
    const mockChange = jest.fn();
    render(
      <PaginationControls page={3} totalPages={5} onPageChange={mockChange} />
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(mockChange).toHaveBeenCalledWith(2);
  });

  test('should call onPageChange with page + 1 when clicking "Next"', () => {
    const mockChange = jest.fn();
    render(
      <PaginationControls page={3} totalPages={5} onPageChange={mockChange} />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockChange).toHaveBeenCalledWith(4);
  });

  test('should disable "Previous" on first page', () => {
    render(
      <PaginationControls page={1} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  test('should disable "Next" on last page', () => {
    render(
      <PaginationControls page={5} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
