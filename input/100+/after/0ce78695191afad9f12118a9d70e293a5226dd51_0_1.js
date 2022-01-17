function() {
    this.memplex = null;
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

    this.load = function(id,callback) {
        //Controller.blockingCallback = callback;
        $.post("memplex.php",
            {id: id},
            function(data) {
                var json = $.parseJSON(data);
                Controller.memplex = json.data;
                Controller.loadMemplex(Controller.memplex);
                
                // if ( this.blockingCallback != null ) {
                    // this.blockingCallback();
                    // this.blockingCallback = null;
                // }
            });
    }
    
    this.loadMemplex = function(Memplex) {
        this.activeTopnode = Memplex.id;
        
        var position = Helper.getLayerPosition(Memplex.layer);
        this.navigation[position] = Memplex;
        View.create(Memplex);
    }
    
    this.submit = function(data,callback) {
        View.block();
        Controller.blockingCallback = callback;
        console.log(callback);
        $.post("memplex.php", {
                "parent": Controller.activeTopnode,
                "layer": data.layer,
                "author": data.author,
                "title": data.title,
                "text": data.text
            },
            function (data) {
                var json = $.parseJSON(data);
                Controller.memplex = json.data;
                Controller.loadMemplex(Controller.memplex);
                
                console.log(callback);
                if ( Controller.blockingCallback != null ) {
                    Controller.blockingCallback();
                    Controller.blockingCallback = null;
                }
        });
    }
}