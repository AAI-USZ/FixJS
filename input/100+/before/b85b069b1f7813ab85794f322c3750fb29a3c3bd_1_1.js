function () {
                    CommandManager.register("Brackets Test Command Custom 0", "custom.command0", function () {});
                    CommandManager.register("Brackets Test Command Custom 1", "custom.command1", function () {});
                    var menu = Menus.addMenu("Custom", "menu-custom");

                    var menuItem = null;
                    menuItem = menu.addMenuItem("custom.command0");
                    menuItem = menu.addMenuDivider();
                    menuItem = menu.addMenuItem("custom.command1");

                    var $listItems = testWindow.$("#menu-custom > ul").children();
                    expect($listItems.length).toBe(3);
                    expect($($listItems[1]).find("hr.divider").length).toBe(1);
                }