function (c, destroy) {
                var children = this.get("children"),
                    index = S.indexOf(c, children);
                if (index != -1) {
                    children.splice(index, 1);
                }
                if (destroy &&
                    // c is still json
                    c.destroy) {
                    c.destroy();
                }
                return c;
            }