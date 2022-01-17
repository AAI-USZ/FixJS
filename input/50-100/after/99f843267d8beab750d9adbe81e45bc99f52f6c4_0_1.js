function main() {
    var playerHand = playAsUser();
    var dealerHand = playAsDealer();
    
    console.log("\nYour hand:\n" + playerHand.printHand());
    console.log("Score: " + playerHand.score());
    console.log("\nDealer's hand:\n" + dealerHand.printHand());
    console.log("Score: " + dealerHand.score());
    console.log("\nResult:\n" + declareWinner(playerHand, dealerHand));
}