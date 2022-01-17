function (element) {
            var self = this;
            // 不用 __set , 通知 view 更新
            self.set("el", element);
            var ui = self.get("decorateChildCls"),
                child = element.one("." + ui);
            // 可以装饰?
            if (child) {
                var UI = self.findUIConstructorByNode(child);
                if (UI) {
                    // 可以直接装饰
                    self.decorateChildrenInternal(UI, child);
                } else {
                    // 装饰其子节点集合
                    self.decorateChildren(child);
                }
            }
        }