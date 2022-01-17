function (i) {
                if (equal($(this).data("select2-data").id, self.opts.element.val())) {
                    selected = i;
                    return false;
                }
            }