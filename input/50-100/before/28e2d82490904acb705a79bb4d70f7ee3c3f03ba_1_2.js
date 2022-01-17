function () {
                var self = this, i, children, child;
                self.get("view").render();
                //then render my children
                children = self.get("children");
                for (i = 0; i < children.length; i++) {
                    child = children[i];
                    // 不在 Base 初始化设置属性时运行，防止和其他初始化属性冲突
                    child = initChild(self, child);
                    children[i] = child;
                    child.render();
                }
            }