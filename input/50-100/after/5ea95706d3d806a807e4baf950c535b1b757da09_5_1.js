function create(component, self) {
        var childConstructor, xclass;
        if (component && (xclass = component.xclass)) {
            if (self && !component.prefixCls) {
                component.prefixCls = self.get("prefixCls");
            }
            childConstructor = Manager.getConstructorByXClass(xclass);
            if (!childConstructor) {
                S.error("can not find class by xclass desc : " + xclass);
            }
            component = new childConstructor(component);
        }
        return component;
    }