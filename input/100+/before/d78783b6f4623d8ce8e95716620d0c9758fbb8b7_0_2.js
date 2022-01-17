function() {
    var activeTopNode = -1;
    var blockingCallback = null;
    
    this.start = function() {
        this.authenticate();
    }

    this.authenticate = function() {
        // Todo: Do authentication and then proceed
        this.load(0);
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
        Controller.activeTopnode = Memplex.id;
        View.create(Memplex);
    }
    
    this.submit = function(data,callback) {
        View.block();
        this.blockingCallback = callback;
        console.log(callback);
        $.post("memplex.php", 
            {
                "parent": Controller.activeTopnode,
                "layer": data.layer,
                author: data.author,
                title: data.title,
                text: data.text
            },
            function (data) {
                var json = $.parseJSON(data);
                var Memplex = json.data;
                Controller.blockingCallback();
                Controller.loadMemplex(Memplex);
        });
    }
}