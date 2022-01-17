function updateWidgetValue(value) {
                // is this necessary ?
                // if (!value) return;

                var choice = widget.deck.find('[data-value='+value+']');

                if (!choice.length) {
                    var choice = widget.choiceTemplate.clone();
                    var html = widget.select.find('option[value='+value+']').html();

                    choice.html(html);
                    choice.attr('data-value', value);

                    widget.selectChoice(choice);
                }
            }