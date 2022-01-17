function (manager, i) {
                        assert.equal(manager.name, "Manager " + i);
                        assert.equal(manager.numstaff, manager.staff.length);
                        if (manager instanceof Executive) {
                            assert.equal(manager.nummanagers, 0);
                        }
                    }