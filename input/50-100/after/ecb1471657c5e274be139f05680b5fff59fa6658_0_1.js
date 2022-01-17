function() {

            // By default, fade to the default text color and weight.
            var textColor = this.options.colors.dark_purple;

            // Keep the title bold red if the form was not saved.
            if (this.textSpan.data('changed')) {
                textColor = this.options.colors.red;
            }

            // Bold the title.
            this.textSpan.css({
                'font-weight': 'bold',
                'color': textColor
            });

        }