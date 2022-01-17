function () {
                var el = $(this);
                var bubbleLength = Number(el.data('bubblelength'));
                el.height(bubbleLength * (size + 1));
                log('b', this, el.height());
            }