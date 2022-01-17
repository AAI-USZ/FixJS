function () {
                brackets.platform = "mac";
                    
                KeyBindingManager.addBinding("test.cmd", "Cmd-A", "mac");
                KeyBindingManager.addBinding("test.ctrl", "Ctrl-A", "mac");
                KeyBindingManager.addBinding("test.ctrlAlt", "Ctrl-Alt-A", "mac");
                KeyBindingManager.addBinding("test.cmdCtrlAlt", "Cmd-Ctrl-A", "mac");
                
                var expected = keyMap([
                    keyBinding("Cmd-A", "test.cmd"),
                    keyBinding("Ctrl-A", "test.ctrl"),
                    keyBinding("Ctrl-Alt-A", "test.ctrlAlt"),
                    keyBinding("Ctrl-Cmd-A", "test.cmdCtrlAlt") // KeyBindingManager changes the order
                ]);
                
                expect(KeyBindingManager.getKeymap()).toEqual(expected);
            }