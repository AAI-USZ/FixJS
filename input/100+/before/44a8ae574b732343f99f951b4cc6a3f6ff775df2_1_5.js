function renderUI(self, part) {
        var el = self.get("contentEl"),
            style = self.get(part + "Style"),
            content = self.get(part + "Content"),
            isString = S.isString(content),
            partEl = self.get(part);
        if (!partEl) {
            style = serialize(style);
            partEl = new Node("<div class='" +
                CLS_PREFIX + part + "'" +
                " " +
                (style ? ("style='" + style + "'") : "") +
                " >" +
                (isString ? content : "") +
                "</div>");
            if (!isString) {
                partEl.append(content);
            }
            partEl.appendTo(el);
            self.__set(part, partEl);
        } else if (style) {
            partEl.css(style);
        }
    }