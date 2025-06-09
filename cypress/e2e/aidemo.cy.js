/// <reference types="cypress" />

import LoginPage from '../support/pageObjects/LoginPage';
import ShoppingPage from '../support/pageObjects/ShoppingPage';
import CartPage from '../support/pageObjects/CartPage';
import CheckoutPage from '../support/pageObjects/CheckoutPage';
import OrderHistoryPage from '../support/pageObjects/OrderHistoryPage';

describe('AI Demo Testing', () => {
    it('End to End testing using POM', () => {
        const loginPage = new LoginPage();
        const shoppingPage = new ShoppingPage();
        const cartPage = new CartPage();
        const checkoutPage = new CheckoutPage();
        const orderHistoryPage = new OrderHistoryPage();

        // Visit and login
        loginPage.visit();
        loginPage.fillEmail('yasser@gmail.com');
        loginPage.fillPassword('Aa@123456');
        loginPage.submit();

        // Shopping
        shoppingPage.addFirstProduct();
        shoppingPage.addSecondProduct();
        shoppingPage.goToCart();

        // Cart
        cartPage.verifyCheckoutButton();
        cartPage.clickCheckout();

        // Checkout
        checkoutPage.fillCountry('ind');
        checkoutPage.submitOrder();

        // Order History and Validation
        orderHistoryPage.goToOrderHistory();
        orderHistoryPage.verifySuccessMessage();
        orderHistoryPage.selectOrder();
        orderHistoryPage.viewOrderDetails();
        orderHistoryPage.backToOrders();
    });
});