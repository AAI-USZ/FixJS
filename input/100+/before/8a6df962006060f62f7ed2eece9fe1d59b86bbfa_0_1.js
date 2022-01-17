function(way) {
        // The current choice if any.
        var current = $(this.hilightedChoiceSelector);
        // The first and last choices. If the user presses down on the last
        // choice, then the first one will be hilighted.
        var first = $(this.autocompleteChoiceSelector + ':first');
        var last = $(this.autocompleteChoiceSelector + ':last');

        // The choice that should be hilighted after the move.
        var target;

        // The autocomplete must be shown so that the user sees what choice
        // he is hilighting.
        this.show();

        // If a choice is currently hilighted:
        if (current.length) {
            if (way == 'up') {
                // The target choice becomes the first previous choice.
                target = current.prevAll(this.choiceSelector + ':first');

                // If none, then the last choice becomes the target.
                if (!target.length) target = last;
            } else {
                // The target choice becomes the first  next** choice.
                target = current.nextAll(this.choiceSelector + ':first');

                console.log('new target', target)

                // If none, then the first choice becomes the target.
                if (!target.length) target = first;
            }

            // Trigger dehilightChoice on the currently hilighted choice.
            this.input.trigger('dehilightChoice',
                [current, this]);
        } else {
            target = way == 'up' ? last : first;
        }

        // Trigger hilightChoice on the target choice.
        this.input.trigger('hilightChoice',
            [target, this]);
    }