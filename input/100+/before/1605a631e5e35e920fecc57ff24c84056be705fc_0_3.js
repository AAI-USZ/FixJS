function () {

            var selection,
                container = this.container,
                dropdown = this.dropdown,
                containers = $([this.container.get(0), this.dropdown.get(0)]),
                clickingInside = false,
                selector = ".select2-choice",
                focusser=container.find("input.select2-focusser");

            this.selection = selection = container.find(selector);

            this.search.bind("keydown", this.bind(function (e) {
                switch (e.which) {
                case KEY.UP:
                case KEY.DOWN:
                    this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                    killEvent(e);
                    return;
                case KEY.TAB:
                case KEY.ENTER:
                    this.selectHighlighted();
                    killEvent(e);
                    return;
                case KEY.ESC:
                    this.cancel(e);
                    killEvent(e);
                    return;
                }
            }));

            containers.delegate(selector, "click", this.bind(function (e) {
                clickingInside = true;

                if (this.opened()) {
                    this.close();
                    selection.focus();
                } else if (this.enabled) {
                    this.open();
                }
                e.preventDefault();

                clickingInside = false;
            }));
            containers.delegate(selector, "keydown", this.bind(function (e) {
                if (!this.enabled || e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                    return;
                }
                this.open();
                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN || e.which === KEY.SPACE) {
                    // prevent the page from scrolling
                    killEvent(e);
                }
                if (e.which === KEY.ENTER) {
                    // do not propagate the event otherwise we open, and propagate enter which closes
                    killEvent(e);
                }
            }));
            containers.delegate(selector, "focus", function () { if (this.enabled) { containers.addClass("select2-container-active"); dropdown.addClass("select2-drop-active"); }});
            containers.delegate(selector, "blur", this.bind(function (e) {
                if (clickingInside) return;
                if (e.target===focusser.get(0)) return; // ignore blurs from focusser
                if (!this.opened()) { this.blur(); }
            }));

            selection.delegate("abbr", "click", this.bind(function (e) {
                if (!this.enabled) return;
                this.clear();
                killEvent(e);
                this.close();
                this.triggerChange();
                selection.focus();
            }));

            this.setPlaceholder();

            focusser.bind("focus", function() { selection.focus(); });
            selection.bind("focus", this.bind(function() {
                focusser.hide();
                this.container.addClass("select2-container-active");
            }));
            selection.bind("blur", function() { focusser.show(); });
            this.opts.element.bind("open", function() { focusser.hide(); });
        }