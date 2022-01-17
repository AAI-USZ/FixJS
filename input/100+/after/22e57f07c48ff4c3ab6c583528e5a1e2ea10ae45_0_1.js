function(template){
            var html = template.render(connectors[index]);

            $("body").append(html);
            $("#deleteConnectorConfirm").modal();

            $("#deleteConnectorConfirm").css("zIndex","1052");

            $("#deleteConnectorConfirm").on("hidden",function(){
                $("#deleteConnectorConfirm").remove();
            });

            var backdrops = $(".modal-backdrop");
            $(backdrops[backdrops.length - 1]).css("zIndex","1051");

            var confirmDelete = $("#confirmRemoveConnectorBtn");
            var cancelDelete = $("#cancelRemoveConnectorBtn");

            cancelDelete.click(function() {
                $("#deleteConnectorConfirm").modal("hide");
            });

            confirmDelete.click(function(){
                $.ajax({
                    url: "/api/connectors/" + connectors[index].connectorName,
                    type:"DELETE",
                    success: function() {
                        updateContents();
                        $("#deleteConnectorConfirm").modal("hide");
                    },
                    error: function() {
                        $("#deleteConnectorConfirm").modal("hide");
                    }
                });
            });
        }