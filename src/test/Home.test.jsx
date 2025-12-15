import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "../components/Home.jsx";

vi.mock("@tanstack/react-query", () => {
	return {
		useQuery: vi.fn(),
	};
});

describe("Home component", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it("Renders loading state", () => {
		useQuery.mockReturnValue({
			data: null,
			isPending: true,
			error: null,
		});
		render(
			<Home />,
		);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("Renders Home and random dog", () => {
		const mockData = {
			message: "https://images.dog.ceo/breeds/husky/n02110182_1001.jpg",
		};
		useQuery.mockReturnValue({
			data: mockData,
			isPending: false,
			error: null,
		});
		render(<Home />);
		// screen.debug();
		expect(screen.getByText("Welcome to the Horry Shop!")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockData.message);
	});
});
