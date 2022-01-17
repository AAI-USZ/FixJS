function () {
            var self = this;
            if (!self.get("srcNode")) {
                var elCls = self.get("elCls"),
                    elStyle = self.get("elStyle"),
                    width = self.get("width"),
                    height = self.get("height"),
                    content = self.get("content"),
                    elAttrs = self.get("elAttrs"),
                    el,
                    contentEl = self.get("contentEl");

                // 内容容器，content 需要设置到的容器
                if (contentEl) {
                    contentEl.html(content);
                    content = "";
                }
                el = constructEl(elCls,
                    elStyle,
                    width,
                    height,
                    self.get("elTagName"),
                    elAttrs,
                    content);
                if (contentEl) {
                    el.append(contentEl);
                }
                self.__set("el", el);
                if (!contentEl) {
                    // 没取到,这里设下值, uiSet 时可以 set("content")  取到
                    self.__set("contentEl", el);
                }
            }
        }