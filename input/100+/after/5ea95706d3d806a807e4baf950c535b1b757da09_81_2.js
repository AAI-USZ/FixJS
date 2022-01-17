function (ev) {
            var self = this,
                editor = self.editor,
                drafts = self._getDrafts(),
                v = ev.target.get("value");
            if (confirm("确认恢复 " + date(drafts[v].date) + " 的编辑历史？")) {
                editor.execCommand("save");
                editor.set("data", drafts[v].content);
                editor.execCommand("save");
            }
            ev.halt();
        }