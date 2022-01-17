function checkUpdateApplied() {
  gTimeoutRuns++;
  // Don't proceed until the update has been applied.
  if (gUpdateManager.activeUpdate.state != STATE_APPLIED_PLATFORM) {
    if (gTimeoutRuns > MAX_TIMEOUT_RUNS)
      do_throw("Exceeded whilst waiting for update to be applied");
    else
      do_timeout(CHECK_TIMEOUT_MILLI, checkUpdateApplied);
    return;
  }

  let updatedDir = getAppDir();
  if (IS_MACOSX) {
    updatedDir = updatedDir.parent.parent;
  }
  updatedDir.append(UPDATED_DIR_SUFFIX.replace("/", ""));
  logTestInfo("testing " + updatedDir.path + " should exist");
  do_check_true(updatedDir.exists());

  let log;
  if (IS_WIN) {
    log = getUpdatesDir();
  } else {
    log = updatedDir.clone();
    if (IS_MACOSX) {
      log.append("Contents");
      log.append("MacOS");
    }
    log.append("updates");
  }
  log.append(FILE_LAST_LOG);
  if (!log.exists()) {
    do_timeout(CHECK_TIMEOUT_MILLI, checkUpdateApplied);
    return;
  }

  // Don't proceed until the update status is no longer pending or applying.
  let status = readStatusFile();
  do_check_eq(status, STATE_APPLIED_PLATFORM);

  // On Windows, make sure not to use the maintenance service for switching
  // the app.
  if (IS_WIN) {
    writeStatusFile(STATE_APPLIED);
    status = readStatusFile();
    do_check_eq(status, STATE_APPLIED);
  }

  // Log the contents of the update.log so it is simpler to diagnose a test
  // failure.
  let contents = readFile(log);
  logTestInfo("contents of " + log.path + ":\n" +
              contents.replace(/\r\n/g, "\n"));

  let updateTestDir = getUpdateTestDir();
  logTestInfo("testing " + updateTestDir.path + " shouldn't exist");
  do_check_false(updateTestDir.exists());

  updateTestDir = updatedDir.clone();
  updateTestDir.append("update_test");
  let file = updateTestDir.clone();
  file.append("UpdateTestRemoveFile");
  logTestInfo("testing " + file.path + " shouldn't exist");
  do_check_false(file.exists());

  file = updateTestDir.clone();
  file.append("UpdateTestAddFile");
  logTestInfo("testing " + file.path + " should exist");
  do_check_true(file.exists());
  do_check_eq(readFileBytes(file), "UpdateTestAddFile\n");

  file = updateTestDir.clone();
  file.append("removed-files");
  logTestInfo("testing " + file.path + " should exist");
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
  if (IS_WIN) {
    // On Windows this file lives outside of the app directory, so it should exist.
    logTestInfo("testing " + log.path + " should exist");
    do_check_true(log.exists());
  } else {
    logTestInfo("testing " + log.path + " shouldn't exist");
    do_check_false(log.exists());
  }

  log = updatesDir.clone();
  log.append(FILE_BACKUP_LOG);
  logTestInfo("testing " + log.path + " shouldn't exist");
  do_check_false(log.exists());

  updatesDir = updatedDir.clone();
  if (IS_MACOSX) {
    updatesDir.append("Contents");
    updatesDir.append("MacOS");
  }
  updatesDir.append("updates");
  log = updatesDir.clone();
  log.append("0");
  log.append(FILE_UPDATE_LOG);
  logTestInfo("testing " + log.path + " shouldn't exist");
  do_check_false(log.exists());

  if (!IS_WIN) {
    log = updatesDir.clone();
    log.append(FILE_LAST_LOG);
    logTestInfo("testing " + log.path + " should exist");
    do_check_true(log.exists());
  }

  log = updatesDir.clone();
  log.append(FILE_BACKUP_LOG);
  logTestInfo("testing " + log.path + " shouldn't exist");
  do_check_false(log.exists());

  updatesDir.append("0");
  logTestInfo("testing " + updatesDir.path + " shouldn't exist");
  do_check_false(updatesDir.exists());

  // Now, switch the updated version of the app
  do_timeout(CHECK_TIMEOUT_MILLI, switchApp);
}