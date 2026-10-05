export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Categorias e Produtos
    this.laptopsCategory = page.locator('a:has-text("Laptops")');
    this.addToCartButton = page.locator('a:has-text("Add to cart")');

    // Registro (Sign Up)
    this.signUpLink = page.locator('#signin2');
    this.signUpUsernameInput = page.locator('#sign-username');
    this.signUpPasswordInput = page.locator('#sign-password');
    this.signUpSubmitButton = page.locator('button:has-text("Sign up")');

    // Login
    this.loginLink = page.locator('#login2');
    this.loginUsernameInput = page.locator('#loginusername');
    this.loginPasswordInput = page.locator('#loginpassword');
    this.loginSubmitButton = page.locator('button:has-text("Log in")');

    // Formulário de Contato
    this.contactLink = page.locator('a:has-text("Contact")');
    this.contactEmailInput = page.locator('#recipient-email');
    this.contactNameInput = page.locator('#recipient-name');
    this.contactMessageInput = page.locator('#message-text');
    this.sendMessageButton = page.locator('button:has-text("Send message")');
  }

  async navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async registerUser(username, password) {
    await this.signUpLink.click();
    await this.signUpUsernameInput.waitFor({ state: 'visible' });
    await this.signUpUsernameInput.fill(username);
    await this.signUpPasswordInput.fill(password);
    await this.signUpSubmitButton.click();
  }

  async login(username, password) {
    await this.loginLink.click();
    await this.loginUsernameInput.waitFor({ state: 'visible' });
    await this.loginUsernameInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitButton.click();
  }

  async filterByLaptops() {
    await this.laptopsCategory.click();
    await this.page.waitForTimeout(1000);
  }

  async selectProduct(productName) {
    await this.page.locator(`a:has-text("${productName}")`).first().click();
  }

  async addCurrentProductToCart() {
    const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {
      await dialog.accept();
    });
    await this.addToCartButton.click();
    await dialogPromise;
  }

  async sendContactMessage(email, name, message) {
    await this.contactLink.click();
    await this.contactEmailInput.waitFor({ state: 'visible' });
    await this.contactEmailInput.fill(email);
    await this.contactNameInput.fill(name);
    await this.contactMessageInput.fill(message);
    await this.sendMessageButton.click();
  }
}