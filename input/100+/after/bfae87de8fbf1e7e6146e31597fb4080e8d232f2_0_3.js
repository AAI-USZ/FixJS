function(op,fade){
            if(!op)op=$.mbMenu.options.actualMenuOpener;
            if(!op) return;
            if (op.rootMenu) {
                $(op.actualOpenedMenu)
                .removeAttr("isOpen")
                .removeClass("selected");
                $("[isOpen]").removeAttr("isOpen");
                $(op.rootMenu).css({
                    width:1, 
                    height:1
                });
                if (fade) $(op.rootMenu).fadeOut(op.options.fadeOutTime,function(){
                    $(this).remove();
                });
                else $(op.rootMenu).remove();
                op.rootMenu=false;
                op.clicked=false;
            }
        }