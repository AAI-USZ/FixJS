function(){

        var cookie = 'cb-min'+this.chatBoxId;

        var min = AJS.Cookie.read(cookie);

        if(min  == "true"){

            return true

        }else{

            return false;

        }

    }