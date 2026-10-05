export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator("#cartur");
    this.placeOrderButton = page.locator('button:has-text("Place Order")');

    // Modal de compra
    this.nameInput = page.locator("#name");
    this.countryInput = page.locator("#country");
    this.cityInput = page.locator("#city");
    this.cardInput = page.locator("#card");
    this.monthInput = page.locator("#month");
    this.yearInput = page.locator("#year");
    this.purchaseButton = page.locator('button:has-text("Purchase")');

    // Pop-up verde de sucesso
    this.successPopup = page.locator(".sweet-alert");
    this.successHeading = page.locator(".sweet-alert h2");
  }

  async navigateToCart() {
    await this.cartLink.click();
    await this.page.waitForURL("**/cart.html");
  }

  async openPlaceOrderModal() {
    await this.placeOrderButton.click();
    await this.nameInput.waitFor({ state: "visible" });
  }

  async fillPurchaseForm(details) {
    await this.nameInput.fill(details.name);
    await this.countryInput.fill(details.country);
    await this.cityInput.fill(details.city);
    await this.cardInput.fill(details.card);
    await this.monthInput.fill(details.month);
    await this.yearInput.fill(details.year);
  }

  async submitPurchase() {
    await this.purchaseButton.click();
  }

  async deleteProductByName(productName) {
    const row = this.page.locator("tr", { hasText: productName });
    await row.locator('a:has-text("Delete")').click();
  }
}
