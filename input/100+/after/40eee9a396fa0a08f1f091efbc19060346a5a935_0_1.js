function clickDisable(){
            handler.unbind("click", clickDisable);
            return false;
        }