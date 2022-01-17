function (data) {
                var json = $.parseJSON(data);
                Controller.memplex = json.data;
                Controller.loadMemplex(Controller.memplex);
                
                console.log(callback);
                if ( Controller.blockingCallback != null ) {
                    Controller.blockingCallback();
                    Controller.blockingCallback = null;
                }
        }