function (c, index) {
                var self = this,
                    children = self.get("children"),
                    renderBefore;
                if (index === undefined) {
                    index = children.length;
                }
                renderBefore = children[index] && children[index].get("el") || null;
                c = initChild(self, c, renderBefore);
                children.splice(index, 0, c);
                // 先 create 占位 再 render
                // 防止 render 逻辑里读 parent.get("children") 不同步
                // 如果 parent 已经渲染好了子组件也要立即渲染，就 创建 dom ，绑定事件
                if (self.get("rendered")) {
                    c.render();
                }
                self.fire("addChild", {
                    child:c
                });
                return c;
            }