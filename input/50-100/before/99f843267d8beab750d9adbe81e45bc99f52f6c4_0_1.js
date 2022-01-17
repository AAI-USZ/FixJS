function() {
    var hand = new Hand();
    if (hand.score() < 17) {
        hand.hitMe();
    }
    return hand;
}