function() {
            var tag = this.editor.getSelectedElements()[0];
            if (!tag) return;
            tag = tag.tagName.toLowerCase();
            if (this.ui.select.find('option[value=' + tag + ']').length) {
                this.ui.val(tag);
            } else {
                this.ui.val('na');
            }
        }