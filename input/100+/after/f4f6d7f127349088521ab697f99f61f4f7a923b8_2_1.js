function(bot, message) {
    if (bot === "blank") {
        sys.sendMessage(this.id, message);
        return;
    }
    if (bot === "***") {
        sys.sendMessage(this.id, "*** " + message + " ***");
        return;
    }

    var pokemon = sys.pokeNum(bot);
    var color;

    if (!is_undefined(pokemon)) {
        color = colors[sys.pokeType1(pokemon)];
    }

    if (bot.startsWithLetter()) {
        bot = "±" + bot;
    }

    if (is_undefined(color)) {
        sys.sendMessage(this.id, bot + ": " + message, this.channel);
    } else {
        sys.sendHtmlMessage(this.id, "<span style='color: " + color + "'><timestamp/>"
                            + "<b>" + bot +  ":</b></span> " + message);
    }
}