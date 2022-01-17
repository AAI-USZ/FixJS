function() {
                return page.evaluate(function() {
                    return document.querySelector('input').value;
                });
            }