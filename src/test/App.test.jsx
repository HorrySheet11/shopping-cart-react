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

		const heading = screen.getByTestId("header");
		const links = screen.getAllByRole("link");

    expect(heading).toBeInTheDocument();
    expect(links).toHaveLength(3); // Assuming there are 3 links in the header

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Shopping/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cart/i })).toBeInTheDocument();
	});
});
