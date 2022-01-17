function (index, value) {

                // The number of times that the high bit character
                // we're looking for appears in the text of the
                // current element.
                var num_test_chars,
                    test_text = $this.text();

                // For each character that doesn't appear to get
                // spacing in the current font / browser,
                // insert an additional space into the word,
                // right after the non-width-ed character,
                // to give the apperance of the character getting
                // one space worth of width. 
                if (!character_renders_correctly[value]) {
                    $this.html(test_text.replace(new RegExp("(" + value + ")([^\w&])", 'g'), "$1&nbsp;$2"));
                }
            }