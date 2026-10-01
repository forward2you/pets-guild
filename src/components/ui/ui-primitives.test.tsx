import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { FormField } from "./form-field";
import { ProgressBar } from "./progress-bar";

afterEach(cleanup);

describe("form and progress primitives", () => {
  it("connects a form error to its input", () => {
    render(<FormField id="pet-name" label="宠物名字" error="请填写名字" />);

    const input = screen.getByRole("textbox", { name: "宠物名字" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("请填写名字");
  });

  it("exposes bounded progress semantics", () => {
    render(<ProgressBar label="建档进度" value={120} />);

    expect(screen.getByRole("progressbar", { name: "建档进度" })).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });
});
