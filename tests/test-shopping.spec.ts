import { test, expect, Page } from "@playwright/test";

test.beforeEach("Open the web page", async ({ page }) => {
  await page.goto("https://www.on.com/en-th/shop/shoes");
  async function closePopupWithEscape({ page }: { page: any }) {
    try {
      // Press Escape key to close popup
      await page.keyboard.press("Escape");
      console.log("Pressed Escape to close popup");

      // Wait a moment to see if popup closed
      await page.waitForTimeout(1000);

      // Check if popup still exists
      const popupStillExists =
        (await page.locator(".popup, .modal, .dialog").count()) > 0;
      return !popupStillExists;
    } catch (error) {
      console.error("Error closing popup with Escape:", error);
      return false;
    }
  }
  // Usage
  await closePopupWithEscape({ page });
});

test.describe("Test Web Clouds Shoes", () => {
  test("Select filter", async ({ page }) => {
    const spanWithText = page
      .locator("span")
      .filter({ hasText: "Show filters" })
      .first();
    await expect(spanWithText).toBeVisible();
    await page.getByText("Show filters").click();
  });

  test("Select : liftstyle", async ({ page }) => {
    // Get all links with the same data-test-id
    const allLinks = page.locator('a[data-test-id="seo-filter-link"]');
    const count = await allLinks.count();

    for (let i = 0; i < count; i++) {
      const link = allLinks.nth(i);
      const href = await link.getAttribute("href");
      const text = await link.textContent();
      console.log(`Link ${i}: "${text?.trim()}" -> ${href}`);

      // Click specific link based on href or text
      if (href === "/en-th/shop/shoes/active-life") {
        await link.click();
        break;
      }
    }
  });

  test("Select color: White", async ({ page }) => {
    const allLinks = page.locator('a[data-test-id="productCard-0"]');
    const count = await allLinks.count();

    for (let i = 0; i < count; i++) {
      const link = allLinks.nth(i);
      const href = await link.getAttribute("href");
      const text = await link.textContent();
      console.log(`Link ${i}: "${text?.trim()}" -> ${href}`);

      // Click specific link based on href or text
      if (
        href ===
        "/en-th/products/cloud-6-versa-w-3wf1003/womens/white-white-shoes-3WF10031200"
      ) {
        await link.click();
        break;
      }
    }
  });

  test("check item for price", async ({ page }) => {
    const productCard = page
      .locator(
        'a[href="/en-th/products/cloud-6-versa-w-3wf1003/womens/white-white-shoes-3WF10031200"]'
      )
      .first();

    const priceText = await productCard
      .locator('[data-test-id="product-price"], .price, span:has-text("THB")')
      .innerText();

    console.log("PRICE FOUND =>", priceText);

    expect(priceText).toMatch(/THB\s*6,600\.00/);
  })

  test("Input value search", async ({ page }) => {
    // Playwright's built-in drag method
    await page.locator("#search").dragTo(page.locator("#search-box"));
    await page
      .locator('[placeholder="Search for products and FAQs"]')
      .fill("6,600");

    //Check value fill-in
    await expect(
      page.locator('[placeholder="Search for products and FAQs"]')
    ).toHaveValue("6,600");
  })

});
