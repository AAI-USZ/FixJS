function (data) {
                var json = $.parseJSON(data);
                var Memplex = json.data;
                Controller.loadMemplex(Memplex);
        }