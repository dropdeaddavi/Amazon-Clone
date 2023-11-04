import { cart, calculateCartQuantity } from "../cart.js";
import { getMatchingProduct } from "../products.js";
import { getDeliveryOption } from "../deliveryOptions.js";
import { formatCurrency } from "../../scripts/utils/money.js";

export function renderPaymentSummary() {
    let paymentSummaryHTML = '';
    let productPriceCents = 0;
    let shippingCost = 0;

    cart.forEach(cartItem => {
        const product = getMatchingProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        shippingCost += deliveryOption.priceCents;
    });

    const totalCostPreTax = productPriceCents + shippingCost;

    const taxCost = (totalCostPreTax * 0.1);

    const orderTotal = (totalCostPreTax + taxCost);

    const cartQuantity = calculateCartQuantity();
    
    paymentSummaryHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>  
                Shipping &amp; handling:
            </div>
            <div class="payment-summary-money">
                $${formatCurrency(shippingCost)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>
                Total before tax:
            </div>
            <div class="payment-summary-money">
                $${formatCurrency(totalCostPreTax)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>
                Estimated tax (10%):
            </div>
            <div class="payment-summary-money">
                $${formatCurrency(taxCost)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>   
                Order total:
            </div>
            <div class="payment-summary-money">
                $${formatCurrency(orderTotal)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}