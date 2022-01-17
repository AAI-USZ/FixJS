function (db) {
                DB3 = db;
                assert.instanceOf(db, DummyDatabase);
                assert.isTrue(db.connected);
                assert.deepEqual(db.sqls, [ 'DROP TABLE "test"', 'CREATE TABLE "test" ("id" integer PRIMARY KEY AUTOINCREMENT, "name" varchar(255), "age" numeric)' ]);
            }