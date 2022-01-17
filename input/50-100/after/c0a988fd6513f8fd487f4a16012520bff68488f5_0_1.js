function(terminal, stack) {
    terminal.terminal(
        function(str, terminal) {
            try {
                forth.runString(str);
            } catch(err) {
                terminal.error(err);
            }
            forth.redrawStack();
        },
        {
            greetings: "FORTH Interpreter. Type 'clear' to clear",
            prompt: '> '
        });
    forth.terminal = terminal.terminal();
    forth.stackElt = $(stack);
}