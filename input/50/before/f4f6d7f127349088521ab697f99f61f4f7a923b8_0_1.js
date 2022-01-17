function require(file) {
	return sys.eval(sys.getFileContent(file));
}