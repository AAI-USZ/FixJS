function () {
                    CommandManager.register("Brackets Test Command Custom 0", "custom.command0", function () {});
                    CommandManager.register("Brackets Test Command Custom 1", "custom.command1", function () {});
                    var menu = Menus.addMenu("Custom", "menu-custom");
                    var menuItem = menu.addMenuItem("custom.command0");
                    menuItem = menu.addMenuItem("custom.command1");
                    
                    // add positioned divider
                    menuItem = menu.addMenuDivider(Menus.AFTER, "custom.command0");
                    var $listItems = testWindow.$("#menu-custom > ul").children();
                    expect($listItems.length).toBe(3);
                    expect($($listItems[1]).find("hr.divider").length).toBe(1);

                    // add divider to end
                    menuItem = menu.addMenuDivider();
                    $listItems = testWindow.$("#menu-custom > ul").children();
                    expect($listItems.length).toBe(4);
                    expect($($listItems[3]).find("hr.divider").length).toBe(1);
                }