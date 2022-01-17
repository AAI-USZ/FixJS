function () {
            var self = this;
            // 新建的节点才需要摆放定位
            if (!self.get("srcNode")) {
                var render = self.get("render"),
                    el = self.get("el"),
                    renderBefore = self.get("elBefore");
                if (renderBefore) {
                    el.insertBefore(renderBefore, undefined);
                } else if (render) {
                    el.appendTo(render, undefined);
                } else {
                    el.appendTo(doc.body, undefined);
                }
            }
        }