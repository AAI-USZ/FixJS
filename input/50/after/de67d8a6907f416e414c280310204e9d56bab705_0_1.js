function showHelp() {
	logger.error("Oops, you didn’t provide any test suite to execute!");
	logger.info("Usage: watai path/to/suite/description/folder [another/suite [yetAnother […]]]");
}