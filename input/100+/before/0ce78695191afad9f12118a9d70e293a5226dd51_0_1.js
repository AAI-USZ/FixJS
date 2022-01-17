function() {
    this.activeTopNode = -1;
    this.blockingCallback = null;
    this.loadCallback = null;
    this.navigation = new Array(6);
    
    this.start = function() {
        this.authenticate();
    }

    this.authenticate = function() {
        // Todo: Do authentication and then proceed
        this.load(1);
    }

    this.load = function(id) {
        $.post("memplex.php",
            {id: id},
            function(data) {
                var json = $.parseJSON(data);
                var Memplex = json.data;
                Controller.loadMemplex(Memplex);
            });
    }
    
    this.loadMemplex = function(Memplex) {
        this.activeTopnode = Memplex.id;
        
        var position = Helper.getLayerPosition(Memplex.layer);
        this.navigation[position] = Memplex;
        View.create(Memplex);
        
        if ( this.loadCallback != null ) {
            this.loadCallback();
            this.loadCallback = null;
        }
    }
    
    this.submit = function(data,callback) {
        View.block();
        $.post("memplex.php", {
                "parent": Controller.activeTopnode,
                "layer": data.layer,
                "author": data.author,
                "title": data.title,
                "text": data.text
            },
            function (data) {
                var json = $.parseJSON(data);
                var Memplex = json.data;
                Controller.loadMemplex(Memplex);
        });
    }
}