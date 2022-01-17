function() {
    var lines = you.getValue().split('\n')
      , killLine = Math.floor(Math.random() * lines.length)
      , newText = lines.filter(function(line, i) {
		      return i !== killLine;
		    }).join('\n');

    useAbility(opponentAbilities, 'remove', rightButtons.find('.remove'));
    you.setValue(newText);
  }