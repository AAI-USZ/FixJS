function checkUpdateFinished() {
  // Don't proceed until the update.log has been created.
  let log = getUpdatesDir();
  log.append("0");
  log.append(FILE_UPDATE_LOG);
  if (!log.exists()) {
    if (++gTimeoutRuns > MAX_TIMEOUT_RUNS)
      do_throw("Exceeded MAX_TIMEOUT_RUNS whilst waiting for updates log to be created at " + log.path);
    else
      do_timeout(CHECK_TIMEOUT_MILLI, checkUpdateFinished);
    return;
  }

  // Log the contents of the update.log so it is simpler to diagnose a test
  // failure. For example, on Windows if the application binary is in use the
  // updater will not apply the update.
  let contents = readFile(log);
  logTestInfo("contents of " + log.path + ":\n" +  
              contents.replace(/\r\n/g, "\n"));

  if (contents.indexOf("NS_main: file in use") != -1) {
    do_throw("the application can't be in use when running this test");
  }

  standardInit();

  let update = gUpdateManager.getUpdateAt(0);
  do_check_eq(update.state, STATE_SUCCEEDED);

  let updateTestDir = getUpdateTestDir();

  let file = updateTestDir.clone();
  file.append("UpdateTestRemoveFile");
  do_check_false(file.exists());

  file = updateTestDir.clone();
  file.append("UpdateTestAddFile");
  do_check_true(file.exists());
  do_check_eq(readFileBytes(file), "UpdateTestAddFile\n");

  file = updateTestDir.clone();
  file.append("removed-files");
  do_check_true(file.exists());
  do_check_eq(readFileBytes(file), "update_test/UpdateTestRemoveFile\n");

  let updatesDir = getUpdatesDir();
  log = updatesDir.clone();
  log.append("0");
  log.append(FILE_UPDATE_LOG);
  logTestInfo("testing " + log.path + " shouldn't exist");
  do_check_false(log.exists());

  log = updatesDir.clone();
  log.append(FILE_LAST_LOG);
  logTestInfo("testing " + log.path + " should exist");
  do_check_true(log.exists());

  log = updatesDir.clone();
  log.append(FILE_BACKUP_LOG);
  logTestInfo("testing " + log.path + " shouldn't exist");
  do_check_false(log.exists());

  updatesDir.append("0");
  logTestInfo("testing " + updatesDir.path + " should exist");
  do_check_true(updatesDir.exists());

  Services.dirsvc.unregisterProvider(gDirProvider);
  removeCallbackCopy();
}