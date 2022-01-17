function renderUI(self, part) {
        var el = self.get("contentEl"),
            partEl = self.get(part);
        if (!partEl) {
            partEl = new Node("<div class='" +
                CLS_PREFIX + part + "'" +
                " " +
                " >" +
                "</div>");
            partEl.appendTo(el);
            self.__set(part, partEl);
        }
    }