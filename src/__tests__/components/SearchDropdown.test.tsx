import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchDropdown from "../../components/SearchDropdown";

describe("SearchDropdown", () => {
  test("should render nothing when results are empty", () => {
    const { container } = render(
      <SearchDropdown results={[]} onSelect={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("should render list items when pokemons match search terms", () => {
    render(
      <SearchDropdown
        results={[{ name: "pikachu" }, { name: "charmander" }]}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  test("should call onSelect with correct name when item is clicked", () => {
    const mockOnSelect = jest.fn();

    render(
      <SearchDropdown
        results={[{ name: "bulbasaur" }]}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByText("bulbasaur"));
    expect(mockOnSelect).toHaveBeenCalledWith("bulbasaur");
  });
});
