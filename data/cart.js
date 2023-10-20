export const cart = [
    
];

export function addToCart(productId, selectorValue){
    let matchingItem;

    cart.forEach((item) =>{
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += selectorValue;
    } else{
        cart.push({
            productId: productId,
            quantity: selectorValue
        });
    }
}