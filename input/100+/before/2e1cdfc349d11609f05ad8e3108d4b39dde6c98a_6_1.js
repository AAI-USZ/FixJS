function () {
      Services.obs.removeObserver(this, "addon-repository-shutdown");
      // Check the DB schema has changed once AddonRepository has freed it.
      db = AM_Cc["@mozilla.org/storage/service;1"].
           getService(AM_Ci.mozIStorageService).
           openDatabase(dbfile);
      do_check_eq(db.schemaVersion, EXPECTED_SCHEMA_VERSION);
      do_check_true(db.indexExists("developer_idx"));
      do_check_true(db.indexExists("screenshot_idx"));
      do_check_true(db.indexExists("compatibility_override_idx"));
      do_check_true(db.tableExists("compatibility_override"));

      // Check the trigger is working
      db.executeSimpleSQL("INSERT INTO addon (id, type, name) VALUES('test_addon', 'extension', 'Test Addon')");
      let internalID = db.lastInsertRowID;
      db.executeSimpleSQL("INSERT INTO compatibility_override (addon_internal_id, num, type) VALUES('" + internalID + "', '1', 'incompatible')");

      let stmt = db.createStatement("SELECT COUNT(*) AS count FROM compatibility_override");
      stmt.executeStep();
      do_check_eq(stmt.row.count, 1);
      stmt.reset();

      db.executeSimpleSQL("DELETE FROM addon");
      stmt.executeStep();
      do_check_eq(stmt.row.count, 0);
      stmt.finalize();

      db.close();
      run_test_2();
    }