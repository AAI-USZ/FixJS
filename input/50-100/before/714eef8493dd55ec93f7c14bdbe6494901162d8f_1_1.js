function() {
        var slots = this.maxValues - this.deck.children().length;

        if (this.maxValues && slots < 1) {
            // We'll remove the first choice which is supposed to be the oldest
            var choice = $(this.deck.children()[0]);

            // Unselect and remove the choice's value from the select
            this.select.find(
                'option[data-value=' + choice.attr('data-value') + ']'
            ).attr('selected', '').remove();

            // Actually remove the value from the deck
            choice.remove();
        }
    }