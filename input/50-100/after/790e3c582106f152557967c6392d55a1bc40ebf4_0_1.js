function(data,callback) {
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