function() {
        if ($.data(this.element[0], "inlineEditor")) {
            return;
        }

        /* Constants */
        var self = this;

        /* State */
        this._initialValue = null;
        this._editing = false;

        /* Elements */
        this._form = $("<form/>")
            .addClass("inline-editor-form " + this.options.cls)
            .css("display", "inline")
            .insertBefore(this.element)
            .hide();

        if (this.options.multiline) {
            this._field = $("<textarea/>")
                .appendTo(this._form)
                .autoSizeTextArea();
        } else {
            this._field = $('<input type="text"/>')
                .appendTo(this._form);
        }

        this._field.keypress(function(e) {
            e.stopPropagation();

            switch (e.keyCode) {
                case 10:
                case $.ui.keyCode.ENTER:
                    /* Enter */
                    if (!self.options.forceOpen &&
                        (!self.options.multiline || e.ctrlKey)) {
                        self.submit();
                    }

                    if (!self.options.multiline) {
                        e.preventDefault();
                    }
                    break;

                case $.ui.keyCode.ESCAPE:
                    /* Escape */
                    if (!self.options.forceOpen) {
                        self.cancel();
                    }
                    break;

                default:
                    return;
            }
        }).keydown(function(e) {
            e.stopPropagation();

            var keyCode = e.keyCode ? e.keyCode :
                            e.charCode ? e.charCode : e.which;

            switch (keyCode) {
                case 83:
                case 115:
                    /* s or S */
                    if (e.ctrlKey) {
                        self.save();
                        return false;
                    }
                    break;

                default:
                    break;
            }
        });

        this._buttons = null;

        if (this.options.showButtons) {
            this._buttons = $("<div/>")
                .addClass("buttons")
                .appendTo(this._form);

            if (!this.options.multiline) {
                this._buttons.css("display", "inline");
            }

            var saveButton =
                $('<input type="button"/>')
                .val("OK")
                .addClass("save")
                .appendTo(this._buttons)
                .click(function() { self.submit(); });

            var cancelButton =
                $('<input type="button"/>')
                .val("Cancel")
                .addClass("cancel")
                .appendTo(this._buttons)
                .click(function() { self.cancel(); });
        }

        this._editIcon = null;

        if (this.options.showEditIcon) {
            this._editIcon =
                $("<a/>")
                .attr('href', '#')
                .attr("role", "button")
                .attr("aria-label", "Edit this field")
                .addClass("editicon")
                .append(
                    $('<img src="' + this.options.editIconPath + '"/>')
                )
                .click(function() {
                    self.startEdit();
                    return false;
                });

            if (this.options.showRequiredFlag) {
                this._editIcon.append(
                    $("<span/>")
                        .attr("aria-label", "This field is required")
                        .addClass("required-flag")
                        .text("*"));
            }

            if (this.options.multiline) {
                this._editIcon.appendTo(
                    $("label[for=" + this.element[0].id + "]"));
            } else {
                this._editIcon.insertAfter(this.element);
            }
        }

        if (!this.options.useEditIconOnly) {
            this.element.click(function() {
                self.startEdit();
                return false;
            });
        }

        $(window).resize(function() {
            self._fitWidthToParent();
        });

        if (this.options.forceOpen || this.options.startOpen) {
            self.startEdit(true);
        }
    }