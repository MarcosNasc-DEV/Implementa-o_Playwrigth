import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

test.describe("Suíte Completa de Testes DemoBlaze E-Commerce", () => {
  let homePage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigate();
  });

  // --- CTs ORIGINAIS ---

  test("CT-01: Filtro de Categoria - Laptops", async ({ page }) => {
    await homePage.filterByLaptops();

    const sonyLaptop = page.locator(".card-title", { hasText: "Sony" });
    const dellLaptop = page.locator(".card-title", { hasText: "Dell" });

    await expect(sonyLaptop.first()).toBeVisible();
    await expect(dellLaptop.first()).toBeVisible();
  });

  test("CT-02: Adicionar Produto ao Carrinho com Alerta Pop-up", async ({
    page,
  }) => {
    await homePage.selectProduct("Samsung galaxy s6");
    await homePage.addCurrentProductToCart();
  });

  test("CT-03: Fluxo Completo de Compra", async ({ page }) => {
    await homePage.selectProduct("Samsung galaxy s6");
    await homePage.addCurrentProductToCart();

    await cartPage.navigateToCart();
    await cartPage.openPlaceOrderModal();

    await cartPage.fillPurchaseForm({
      name: "Marcos Silva",
      country: "Brasil",
      city: "Recife",
      card: "1234567890123456",
      month: "12",
      year: "2028",
    });

    await cartPage.submitPurchase();
    await expect(cartPage.successHeading).toHaveText(
      "Thank you for your purchase!",
    );
  });

  test("CT-04: Excluir Item do Carrinho", async ({ page }) => {
    const productName = "Samsung galaxy s6";

    await homePage.selectProduct(productName);
    await homePage.addCurrentProductToCart();

    await cartPage.navigateToCart();
    await expect(page.locator("#tbodyid")).toContainText(productName);

    await cartPage.deleteProductByName(productName);
    await expect(page.locator("#tbodyid")).not.toContainText(productName);
  });

  // --- EXTRAS ---

  test("CT-05: Validar Alerta ao Tentar Finalizar Compra sem Preencher Campos (Caminho de Exceção)", async ({
    page,
  }) => {
    await homePage.selectProduct("Samsung galaxy s6");
    await homePage.addCurrentProductToCart();

    await cartPage.navigateToCart();
    await cartPage.openPlaceOrderModal();

    const dialogPromise = page.waitForEvent("dialog").then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    });

    await cartPage.submitPurchase();

    const message = await dialogPromise;
    expect(message).toContain("Please fill out Name and Creditcard.");
  });

  test("CT-06: Tentativa de Login com Credenciais Inválidas (Caminho de Exceção)", async ({
    page,
  }) => {
    const dialogPromise = page.waitForEvent("dialog").then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    });

    await homePage.login("usuario_inexistente_123", "senha_errada");

    const message = await dialogPromise;
    expect(message).toMatch(/User does not exist.|Wrong password./);
  });

  test("CT-07: Envio do Formulário de Contato com Sucesso", async ({
    page,
  }) => {
    const dialogPromise = page.waitForEvent("dialog").then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    });

    await homePage.sendContactMessage(
      "teste@recife.com",
      "Marcos Silva",
      "Mensagem de teste automatizado via Playwright.",
    );

    const message = await dialogPromise;
    expect(message).toBe("Thanks for the message!!");
  });

  test("CT-08: Criar Nova Conta de Usuário (Sign Up)", async ({ page }) => {
    const dialogPromise = page.waitForEvent("dialog").then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    });

    const randomUser = `user_${Date.now()}`;
    await homePage.registerUser(randomUser, "senha123");

    const message = await dialogPromise;
    expect(message).toBe("Sign up successful.");
  });
});
