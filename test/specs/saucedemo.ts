import { browser, $, expect } from '@wdio/globals' // Adjust import according to your setup

describe('Sauce demo app login', () => {
  it('should login with valid standard user', async () => {
    // Mark the function as async
    const userNameTextBox = $('#user-name')
    const passwordTextBox = $('#password') // Corrected selector for password input
    const loginButton = $('#login-button') // Corrected selector for login button

    await browser.url('https://www.saucedemo.com/')

    await userNameTextBox.setValue('standard_user')
    await passwordTextBox.setValue('secret_sauce')
    await loginButton.click()

    const productTitle = $('.title')
    await expect(productTitle).toBeDisplayed()
  })
})
