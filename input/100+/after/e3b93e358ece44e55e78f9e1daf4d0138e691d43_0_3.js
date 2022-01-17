function confirmDelete(index){
        App.closeModal();
        $("#modal").on("hidden",function(){
            App.loadMustacheTemplate("connectorMgmtTemplates.html","deleteConnectorConfirm",function(template){
                App.makeModal(template.render(connectors[index]));
                var confirmDelete = $("#confirmDeleteBtn");

                confirmDelete.click(function(){
                    $.ajax("/api/connectors/" + connectors[index].connectorName,{
                        type:"DELETE",
                        success: App.closeModal,
                        error: App.closeModal
                    });

                });

                $("#modal").on("hidden",show);

            });


        });

    }