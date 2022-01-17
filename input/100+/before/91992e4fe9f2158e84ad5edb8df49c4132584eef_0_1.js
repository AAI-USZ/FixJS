function ($) {

    "use strict"; // jshint ;_;

    var ResponsiveTab = function (e) {
                this.init(e);
                this.resizeTabs();
                var instance = this;
                //bind on resize to compute optimum size
                $(window).resize(function () {
                        instance.resizeTabs();
                });
            }

    ResponsiveTab.prototype = {
        selector : "responsive-tabs",
        constructor: ResponsiveTab,
        init:function(e){
            //FIXME que faire lorsqu'un élément actif se trouve ds le ddown
            console.log("init()");

            $(e).addClass(this.selector);
            $(e).find('.dropdown-menu li').addClass('do-not-move');
        },
        resize:function(o){
            console.log("resize");

            var object = $(o);
            //Hiding to avoid blink effect
            object.css('visibility','hidden');

            //Set to initial position/size
            var itemsToMove = object.find('.dropdown-menu li:not([class*="do-not-move"])');
            var alwaysInDropdown = object.find('.dropdown-menu li.do-not-move');
            //Put all tabs in line and remove the 'more' tab
            object.find('.dropdown').remove();
            var dropdownMenu = $('<li class="dropdown">' +
                                 '<a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
                                 'more<b class="caret"></b>' +
                                 '</a>' +
                                 '<ul class="dropdown-menu pull-right"></ul>' +
                                 '</li>');
            object.append(itemsToMove);
            object.append(dropdownMenu);
            //select only items that could move
            var items = object.find('li:not(li[class*="active"], ' +
                                    'li[class*="required"], ' +
                                    'li[class*="dropdown"], ' +
                                    'li[class*="do-not-move"])');

            //items that dont move
            var itemsInTabs = object.find('li[class*="active"], li[class*="required"]');
            var itemsInDropdown = [];
            var currentWidth = 0;
            var maxWidth = object.width() - dropdownMenu.outerWidth(true);
            var maxReach = false;
            //compute initial width
            itemsInTabs.each(function(i,tab){
               currentWidth+=$(tab).outerWidth(true);
            });
            //find optimal width
            items.each(function (i,tab){
                var tabWidth = $(tab).outerWidth(true);
                if(!maxReach &&
                   ((currentWidth+tabWidth)<maxWidth)){
                    currentWidth += tabWidth;
                    itemsInTabs.push(tab);
                }else{
                    //if max width reaching, add all tabs in ddown
                    maxReach=true;
                    itemsInDropdown.push(tab);
                }
            });
            var itemsToPutInDropdown = itemsInDropdown.concat(alwaysInDropdown.toArray());
            object.empty();
            //rebuild all tabs
            object.append(itemsInTabs);
            object.append(dropdownMenu);
            if(itemsToPutInDropdown.length>0){
                object.find('.dropdown-menu').append(itemsToPutInDropdown);
                $().dropdown();
            }else{
                object.find('.dropdown').remove();
            }
            object.css('visibility','visible');
        },
        resizeTabs:function(){
            console.log("resizeTabs()");

            var instance = this;
            $('.'+this.selector).each(function(){instance.resize(this)});
        }
    }

    $.fn.responsiveTab = function (option) {
        return this.each(function () {
            var $this = $(this)
                    , data = $this.data('responsiveTab')
            if (!data) $this.data('responsiveTab', (data = new ResponsiveTab(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.responsiveTab.Constructor = ResponsiveTab


    /* APPLY TO STANDARD TAB ELEMENTS
     * =================================== */

    $(function () {

    })

}