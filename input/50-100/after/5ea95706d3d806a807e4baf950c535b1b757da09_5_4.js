function () {
                var self = this, i, children, child;
                self.get("view").render();
                //then render my children
                children = self.get("children").concat();
                self.get("children").length = 0;
                for (i = 0; i < children.length; i++) {
                    child = self.addChild(children[i]);
                    child.render();
                }
            }