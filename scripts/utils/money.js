export function formatCurrency(priceCents){
    let priceCentsRounded = Math.round(priceCents)

    return (priceCentsRounded / 100).toFixed(2);
}