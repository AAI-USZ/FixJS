function writeFinichetFile() {
	try {
			ff = fs.open(workingDirectory + finichetFile, 'a');
			ff.writeLine('Done');
			ff.close();
		} catch (e) {
			console.log(e);
		}
}