function (options) {

        var options = options || {},
            chars_to_test = options.chars || ['ʔ', 'ɨ'];

        test_character_widths(chars_to_test);

        this.each(function () {

            var $this = $(this);

            $.each(chars_to_test, function (index, value) {

                // The number of times that the high bit character
                // we're looking for appears in the text of the
                // current element.
                var num_test_chars;

                if (!character_renders_correctly[value]) {

                    num_test_chars = substr_count(value, $this.text());

                    while (num_test_chars--) {

                        $this.append("<span class='font-spacing-correction'>&nbsp;</span>");
                    }
                }
            });
        });
    }