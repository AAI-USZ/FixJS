function (manager, i) {
                        assert.equal(manager.name, "Manager " + i);
                        assert.equal(manager.numStaff, manager.staff.length);
                        if (manager instanceof Executive) {
                            assert.equal(manager.numManagers, 0);
                        }
                    }