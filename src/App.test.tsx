import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/NavBar", () => () => <div data-testid="navbar" />);
jest.mock("./pages/ListPage", () => () => <div data-testid="list-page" />);
jest.mock("./pages/DetailPage", () => () => <div data-testid="detail-page" />);

describe("App routing", () => {
  test("should render ListPage at root route", () => {
    render(<App />);

    expect(screen.getByTestId("list-page")).toBeInTheDocument();
  });
  test("should render NavBar for all routes", () => {
    render(<App />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
});
