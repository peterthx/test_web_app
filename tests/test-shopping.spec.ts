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
        //console.log(wrapper)
    });

    test('Select checkbox', async ({ page }) => {
        const ulElements = await page.locator('[data-test-id="filter-white"]').all();
        for (let i = 0; i < ulElements.length; i++) {
            const ul = ulElements[i];

            // Get all li elements within this ul
            const liElements = await ul.locator('li').all();

            console.log(`UL ${i + 1} has ${liElements.length} items:`);

            for (let j = 0; j < liElements.length; j++) {
                const liText = await liElements[j].textContent();
                console.log(`  Item ${j + 1}: ${liText}`);
            }
        }

    });

});
