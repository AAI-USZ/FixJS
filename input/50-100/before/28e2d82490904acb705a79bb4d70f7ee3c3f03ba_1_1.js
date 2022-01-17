function initChild(self, c, elBefore) {
        // 生成父组件的 dom 结构
        self.create();
        var contentEl = self.getContentElement();
        c = Component.create(c, self);
        c.__set("parent", self);
        // set 通知 view 也更新对应属性
        c.set("render", contentEl);
        c.set("elBefore", elBefore);
        // 如果 parent 已经渲染好了子组件也要立即渲染，就 创建 dom ，绑定事件
        if (self.get("rendered")) {
            c.render();
        }
        // 如果 parent 也没渲染，子组件 create 出来和 parent 节点关联
        // 子组件和 parent 组件一起渲染
        else {
            // 之前设好属性，view ，logic 同步还没 bind ,create 不是 render ，还没有 bindUI
            c.create(undefined);
        }
        return c;
    }