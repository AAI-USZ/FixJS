function (t) {
                        assert.instanceOf(t, Employee);
                        assert.equal(ids[i++], t.id);
                    }