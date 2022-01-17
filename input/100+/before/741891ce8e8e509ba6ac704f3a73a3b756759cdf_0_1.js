function animateDeal(card, playerNumber, stackNumber, animationDuration, continuation) {
  // Initial card placeholder creation and insertion in the dom
  var animCard = $("<div />", {
    "class": "animated card",
    "text": card.kind
  })
  .offset({
    top: 500,
    left: "50%"
  })
  .css("-webkit-transition-duration", animationDuration + "s");
  $("body").append(animCard);
  // Trigger the animation - send the card to the requested stack
  animCard.offset($("#player-" + playerNumber + "-stack-" + stackNumber).offset());
  setTimeout(function () {
    animCard.remove();

    if (continuation && us.isFunction(continuation)) {
      continuation(card, playerNumber, stackNumber);
    }
  }, animationDuration * 1000);

}