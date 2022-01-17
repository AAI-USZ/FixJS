function(input, start, end) {
                if (typeof end == 'undefined') end = start;
                if (input.setSelectionRange) {
                    input.setSelectionRange(start, end);
                }
                else{
                    // assumed IE
                    var range = input.createTextRange();
                    range.collapse();
                    range.moveStart('character', start);
                    range.moveEnd('character', end - start);
                    range.select();
                }
            }