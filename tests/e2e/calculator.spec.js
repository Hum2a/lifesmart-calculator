const { test, expect } = require('@playwright/test');

test.describe('LifeSmart Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load the calculator page', async ({ page }) => {
    // Check if the main heading is visible
    await expect(page.getByText('Stop paying card interest — invest it instead')).toBeVisible();

    // Check if the calculator form is present
    await expect(page.getByText('Your current card — inputs')).toBeVisible();

    // Check if the investment calculator is present
    await expect(page.getByText('Investment Calculator Settings')).toBeVisible();
  });

  test('should have working input fields', async ({ page }) => {
    // Test monthly spend input
    const monthlySpendInput = page.getByPlaceholder('2000');
    await expect(monthlySpendInput).toBeVisible();
    await monthlySpendInput.fill('3000');
    await expect(monthlySpendInput).toHaveValue('3000');

    // Test APR input
    const aprInput = page.getByPlaceholder('23');
    await expect(aprInput).toBeVisible();
    await aprInput.fill('25');
    await expect(aprInput).toHaveValue('25');

    // Test balance carried slider
    const balanceSlider = page.locator('input[type="range"]');
    await expect(balanceSlider).toBeVisible();
    await balanceSlider.fill('30');
    await expect(balanceSlider).toHaveValue('30');
  });

  test('should calculate results correctly', async ({ page }) => {
    // Fill in test values
    await page.getByPlaceholder('2000').fill('2000');
    await page.getByPlaceholder('23').fill('23');
    await page.locator('input[type="range"]').fill('20');

    // Wait for calculations to update
    await page.waitForTimeout(1000);

    // Check if results are displayed
    await expect(page.getByText('Annual Interest:')).toBeVisible();
    await expect(page.getByText('Monthly Savings:')).toBeVisible();
  });

  test('should have working investment calculator', async ({ page }) => {
    // Test time period input
    const timePeriodInput = page.getByPlaceholder('5');
    await expect(timePeriodInput).toBeVisible();
    await timePeriodInput.fill('10');
    await expect(timePeriodInput).toHaveValue('10');

    // Test return rate input
    const returnRateInput = page.getByPlaceholder('9');
    await expect(returnRateInput).toBeVisible();
    await returnRateInput.fill('12');
    await expect(returnRateInput).toHaveValue('12');
  });

  test('should display investment chart', async ({ page }) => {
    // Wait for chart to load
    await page.waitForSelector('canvas', { timeout: 10000 });

    // Check if chart is present
    const chart = page.locator('canvas');
    await expect(chart).toBeVisible();
  });

  test('should have dark mode toggle', async ({ page }) => {
    // Check if dark mode toggle is present
    const darkModeToggle = page.locator('button').filter({ hasText: '🌙' });
    await expect(darkModeToggle).toBeVisible();

    // Click the toggle
    await darkModeToggle.click();

    // Check if the toggle changed to sun icon
    await expect(page.locator('button').filter({ hasText: '☀️' })).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if the page is still functional
    await expect(page.getByText('Stop paying card interest — invest it instead')).toBeVisible();

    // Check if inputs are still accessible
    await expect(page.getByPlaceholder('2000')).toBeVisible();
  });

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator('h1')).toHaveCount(1);

    // Check for proper form labels
    const labels = page.locator('label');
    await expect(labels).toHaveCount(6); // Monthly spend, balance carried, APR, time period, return rate, and slider labels

    // Check for proper button accessibility
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should handle edge cases', async ({ page }) => {
    // Test with zero values
    await page.getByPlaceholder('2000').fill('0');
    await page.getByPlaceholder('23').fill('0');
    await page.locator('input[type="range"]').fill('0');

    // Wait for calculations
    await page.waitForTimeout(1000);

    // Check if results show zero or handle gracefully
    await expect(page.getByText('Annual Interest:')).toBeVisible();
  });

  test('should have working increment/decrement buttons', async ({ page }) => {
    // Test monthly spend increment
    const incrementButton = page.locator('button').filter({ hasText: '▲' }).first();
    await incrementButton.click();

    // Check if value increased
    const monthlySpendInput = page.getByPlaceholder('2000');
    const value = await monthlySpendInput.inputValue();
    expect(parseInt(value)).toBeGreaterThan(2000);
  });
});
