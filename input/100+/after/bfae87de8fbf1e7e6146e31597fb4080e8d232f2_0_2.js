function ()
            {
                var thisMenu = this;
                thisMenu.options = {};
                $.extend (thisMenu.options, $.mbMenu.options);
                $.extend (thisMenu.options, options);
                $(".mbmenu").hide();
                thisMenu.clicked = false;
                thisMenu.rootMenu=false;
                thisMenu.actualOpenedMenu=false;
                thisMenu.menuvoice=false;

                /*
         *using metadata plugin you can add attribut writing them inside the class attr with a JSON sintax
         * for ex: class="rootVoice {menu:'menu_2'}"
         */
                var cMenuEls;
                if ($.metadata){
                    $.metadata.setType("class");
                    cMenuEls= $(this).find(".cmVoice");
                    $(cMenuEls).each(function(){
                        if ($(this).metadata().cMenu) $(this).attr("cMenu",$(this).metadata().cMenu);
                    });
                }
                cMenuEls= $(this).find("[cMenu]").add($(this).filter("[cMenu]"));

                $(cMenuEls).each(function(){
                    $(this).css({
                        "-webkit-user-select":"none",
                        "-moz-user-select":"none"
                    });
                    var cm=this;
                    cm.id = !cm.id ? "menu_"+Math.floor (Math.random () * 100): cm.id;
                    $(cm).css({
                        cursor:"default"
                    });
                    $(cm).bind("contextmenu","mousedown",function(event){
                        event.preventDefault();
                        event.stopPropagation();
                        event.cancelBubble=true;
            
                        $.mbMenu.lastContextMenuEl=cm;
            
                        //Here I have added a condition that the menu will only build if the parent isn't loading
                        if (!$($.mbMenu.lastContextMenuEl).hasClass("loading"))
                        {                                            
                            if ($.mbMenu.options.actualMenuOpener) {
                                $(thisMenu).removeMbMenu($.mbMenu.options.actualMenuOpener);
                            }
                            /*add custom behavior to contextMenuEvent passing the el and the event
                            *you can for example store to global var the obj that is fireing the event
                            *mbActualContextualMenuObj=cm;
                            *
                            * you can for example create a function that manipulate the voices of the menu
                            * you are opening according to a certain condition...
                            */

                            thisMenu.options.onContextualMenu(this,event);

                            $(this).buildMbMenu(thisMenu,$(this).attr("cMenu"),"cm",event);
                            $(this).attr("isOpen","true");
                        }
                    });
                });
            }