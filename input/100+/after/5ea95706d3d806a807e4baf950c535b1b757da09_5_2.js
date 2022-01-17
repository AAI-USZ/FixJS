function (ev) {
                var self = this,
                    isMouseActionButton = ev['which'] == 1,
                    el;
                if (self.get("disabled")) {
                    return true;
                }
                if (isMouseActionButton) {
                    el = self.getKeyEventTarget();
                    if (self.get("activeable")) {
                        self.set("active", true);
                    }
                    if (self.get("focusable")) {
                        el[0].focus();
                        self.set("focused", true);
                    }

                    if (!self.get("allowTextSelection")) {
                        // firefox /chrome 不会引起焦点转移
                        var n = ev.target.nodeName;
                        n = n && n.toLowerCase();
                        // do not prevent focus when click on editable element
                        if (n != "input" && n != "textarea") {
                            ev.preventDefault();
                        }
                    }
                }
            }