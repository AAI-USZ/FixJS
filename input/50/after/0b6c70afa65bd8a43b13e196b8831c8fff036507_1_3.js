function () {
                jstestdriver.console.log("get model v3 Success");
                jstestdriver.console.log("migration path step is 5 #5");
                assertEquals("migration path step is 5", 5, stepOnUpgrade);

                deleteDB(databasev3);
            }