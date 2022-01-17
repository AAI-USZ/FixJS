function () {
                //TODO: separar de alguna forma $editor y .editor-editable ya que están representando tanto la vista de edición como el elemento que tiene el valor.
                var me = this;
                me.$editor.find("textarea").MarkdownDeep({
                    help_location: "/Scripts/mdd_help.htm",
                    disableTabHandling: true,
                    resizebar: false,
                    ExtraMode: true
                });
                me.$editor.find(".mdd_preview").hide(); //Esto es un parche para no mostrar el preview de MarkdownDeep
                me.$el.on("click", ".view-editable,.view-editable-empty", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable textarea", null, function (e) {
                    me.onKeyUp(e);
                });
            }