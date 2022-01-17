function viewUpdates(template, connector) {
        var connectorName = connector.connectorName.charAt(0).toUpperCase() + connector.connectorName.slice(1);

        var html = template.render({connectorName : connectorName});
        $("body").append(html);
        $("#viewUpdatesModal").modal();

        $("#viewUpdatesModal").css("zIndex","1052");

        $("#viewUpdatesModal").on("hidden",function(){
            $("#viewUpdatesModal").remove();
        });

        var backdrops = $(".modal-backdrop");
        $(backdrops[backdrops.length - 1]).css("zIndex","1051");
    }