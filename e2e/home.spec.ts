import { expect, test } from "@playwright/test";

test("home exposes both onboarding paths and all pet entries", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /从选对伙伴开始/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "帮我选择" })).toHaveAttribute("href", "/match");
  await expect(page.getByRole("link", { name: "我已经决定了" })).toHaveAttribute("href", "#pets");

  for (const name of ["狗狗", "猫咪", "鱼儿", "乌龟", "鹦鹉"]) {
    await expect(page.getByRole("link", { name: `了解${name}是否适合你` })).toBeVisible();
  }
});

test("mobile home does not overflow horizontally", async ({ page }) => {
  await page.goto("/");

  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
});
