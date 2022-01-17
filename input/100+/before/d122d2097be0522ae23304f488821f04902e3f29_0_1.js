function(id, name, options, data) {
        this.id = id;
        this.name = name;
        this.setupWrapper();
        if (!options) {
            options = {};
        }
        if (!data) {
            data = "";
        }
        
        if(!options.width) {
            options.width = Ext.get(id).getWidth()-2;
        }

        options.value = data;
        options.name = id + "_editable";
        this.element = new Ext.form.TextField(options);
        this.element.render(id);

        if(options["autoStyle"] !== false) {
            var styles = Ext.get(id).parent().getStyles("font-size","font-family","font-style","font-weight","font-stretch","font-variant","color","line-height","text-shadow","text-align","text-decoration","text-transform","direction","white-space","word-spacing");
            styles["background"] = "none";
            if(!options["height"]) {
                styles["height"] = "auto";
            }
            this.element.getEl().applyStyles(styles);
        }
    }