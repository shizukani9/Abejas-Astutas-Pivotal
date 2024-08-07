const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const DriverFactory = require('../../core/ui/driverFactory');

let driver;

Given('que estoy en la página de introducción', async function () {
    driver = await new DriverFactory();
    await driver.get('https://www.pivotaltracker.com/signin');

    const usernameInput = await driver.wait(until.elementLocated(By.css('form #credentials_username')), 30000);
    await usernameInput.sendKeys('equipoaamodulo6@gmail.com');
    const nextButton = await driver.wait(until.elementLocated(By.css('form .app_signin_action_button')), 30000);
    await nextButton.click();

    const passwordInput = await driver.wait(until.elementLocated(By.css('form #credentials_password')), 30000);
    await passwordInput.sendKeys('AbejasAstutas5');
    const loginButton = await driver.wait(until.elementLocated(By.css('form label ~ .app_signin_action_button')), 30000);
    await loginButton.click();

    await driver.wait(until.urlIs('https://www.pivotaltracker.com/introduction'), 30000);
});

When('ingreso el nombre del proyecto como {string}', async function (projectName) {
    const projectNameInput = await driver.wait(until.elementLocated(By.css('.wizard__input')), 30000);
    await projectNameInput.sendKeys(projectName);
});

When('hago clic en el botón "Crear proyecto"', async function () {
    const acceptCookiesButton = await driver.findElements(By.id('onetrust-accept-btn-handler'));
    if (acceptCookiesButton.length > 0) {
        await acceptCookiesButton[0].click();
    }

    const createProjectButton = await driver.wait(until.elementLocated(By.css('button[data-aid="submit-button"]')), 30000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", createProjectButton);
    await createProjectButton.click();
});

Then('debería ver la página de configuración del proyecto', async function () {
    await driver.wait(until.urlContains('/projects'), 30000);

    const moreButton = await driver.wait(until.elementLocated(By.css('a[data-aid="navTab-more"]')), 30000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", moreButton);
    await moreButton.click();

    await driver.wait(until.urlContains('/settings'), 30000);
});

Given('que estoy en la página de configuración del proyecto', async function () {
    await driver.wait(until.urlContains('/settings'), 30000);
});

When('hago clic en la opción "Más"', async function () {
    const moreOption = await driver.wait(until.elementLocated(By.css('a[data-aid="navTab-more"]')), 30000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", moreOption);
    await moreOption.click();
});

When('hago clic en "Eliminar Proyecto"', async function () {
    // Intentar hacer clic directamente en el elemento, aunque no esté visible
    const deleteLink = await driver.wait(until.elementLocated(By.css('a#delete_link')), 30000);
    await driver.executeScript("arguments[0].click();", deleteLink);
});

When('confirmo la eliminación', async function () {
    const confirmDeleteButton = await driver.wait(until.elementLocated(By.css('input#confirm_delete')), 30000);
    await confirmDeleteButton.click();
});

Then('debería ser redirigido a la página de introducción', async function () {
    await driver.wait(until.urlIs('https://www.pivotaltracker.com/introduction'), 30000);
});

Then('debería ver la opción para crear un nuevo proyecto', async function () {
    const projectInput = await driver.wait(until.elementLocated(By.css('.wizard__input')), 30000);
    if (!projectInput) {
        throw new Error('No se encontró la opción para crear un nuevo proyecto');
    }
});

// Cierra el navegador al final de todos los escenarios
AfterAll(async function () {
    if (driver) {
        await driver.quit();
    }
});
