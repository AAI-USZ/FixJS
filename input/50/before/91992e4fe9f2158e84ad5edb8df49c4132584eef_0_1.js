function(e){
            //FIXME que faire lorsqu'un élément actif se trouve ds le ddown
            console.log("init()");

            $(e).addClass(this.selector);
            $(e).find('.dropdown-menu li').addClass('do-not-move');
        }