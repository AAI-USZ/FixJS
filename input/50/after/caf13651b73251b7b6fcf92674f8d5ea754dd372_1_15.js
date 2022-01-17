function(status) {
                decodedText = page.evaluate(function() {
                    return document.getElementsByTagName('pre')[0].innerText;
                });
                page.release();
            }