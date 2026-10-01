import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import HomePage from "./page";

afterEach(cleanup);

describe("HomePage", () => {
  it("offers both starting paths without requiring registration", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /从选对伙伴开始/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /帮我选择|开始适宠测评/ }).length).toBeGreaterThan(
      0,
    );
    expect(screen.getByRole("link", { name: "我已经决定了" })).toHaveAttribute("href", "#pets");
    expect(screen.getByText("无需注册")).toBeInTheDocument();
  });

  it("links to all five pet guide entries", () => {
    render(<HomePage />);

    const expectedLinks = [
      ["狗狗", "/guides/dog"],
      ["猫咪", "/guides/cat"],
      ["鱼儿", "/guides/fish"],
      ["乌龟", "/guides/turtle"],
      ["鹦鹉", "/guides/parrot"],
    ];

    expectedLinks.forEach(([name, href]) => {
      expect(screen.getByRole("link", { name: `了解${name}是否适合你` })).toHaveAttribute(
        "href",
        href,
      );
    });
  });
});
