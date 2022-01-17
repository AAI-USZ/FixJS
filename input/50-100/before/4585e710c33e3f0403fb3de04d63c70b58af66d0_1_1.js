function sync() {
  // the database not existing yet just means its empty, don't log an error
  if (path.existsSync(dbPath)) {
    try {
      db = JSON.parse(fs.readFileSync(dbPath));

      // FIXME:
      // at this point db might be missing some important fields
      // we may want to fix this. In the meantime, delete your old json db
    } catch(e) {
      logger.error("Cannot read database from " + dbPath);
    }
  } else {
    logger.debug("Database doesn't exist (yet): " + dbPath);
  }
}