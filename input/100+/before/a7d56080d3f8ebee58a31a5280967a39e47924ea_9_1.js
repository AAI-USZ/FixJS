function(){
        window.plugins.nativeUI.setTitle({title: "Подлепры", organize: false, refresh: false, menu: true});

        lastPages = ["#subsPage"];
    	
        subsList = $("#subsList");
        subsList.empty();

        if( iLepra.sub.fetch ){
            $.mobile.showPageLoadingMsg();

            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);

                // hide loading msg
                $.mobile.hidePageLoadingMsg();

                rendreNew();
            });
            iLepra.sub.getList();
        }else{
            rendreNew();
        }
    }