import { test, expect } from '@playwright/test'

const base_url = 'https://www.on.com/en-th/shop/womens/shoes'

test.describe('Test web shopping', () => {
    test('Open the web in url', async ({ page }) => {
        await page.goto(`${base_url}`);
        const pageTitle = 'Women’s shoes';
        const titleText = page.locator('[data-test-id="pageTitle"]');
        await expect(titleText).toHaveText(pageTitle)
    });

    test('Click show to filter', async ({ page }) => {
        await page.goto(`${base_url}`);
        const button = page.locator('button:has(span:text("Show filters"))');
        await expect(button).toHaveText('Show filters')
    });

    test('Click Activity : Lifestyle', async ({ page }) => {
        await page.goto(`${base_url}`);
        await page.getByRole('link', { name: 'Lifestyle' }).click();
    });

    test('Click Color : white', async ({ page }) => {
        await page.goto(`${base_url}`);
        const wrapper = page.getByTestId('main-filter-white');
        //     const text = await wrapper.textContent(); // Returns string
        //     console.log(text)

        //    // expect(wrapper).toHaveValues('white')

    })

})

