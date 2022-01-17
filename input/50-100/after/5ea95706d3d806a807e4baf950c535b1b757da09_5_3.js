function () {
                var self = this,
                    view = self.get("view");
                setViewCssClassByHierarchy(self, view);
                view.create();
                var el = view.getKeyEventTarget();
                if (!self.get("allowTextSelection")) {
                    el.unselectable(undefined);
                }
                self.__set("view", view);
            }