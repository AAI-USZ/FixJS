function() {
            var list = document.querySelectorAll('span.status');
            for (var i = 0; i < list.length; ++i) {
                console.log((i + 1) + ": " + list[i].innerHTML.replace(/<.*?>/g, ''));
            }
        }