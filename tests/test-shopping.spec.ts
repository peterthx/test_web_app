import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.on.com/en-th/shop/womens/shoes');
});

test.describe('Test web shopping', () => {
    test('Open the web in url', async ({ page }) => {
        const pageTitle = 'Women’s shoes';
        const titleText = page.locator('[data-test-id="pageTitle"]');
        await expect(titleText).toHaveText(pageTitle)
    });

    test('Click show to filter', async ({ page }) => {
        const button = page.locator('button:has(span:text("Show filters"))');
        await expect(button).toHaveText('Show filters')
    });

    test('Click Activity : Lifestyle and select color', async ({ page }) => {
        await page.getByRole('link', { name: 'Lifestyle' }).click();
        const wrapper = page.getByTestId('main-filter-white');
        console.log(wrapper)
    });

});

