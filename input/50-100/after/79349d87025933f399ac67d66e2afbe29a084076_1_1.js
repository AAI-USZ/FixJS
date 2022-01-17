function (e) {
                e.preventDefault();

                var pos = {
                    x: e.pageX - canvas.offsetLeft,
                    y: e.pageY - canvas.offsetTop
                };

                if (highlightedCell) {
                    // If we moved out of the highlighted cell, unhighlight it
                    if (!highlightedCell.inBounds(pos)) {
                        highlightedCell.highlighted = false;
                        highlightedCell = null;
                    }
                }
            }