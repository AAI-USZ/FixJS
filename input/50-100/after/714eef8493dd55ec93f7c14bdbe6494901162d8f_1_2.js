function(choice, value) {
        var existing_choice = this.deck.find('[data-value="'+value+'"]');

        // Avoid duplicating choices in the deck.
        if (!existing_choice.length) {
            var choice = choice.clone();

            // In case getValue() actually **created** the value, for example
            // with a post request.
            if (! choice.attr('data-value')) {
                choice.attr('data-value', value);
            }

            this.deck.append(choice);

            // Append a clone of the .remove element.
            choice.append(this.widget.find('.remove:not(:visible)').clone().show());
        }
    }