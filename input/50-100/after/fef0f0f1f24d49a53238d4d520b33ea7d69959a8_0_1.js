function(i) {
                var t = $(this),
                    cell = $('li[data-val="' + that.temp[i] + '"]', t),
                    x = cell.index(),
                    v = scrollToValid(cell, x, i, dir),
                    sc = i == index || index === undefined;
                if (x != v || sc)
                    that.scroll($(this), v, sc ? time : 0.2, orig, i);
            }