function (c, index) {
                var self = this,
                    children = self.get("children"),
                    elBefore;
                if (index === undefined) {
                    index = children.length;
                }
                elBefore = children[index] && children[index].get("el") || null;
                c = initChild(self, c, elBefore);
                children.splice(index, 0, c);
                return c;
            }