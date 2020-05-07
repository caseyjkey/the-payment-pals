async function main() {
    const PaymentHub = artifacts.require("PaymentHub");
    const paymentHub = await PaymentHub.new();

    console.log(paymentHub.address);
}

main().catch(console.error);
