function(done) {
		var args = require('../lib/args').getParams(process.argv.slice(2));
		args.projectFolder.should.equal('');
		args.specFolders.should.eql([]);
		args.specFiles.should.eql([]);
		args.params.should.eql([]);
		args.isCoverageReport.should.not.be.true;
		done();
	}