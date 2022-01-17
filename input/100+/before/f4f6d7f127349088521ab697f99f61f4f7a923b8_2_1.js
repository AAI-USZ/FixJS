function(bot, message) {
    var pokemon = sys.pokemon(bot);
    var color;

    if (!is_undefined(pokemon)) {
        color = colors[sys.pokeType1(pokemon)];
    }

    if (is_undefined(color)) {
        sys.sendMessage(this.id, "±" + bot + ": " + message, this.channel);
    } else {
        sys.sendHtmlMessage(this.id, "<span style='color: " + color + "'><timestamp/>"
                            + "<b>±" + bot +  ":</b></span> " + message);
    }
}