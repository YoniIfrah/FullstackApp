import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import MetadataTable from "./components/MetadataTable";

test("renders URL input fields", () => {
    render(<App />);
    const urlInputs = screen.getAllByRole("textbox");
    expect(urlInputs).toHaveLength(3);
});

test("displays loading state when form is submitted", () => {
    render(<App />);
    const urlInputs = screen.getAllByRole("textbox");
    urlInputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: `https://example${index + 1}.com` } });
    });

    const submitButton = screen.getByText("Submit URLs");
    fireEvent.click(submitButton);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
});
test("adds a new URL input field when 'Add another URL' button is clicked", () => {
    render(<App />);
    const addButton = screen.getByText("+ Add another URL");
    fireEvent.click(addButton);
    const urlInputs = screen.getAllByRole("textbox");
    expect(urlInputs).toHaveLength(4);
});
describe("MetadataTable", () => {
    test("renders table headers correctly", () => {
        const mockMetaData = [
            { url: "https://example.com", title: "Example", provider: "Test", description: "A test site" },
        ];

        render(<MetadataTable metaData={mockMetaData} />);

        expect(screen.getByText("URL")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Provider")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Icon")).toBeInTheDocument();
    });

    test("renders metadata correctly when all fields are present", () => {
        const mockMetaData = [
            {
                url: "https://example.com",
                title: "Example Site",
                provider: "Test Provider",
                description: "A test website",
                icon: "https://example.com/favicon.ico",
            },
        ];

        render(<MetadataTable metaData={mockMetaData} />);

        expect(screen.getByText("https://example.com")).toBeInTheDocument();
        expect(screen.getByText("Example Site")).toBeInTheDocument();
        expect(screen.getByText("Test Provider")).toBeInTheDocument();
        expect(screen.getByText("A test website")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/favicon.ico");
    });
});
