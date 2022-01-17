function (i) {
                if (equal(self.id($(this).data("select2-data")), self.opts.element.val())) {
                    selected = i;
                    return false;
                }
            }