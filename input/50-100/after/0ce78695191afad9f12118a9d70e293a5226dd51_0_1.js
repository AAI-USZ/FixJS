function(id,callback) {
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