function () {
            
            it("should require command and key binding arguments", function () {
                KeyBindingManager.addBinding();
                expect(KeyBindingManager.getKeymap()).toEqual({});
                
                KeyBindingManager.addBinding("test.foo");
                expect(KeyBindingManager.getKeymap()).toEqual({});
                expect(KeyBindingManager.getKeyBindings("test.foo")).toEqual([]);
            });
            
            it("should ignore invalid bindings", function () {
                expect(KeyBindingManager.addBinding("test.foo", "Ktrl-Shift-A")).toBeNull();
                expect(KeyBindingManager.addBinding("test.foo", "Ctrl+R")).toBeNull();
                expect(KeyBindingManager.getKeymap()).toEqual({});
            });
            
            it("should add single bindings to the keymap", function () {
                // use a fake platform
                brackets.platform = "test";
                
                var result = KeyBindingManager.addBinding("test.foo", "Ctrl-A");
                expect(result).toEqual(key("Ctrl-A"));
                expect(KeyBindingManager.getKeyBindings("test.foo")).toEqual([key("Ctrl-A")]);
                
                result = KeyBindingManager.addBinding("test.bar", "Ctrl-B");
                expect(result).toEqual(key("Ctrl-B"));
                expect(KeyBindingManager.getKeyBindings("test.bar")).toEqual([key("Ctrl-B")]);
                
                result = KeyBindingManager.addBinding("test.cat", "Ctrl-C", "bark");
                expect(result).toBeNull();
                
                result = KeyBindingManager.addBinding("test.dog", "Ctrl-D", "test");
                expect(result).toEqual(key("Ctrl-D"));
                expect(KeyBindingManager.getKeyBindings("test.dog")).toEqual([key("Ctrl-D")]);
                
                // only "test" platform bindings
                var expected = keyMap([
                    keyBinding("Ctrl-A", "test.foo"),
                    keyBinding("Ctrl-B", "test.bar"),
                    keyBinding("Ctrl-D", "test.dog")
                ]);
                
                expect(KeyBindingManager.getKeymap()).toEqual(expected);
            });
            
            it("should use displayKey to override display of the shortcut", function () {
                KeyBindingManager.addBinding("test.foo", key("Ctrl-=", "Ctrl-+"));
                
                // only "test" platform bindings
                var expected = keyMap([
                    keyBinding("Ctrl-=", "test.foo", "Ctrl-+")
                ]);
                
                expect(KeyBindingManager.getKeymap()).toEqual(expected);
            });
            
            it("should add multiple bindings to the keymap", function () {
                // use a fake platform
                brackets.platform = "test1";
                
                var results = KeyBindingManager.addBinding("test.foo", [{key: "Ctrl-A", platform: "test1"}, "Ctrl-1"]);
                expect(results).toEqual([
                    key("Ctrl-A"),
                    key("Ctrl-1")
                ]);
                expect(KeyBindingManager.getKeyBindings("test.foo")).toEqual([
                    key("Ctrl-A"),
                    key("Ctrl-1")
                ]);
                
                results = KeyBindingManager.addBinding("test.bar", [{key: "Ctrl-B"}, {key: "Ctrl-2", platform: "test2"}]);
                expect(results).toEqual([
                    key("Ctrl-B")
                ]);
                expect(KeyBindingManager.getKeyBindings("test.bar")).toEqual([
                    key("Ctrl-B")
                ]);
            
                // only "test1" platform and cross-platform bindings
                var expected = keyMap([
                    keyBinding("Ctrl-A", "test.foo"),
                    keyBinding("Ctrl-1", "test.foo"),
                    keyBinding("Ctrl-B", "test.bar")
                ]);
                
                expect(KeyBindingManager.getKeymap()).toEqual(expected);
            });
            
            it("should prevent a key binding from mapping to multiple commands", function () {
                KeyBindingManager.addBinding("test.foo", "Ctrl-A");
                KeyBindingManager.addBinding("test.bar", "Ctrl-A");
                
                var expected = keyMap([
                    keyBinding("Ctrl-A", "test.foo")
                ]);
                
                expect(KeyBindingManager.getKeymap()).toEqual(expected);
            });
            
            it("should allow a command to map to multiple key bindings", function () {
                KeyBindingManager.addBinding("test.foo", "Ctrl-A");
                KeyBindingManager.addBinding("test.foo", "Ctrl-B");
                
                // only "test1" platform and cross-platform bindings
                var expected = keyMap([
                    keyBinding("Ctrl-A", "test.foo"),
                    keyBinding("Ctrl-B", "test.foo")
                ]);
                
                expect(KeyBindingManager.getKeymap()).toEqual(expected);
            });
            
        }