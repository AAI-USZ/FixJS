function(){
        if( profileName == iLepra.username ){
            window.plugins.nativeUI.setTitle({organize: false, refresh: false, menu: true, title: profileName});
        }else{
            window.plugins.nativeUI.setTitle({organize: false, refresh: false, back: true, title: profileName});
        }        
    }