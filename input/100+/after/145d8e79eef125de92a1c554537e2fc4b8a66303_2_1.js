function (node, toHide, offsetCorrection) {
            if (!node) {
                return null;
            }
            console.log(JSON.stringify(current_selection));
            var top = node.offset().top - offsetCorrection,
                bottom = top + node.height(),
                ret = false,
                kid;
            console.log(top + " " + bottom);
            console.log(node);
            if (current_selection.to <= top || current_selection.from >= bottom) {
                console.log("case 1");
                return false;
            } else if (current_selection.from <= top && current_selection.to >= bottom) {
                console.log("case 2");
                return true;
            } else {
                console.log("case 3");
                kid = node.children();
                kid.each(function () {
                    var temp = that.createSelection($(this), toHide, offsetCorrection);
                    if (temp === true) {
                        console.log("true kid exist");
                        ret = true;
                    } else {
                        console.log(" no good kid exist");
                        toHide.push($(this));
                    }
                });
                // overflow test expression ( (node.is('img') || !node.text() ) && current_selection.to >= top && current_selection.to <= bottom )
                if ((node.is('img') || (kid.length === 0 && node.text() !== '')) && current_selection.from >= top && current_selection.from <= bottom) {
                    console.log("case 5");
                    current_selection.from = top;
                    current_selection.to = current_selection.from + current_selection_height;
                    return true;
                } else {
                    console.log("case 6");
                    return ret;
                }
            }
        }