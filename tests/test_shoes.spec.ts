import { test, expect } from "@playwright/test";

test.beforeEach("Open the web page", async ({ page }) => {
  await page.goto("https://www.on.com/en-th/shop/womens/shoes");
  async function closePopupWithEscape({ page }: { page: any }) {
    try {
      // Press Escape key to close popup
      await page.keyboard.press("Escape");
      // console.log("Pressed Escape to close popup");

      // Wait briefly for animation/transition
      await page.waitForTimeout(500);

      // Check multiple common popup selectors
      const popupSelectors = [
        ".popup",
        ".modal",
        ".dialog",
        '[role="dialog"]',
        '[role="alertdialog"]',
        ".overlay",
        ".lightbox",
      ];

      // Check if any popup still exists
      for (const selector of popupSelectors) {
        const count = await page.locator(selector).count();
        if (count > 0) {
          // Verify it's actually visible
          const isVisible = await page
            .locator(selector)
            .first()
            .isVisible()
            .catch(() => false);
          if (isVisible) {
            // console.log(`Popup still visible: ${selector}`);
            return false;
          }
        }
      }

      // console.log("Popup successfully closed");
      return true;
    } catch (error) {
      console.error("Error closing popup with Escape:", error);
      return false;
    }
  }

  // Usage
  const closed = await closePopupWithEscape({ page });
  if (!closed) {
    // console.log("Popup may still be open, trying alternative methods...");
  }
});

test.describe("Flow check price a shoes", async () => {
  test("Check page title", async ({ page }) => {
    const pageTitle = page.locator('h1[data-test-id="pageTitle"]');

    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toHaveText("Women’s shoes");
  });

  test("Show filters", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Show filters" })
    ).toBeVisible();
  });

  test("Select : liftstyle", async ({ page }) => {
    const allLinks = page.locator('a[data-test-id="seo-filter-link"]');
    const count = await allLinks.count();

    for (let i = 0; i < count; i++) {
      const link = allLinks.nth(i);
      const href = await link.getAttribute("href");
      const text = await link.textContent();
      // console.log(`Link ${i}: "${text?.trim()}" -> ${href}`);

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
      // console.log(`Link ${i}: "${text?.trim()}" -> ${href}`);

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
    // Locate product card based on the product link
    const productCard = page
      .locator('a[href*="cloud-6-3wf1006"]')
      .locator("xpath=..")
      .first();

    // Price locator inside the card
    const price = productCard.locator("text=/THB.*6,?200/");

    // Single combined assertion is more efficient
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/THB.*6,200/);

    // console.log("PRICE FOUND =>", await price.textContent());
  });

  test("Input value search with drag", async ({ page }) => {
    const searchTrigger = page.locator("#search");
    const searchInput = page.locator(
      '[placeholder="Search for products and FAQs"]'
    );

    // Drag to open search (if this is a modal/dropdown trigger)
    await searchTrigger.dragTo(page.locator("#search-box"));

    // Wait for search input to be visible
    await searchInput.waitFor({ state: "visible" });

    // Fill and verify
    await searchInput.fill("6,200");
    await expect(searchInput).toHaveValue("6,200");

    // console.log("Search opened, price entered and verified");
  });
});
