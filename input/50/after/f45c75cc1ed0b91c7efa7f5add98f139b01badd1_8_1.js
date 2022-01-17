function () {
                        assert.deepEqual(PG_DB.sqls, [ "BEGIN",
                            "LOCK TABLE  test IN EXCLUSIVE MODE",
                            "INSERT INTO test (name) VALUES ('a') RETURNING *",
                            "COMMIT" ]);
                    }