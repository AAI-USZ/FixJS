function () {
                var self = this,
                    view = self.get("view");
                setViewCssClassByHierarchy(self, view);
                view.create();
                var el = view.getKeyEventTarget();
                if (self.get("focusable")) {
                    el.attr("tabIndex", 0);
                } else {
                    el.unselectable(undefined);
                }
                self.__set("view", view);
            }