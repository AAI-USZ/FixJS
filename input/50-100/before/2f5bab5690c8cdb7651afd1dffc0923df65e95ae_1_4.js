function () {
                //TODO: separar de alguna forma $editor y .editor-editable ya que están representando tanto la vista de edición como el elemento que tiene el valor.
                if (this.$editor.css("display") != "none") {
                    this.$editor.focus().select();
                }
            }