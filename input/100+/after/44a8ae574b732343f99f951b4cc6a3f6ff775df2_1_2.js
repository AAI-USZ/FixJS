function () {
            var self = this;
            if (!self.get("srcNode")) {
                var el,
                    contentEl = self.get("contentEl");

                el = $("<" + self.get("elTagName") + ">");

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