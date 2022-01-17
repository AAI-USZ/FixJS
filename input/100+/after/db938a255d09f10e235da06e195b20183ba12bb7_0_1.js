function(name, menable, tab, config) {
        var app = this.application;
        if (name.match(/\.view\./)){
            return this.loadview(name, menable, tab);
        }
        if (!name.match(/\.controller\./)) return false;
        c = app.getController(name);
        if (!c){
            alert(name+': not found!');
            return false;
        }

        var views = c.views;
        if (!Ext.isArray(views)){
            alert(name+': no views!');
            return false;
        }
        for(var i=0;i<views.length; i++){
            var view = views[i];
            if (!this.loadview(view, menable, tab, config)) return false;
        }
        return true;
    }