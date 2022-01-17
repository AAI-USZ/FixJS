function () {
                // set up test menu and menu items
                CommandManager.register("Brackets Test Command Custom 0", "custom.command0", function () {});
                CommandManager.register("Brackets Test Command Custom 1", "custom.command1", function () {});
                CommandManager.register("Brackets Test Command Custom 2", "custom.command2", function () {});
                CommandManager.register("Brackets Test Command Custom 3", "custom.command3", function () {});
                CommandManager.register("Brackets Test Command Custom 4", "custom.command4", function () {});
                CommandManager.register("Brackets Test Command Custom 5", "custom.command5", function () {});
                CommandManager.register("Brackets Test Command Custom 6", "custom.command6", function () {});
                CommandManager.register("Brackets Test Command Custom 7", "custom.command7", function () {});
                CommandManager.register("Brackets Test Command Custom 8", "custom.command8", function () {});
                var menu = Menus.addMenu("Custom", "menu-custom");
                menu.addMenuItem("custom.command0");
                menu.addMenuItem("custom.command1");
                menu.addMenuDivider();
                menu.addMenuItem("custom.command2");
                menu.addMenuItem("custom.command3");

                // create mock menu sections
                var menuSectionCmd0 = {sectionMarker: "custom.command0"},
                    menuSectionCmd2 = {sectionMarker: "custom.command2"};

                var listSelector = "#menu-custom > ul";

                // Add new menu to END of menuSectionCmd0
                var menuItem = menu.addMenuItem("custom.command4", null, Menus.LAST_IN_SECTION, menuSectionCmd0);
                var $listItems = testWindow.$(listSelector).children();
                expect($listItems.length).toBe(6);
                expect($($listItems[2]).find("a#menu-custom-custom\\.command4").length).toBe(1);

                // Add new menu to END of menuSectionCmd2
                menuItem = menu.addMenuItem("custom.command5", null, Menus.LAST_IN_SECTION, menuSectionCmd2);
                $listItems = testWindow.$(listSelector).children();
                expect($($listItems[6]).find("a#menu-custom-custom\\.command5").length).toBe(1);

                // Add new menu to BEGINNING of menuSectionCmd0
                menuItem = menu.addMenuItem("custom.command6", null, Menus.FIRST_IN_SECTION, menuSectionCmd0);
                $listItems = testWindow.$(listSelector).children();
                expect($($listItems[0]).find("a#menu-custom-custom\\.command6").length).toBe(1);

                // Add new menu to BEGINNING of menuSectionCmd2
                menuItem = menu.addMenuItem("custom.command7", null, Menus.FIRST_IN_SECTION, menuSectionCmd2);
                $listItems = testWindow.$(listSelector).children();
                expect($($listItems[0]).find("a#menu-custom-custom\\.command6").length).toBe(1);

            }