function (childNode) {
            var self = this,
                cls = childNode.attr("class") || "",
                prefixCls = self.get("prefixCls");
            // 过滤掉特定前缀
            cls = cls.replace(new RegExp("\\b" + prefixCls, "ig"), "");
            var UI = Manager.getConstructorByXClass(cls);
            if (!UI) {
                S.log(childNode);
                S.log("can not find ui " + cls + " from this markup");
            }
            return UI;
        }