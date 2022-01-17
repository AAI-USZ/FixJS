function (type, index, orig) {
            komooMap.overlayOptions[type.type] = type;
            var item = $("<li>").addClass("map-menuitem");
            if (!type.icon) {
                if (type.type == 'OrganizationBranch')
                    type.icon = '/static/img/organization.png';
                else
                    type.icon = '/static/img/' + type.type.toLowerCase() + '.png';
            }
            var icon = $("<img>").attr({src: type.icon}).css("float", "left");
            if (type.disabled) icon.css("opacity", "0.3");
            item.append(icon);

            item.append($("<div>").addClass("item-title").text(type.title).attr("title", type.tooltip));
            var submenu = komooMap.addItems.clone(true).addClass("map-submenu");
            $("div", submenu).hide();
            type.overlayTypes.forEach(function (overlayType, index, orig) {
                $("#map-add-" + overlayType, submenu).addClass("enabled").show();
            });
            var submenuItems = $("div.enabled", submenu);
            if (type.disabled) {
                item.addClass("disabled");
            }
            item.css({
                "position": "relative"
            });
            submenuItems.removeClass("map-button").addClass("map-menuitem"); // Change the class
            submenuItems.bind("click", function () {
                $(".map-submenu", addMenu).hide();
                $(".map-menuitem.selected", komooMap.mainPanel).removeClass("selected");
                item.addClass("selected");
                $(".map-menuitem:not(.selected)", komooMap.mainPanel).addClass("frozen");
            });
            if (submenuItems.length == 1) {
                submenuItems.hide();
                item.bind("click", function () {
                    if (komooMap.addPanel.is(":hidden") && !$(this).hasClass("disabled")) {
                        komooMap.type = type.type;
                        submenuItems.trigger("click");
                    }
                });
            } else {
                item.bind("click", function () {
                    // Menu should not work if add panel is visible.
                    if (komooMap.addPanel.is(":hidden") && !$(this).hasClass("disabled")) {
                        komooMap.type = type.type;
                        submenu.css({"left": item.outerWidth() + "px"});
                        submenu.toggle();
                    }
                });
            }
            submenu.css({
                "top": "0",
                "z-index": "999999"
            });
            item.append(submenu);
            addMenu.append(item);
            type.selector = item;
        }