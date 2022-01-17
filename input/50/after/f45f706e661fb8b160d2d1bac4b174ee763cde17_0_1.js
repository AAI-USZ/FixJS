function() {
                // if autocomplete is off when you reload the page the input value gets erased
                if (this.node) $(this.node).set('autocomplete', 'on'); 
            }