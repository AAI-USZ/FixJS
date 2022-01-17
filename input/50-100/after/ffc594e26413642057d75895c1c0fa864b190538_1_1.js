function() {
            var list = document.querySelectorAll('div.tweet-text');
            for (var i = 0; i < list.length; ++i) {
                console.log((i + 1) + ": " + list[i].innerText);
            }
        }