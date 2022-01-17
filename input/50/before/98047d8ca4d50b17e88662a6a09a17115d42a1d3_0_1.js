function createDb() {
	resetDb();

    writeJSONFile("db.json", stream.leaderboard);
}