function ( options ) {

    $("#terminal-input").keypress(this.handleKey);

    $("#terminal-input").keydown(this.handleKeyDown);

    $("#terminalTab").click(this.openTerminal);

    $("#problemTab").click(this.openProblems);

  }