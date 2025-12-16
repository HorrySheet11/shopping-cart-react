import * as reactRouter from "react-router";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "../components/Cart.jsx";

vi.mock("@tanstack/react-query", () => {
	return {
		useQuery: vi.fn(),
	};
});

vi.mock("react-router", async () => ({
	...(await vi.importActual("react-router")),
	useOutletContext: vi.fn(),
}));

describe("Cart component", () => {
	it("Renders cart", () => {
		const mockContext = {
			handleCartData: vi.fn(),
			cart: [
				{
					id: 1,
					title: "Product 1",
					image: "https://via.placeholder.com/150",
					price: 10,
				},
			],
			deleteItem: vi.fn(),
			decreaseItem: vi.fn(),
		};

		vi.mocked(reactRouter.useOutletContext).mockReturnValue(mockContext);
		render(
			<reactRouter.BrowserRouter>
				<Cart />
			</reactRouter.BrowserRouter>,
		);
		expect(screen.getByText("Product 1")).toBeInTheDocument();
	});

	it("Empty cart", async () => {
		const mockContext = {
			handleCartData: vi.fn(),
			cart: [],
			deleteItem: vi.fn(),
			decreaseItem: vi.fn(),
		};

		vi.mocked(reactRouter.useOutletContext).mockReturnValue(mockContext);
		render(
			<reactRouter.BrowserRouter>
				<Cart />
			</reactRouter.BrowserRouter>,
		);
		expect(
			screen.getByText("Cart is empty, check out the Shop."),
		).toBeInTheDocument();
	})
  
  it('Checkout', () => {
    const mockContext = {
      handleCartData: vi.fn(),
      cart: [
        {
          id: 1,
          title: "Product 1",
          image: "https://via.placeholder.com/150",
          price: 10,
        },
      ],
      deleteItem: vi.fn(),
      decreaseItem: vi.fn(),
    };    
    vi.mocked(reactRouter.useOutletContext).mockReturnValue(mockContext);
    render(
      <reactRouter.BrowserRouter>
        <Cart />
      </reactRouter.BrowserRouter>,
    );
    expect(screen.getByText("Checkout Summary")).toBeInTheDocument();
  });
});
