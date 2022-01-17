function () {
                var me = this;
                me.$el.on("click", ".view-editable,.view-editable-empty", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable textarea", null, function (e) {
                    me.onKeyUp(e);
                });
            }