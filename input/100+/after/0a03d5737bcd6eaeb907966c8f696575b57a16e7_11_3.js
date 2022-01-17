function (callback, evt) {
            if (!evt) {
                return;
            }
            var target = $(evt.target);
            if (target.length === 0) {
                return;
            }
            that.save(fluid.find({
                "linkNext": 1,
                "linkPrevious": -1
            }, function (increment, selector) {
                if (that.locate(selector).attr("href") === target.attr("href")) {
                    return increment;
                }
            }));
        }