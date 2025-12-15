import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App.jsx";
import { MemoryRouter } from "react-router";


describe("App component", () => {
	it("renders correct heading", () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>,
		);
		// using regex with the i flag allows simpler case-insensitive comparison
		// expect(screen.getByRole("header").textContent).toMatch(/our first test/i);
		screen.debug();

		const heading = screen.getByTestId("header");
		const links = screen.getAllByRole("link");

    // Assert that the header and links are present in the document
    expect(heading).toBeInTheDocument();
    expect(links).toHaveLength(3); // Assuming there are 3 links in the header

    // You can also check if specific links are present
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Shopping/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cart/i })).toBeInTheDocument();
	});
});
