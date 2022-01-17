function () {

            var selection,
                container = this.container,
                dropdown = this.dropdown,
                clickingInside = false;

            this.selection = selection = container.find(".select2-choice");

            this.search.bind("keydown", this.bind(function (e) {
                if (!this.enabled) return;

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN || e.which === KEY.SPACE) {
                    // prevent the page from scrolling
                    killEvent(e);
                    return;
                }

                if (this.opened()) {
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
                } else {
                    if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                        return;
                    }

                    this.open();

                    if (e.which === KEY.ENTER) {
                        // do not propagate the event otherwise we open, and propagate enter which closes
                        killEvent(e);
                        return;
                    }
                }
            }));

            selection.bind("click", this.bind(function (e) {
                clickingInside = true;

                if (this.opened()) {
                    this.close();
                    this.search.focus();
                } else if (this.enabled) {
                    this.open();
                }
                killEvent(e);

                clickingInside = false;
            }));

            dropdown.bind("click", this.bind(function() { this.search.focus(); }));

            selection.delegate("abbr", "click", this.bind(function (e) {
                if (!this.enabled) return;
                this.clear();
                killEvent(e);
                this.close();
                this.triggerChange();
                this.search.focus();
            }));

            selection.bind("focus", this.bind(function() { this.search.focus(); }));

            this.setPlaceholder();

            this.search.bind("focus", this.bind(function() {
                this.container.addClass("select2-container-active");
            }));
        }