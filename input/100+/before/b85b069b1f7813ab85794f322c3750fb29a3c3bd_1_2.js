function () {
                var cmenu = Menus.registerContextMenu("test-cmenu");
                
                // Add menu item via command id
                CommandManager.register("Brackets Test Command Custom 1", "custom.command1", function () {});
                var menuItem = cmenu.addMenuItem("custom.command1");
                expect(menuItem).toBeTruthy();
                expect(cmenu).toBeTruthy();

                // Add menu item via command object
                var command = CommandManager.register("Brackets Test Command Custom 2", "custom.command2", function () {});
                menuItem = cmenu.addMenuItem(command);
                expect(menuItem).toBeTruthy();

                // duplicate command in Menu
                menuItem = cmenu.addMenuItem("custom.command1");
                expect(menuItem).toBeFalsy();

                // duplicate ids
                var cmenu2 = Menus.registerContextMenu("test-cmenu");
                expect(cmenu2).toBeFalsy();
            }