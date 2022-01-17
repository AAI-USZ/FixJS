function (c, destroy) {
                var self = this,
                    children = self.get("children"),
                    index = S.indexOf(c, children);
                if (index != -1) {
                    children.splice(index, 1);
                }
                if (destroy &&
                    // c is still json
                    c.destroy) {
                    c.destroy();
                }
                self.fire("removeChild", {
                    child:c
                });
                return c;
            }