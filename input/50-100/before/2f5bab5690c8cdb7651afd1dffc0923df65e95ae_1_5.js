function () {
                var me = this;
                me.$el.on("click", ".view-editable .icon-edit,.view-editable-empty icon-edit", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable", null, function (e) {
                    me.onKeyUp(e);
                });
                me.$el.on("keypress", ".editor-editable", null, function (e) {
                    me.onKeyPress(e);
                });
            }