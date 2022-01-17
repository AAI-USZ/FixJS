function () {
                CommandManager.register("Brackets Test Command Custom", "custom.command", function () {});
                var cmenu = Menus.registerContextMenu("test-cmenu");
                cmenu.addMenuItem("custom.command");

                var closeEvent = false;
                testWindow.$(cmenu).on("contextMenuClose", function () {
                    closeEvent = true;
                });
                cmenu.open({pageX: 0, pageY: 0});

                // verify dropdown is open
                var $menus = testWindow.$(".dropdown.open");
                expect($menus.length).toBe(1);

                // close the context menu by simulating Esc key
                var key = 27,   // Esc key
                    element = $menus[0];
                SpecRunnerUtils.simulateKeyEvent(key, "keydown", element);

                // verify close event
                expect(closeEvent).toBeTruthy();

                // verify all dropdowns are closed
                $menus = testWindow.$(".dropdown.open");
                expect($menus.length).toBe(0);
            }