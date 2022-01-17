function(e){
            //FIXME conserver l'item actif/required
            //FIXME ajouter le do-not-move automatiquement à l'init du plugin
            console.log("responsiveTab()");
            //Hiding to avoid blink effect
            $('.nav-tabs').css('visibility','hidden');
            //On reinit pour pouvoir recalculer correctement la taille
            var p = $('.nav-tabs .dropdown-menu li[class!="dp-not-move"]');
            var alwaysInDropdown = $('.nav-tabs .dropdown-menu li.do-not-move');
            $('.nav-tabs .dropdown').remove();
            $('.nav-tabs').append('<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">more<b class="caret"></b></a><ul class="dropdown-menu pull-right"></ul></li>');
            $('.nav-tabs').append(p);
            var dropdownMenu = $('.nav-tabs li.dropdown');
            var tabs = $('.nav-tabs li[class!="dropdown"][class!="do-not-move"]');

            var toAdd = [];
            var others = [];
            var currentWidth = 0;
            var maxWidth = $('.nav-tabs').width() - dropdownMenu.width();
            var maxReach = false;
            tabs.each(function (i,tab){
                var tabWidth = $(tab).width();
                if(!maxReach &&
                   ((currentWidth+tabWidth)<maxWidth || $(tab).hasClass("required") || $(tab).hasClass("active"))){
                    currentWidth += tabWidth;
                    toAdd.push(tab);
                }else{
                    maxReach=true;
                    others.push(tab);
                }
            });
            var itemsToPutInDropdown = others.concat(alwaysInDropdown.toArray());
            $('.nav-tabs').empty();
            $('.nav-tabs').append(toAdd);
            $('.nav-tabs').append(dropdownMenu);
            if(itemsToPutInDropdown.length>0){
                $('.nav-tabs .dropdown-menu').append(itemsToPutInDropdown);
                $().dropdown();
            }else{
                $('.nav-tabs .dropdown').remove();
            }
            $('.nav-tabs').css('visibility','visible');
        }