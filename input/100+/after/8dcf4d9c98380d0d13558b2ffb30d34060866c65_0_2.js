function(database) {
    this.db = database;
    this.db.ensureIndex('comments', { keywords : 1});
}