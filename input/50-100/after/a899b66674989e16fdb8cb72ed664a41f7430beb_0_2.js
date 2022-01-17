function() {
    var text = you.getValue().split(''), swap = Math.floor(Math.random() * text.length - 1), holder = text[swap];

    useAbility(opponentAbilities, 'swap', rightButtons.find('.swap'));
    text[swap] = text[swap + 1]
    text[swap + 1] = holder;
    you.setValue(text.join(''));
  }