function(data){
        switch(data){
            case "Посты":
                setTimeout(function(){
                    $.mobile.changePage("#postsPage");
                }, animateTime)
                break;
            case "Мои вещи":
                setTimeout(function(){
                    $.mobile.changePage("#mystuffPage");
                }, animateTime)
                break;    
            case "Инбокс":
                setTimeout(function(){
                    $.mobile.changePage("#inboxPage");
                }, animateTime)
                break;
            case "Избранное":
                setTimeout(function(){
                    $.mobile.changePage("#favsPage");
                }, animateTime)
                break;    
            case "Мои подлепры":
                setTimeout(function(){
                    iLepra.sub.list = iLepra.userSubLepras;
                    iLepra.sub.fetch = false;
                    $.mobile.changePage("#subsPage", {allowSamePageTransition: true});
                }, animateTime)
                break;
            case "Блоги империи":
                setTimeout(function(){
                    iLepra.sub.fetch = true;
                    $.mobile.changePage("#subsPage", {allowSamePageTransition: true});
                }, animateTime)
                break;
            case "Белый дом":
                setTimeout(function(){
                    $.mobile.changePage("#govPage");
                }, animateTime)
                break;            
            case "Чятик":
                setTimeout(function(){
                    $.mobile.changePage("#chatPage");
                }, animateTime)
                break;
            case "Выход":
                setTimeout(function(){
                    $.mobile.showPageLoadingMsg();
                    $(document).bind(iLepra.events.ready, function(event){
                        $(document).unbind(event);
                        // bind event listener for initialization
                        $(document).bind(iLepra.events.init, function(event){
                            $(document).unbind(event);
                            // navigate to login page
                            $.mobile.changePage("#loginPage");
                        });
                        iLepra.init();
                    });
                    iLepra.doLogout();
                }, animateTime)
                break;    
            
            
            case "Профиль":
                profileName = iLepra.username;
                setTimeout(function(){
                    $.mobile.changePage("#profilePage");
                }, animateTime)
                break;
        }
    }