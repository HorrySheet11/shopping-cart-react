import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import * as reactRouter from 'react-router';
import { describe, expect, it, vi } from "vitest";
import Shopping from "../components/Shopping.jsx";

vi.mock("@tanstack/react-query", () => {
	return {
		useQuery: vi.fn(),
	};
});

vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useOutletContext: vi.fn(),
}));

describe("Shopping component", () => {

	it("Renders loading state", () => {
		useQuery.mockReturnValue({
			data: null,
			isPending: true,
			error: null,
		});
    const mockContext = {
      handleCartData: vi.fn(),
    };
    vi.mocked(reactRouter.useOutletContext).mockReturnValue(mockContext);
		render(
				<Shopping />
		);
		expect(screen.getByText("Loading products...")).toBeInTheDocument();
	});

	it("Renders products", () => {
		const mockData = {
			data: [
				{ id: 1, title: "Product 1", image: "https://via.placeholder.com/150" },
				{ id: 2, title: "Product 2", image: "https://via.placeholder.com/150" },
			],
		};

		useQuery.mockReturnValue(mockData);
		render(<Shopping />);
		expect(screen.getByText("Product 1")).toBeInTheDocument();
		expect(screen.getByText("Product 2")).toBeInTheDocument();
	});

  it('Adds item to cart', () => {
    const mockData = {
      data: [
        { id: 1, title: "Product 1", image: "https://via.placeholder.com/150" },
        { id: 2, title: "Product 2", image: "https://via.placeholder.com/150" },
      ],
    };

    useQuery.mockReturnValue(mockData);
    const mockContext = {
      handleCartData: vi.fn(),
    };
    vi.mocked(reactRouter.useOutletContext).mockReturnValue(mockContext);
    render(<Shopping />);
    const product = screen.getByTestId("Product 1-button");
    product.click();
    expect(mockContext.handleCartData).toHaveBeenCalledTimes(1);
    expect(mockContext.handleCartData).toHaveBeenCalledWith({ id: 1, title: "Product 1", image: "https://via.placeholder.com/150" });
    // screen.debug();
  })
});
