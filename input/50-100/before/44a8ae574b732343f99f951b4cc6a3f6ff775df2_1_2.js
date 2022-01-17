function (c) {
            var self = this,
                el = self.get("contentEl");
            if (typeof c == "string") {
                el.html(c);
            } else if (c) {
                el.empty().append(c);
            }
        }