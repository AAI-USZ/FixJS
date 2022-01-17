function (node, toHide, offsetCorrection) {
            if (!node) {
                return null;
            }
            var top = node.offset().top - offsetCorrection,
                bottom = top + node.height(),
                ret = false,
                kid;
            if (current_selection.to <= top || current_selection.from >= bottom) {
                return false;
            } else if (current_selection.from <= top && current_selection.to >= bottom) {
                return true;
            } else {
                kid = node.children();
                kid.each(function () {
                    var temp = that.createSelection($(this), toHide, offsetCorrection);
                    if (temp === true) {
                        ret = true;
                    } else {
                        toHide.push($(this));
                    }
                });
                // overflow test expression ( (node.is('img') || !node.text() ) && current_selection.to >= top && current_selection.to <= bottom )
                if ((node.is('img') || (kid.length === 0 && node.text() !== '')) && current_selection.from >= top && current_selection.from <= bottom) {
                    current_selection.from = top;
                    current_selection.to = current_selection.from + current_selection_height;
                    return true;
                } else {
                    return ret;
                }
            }
        }