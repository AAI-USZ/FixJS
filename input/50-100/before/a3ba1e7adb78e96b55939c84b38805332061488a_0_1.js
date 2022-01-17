function () {
            options.locked = false;
            if (!global) {
                run.updateCSS(domain);
                delElement(overlay.clearStyle);
                document.removeEventListener('keypress', press, false);
                delete options.stop;
                delElement(overlay);
            } else {
                delete options.stop;
                self.close();
            }
        }