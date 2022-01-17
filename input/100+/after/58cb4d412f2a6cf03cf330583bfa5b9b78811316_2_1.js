function(done) {
			var specInfo = item.slice(1);
			var specFiles = specInfo.filter(function(item){ 
				return item.indexOf('.js') !== -1; 
			});

			var specFolders = specInfo.filter(function(item){ 
				return item.indexOf('.js') === -1;
			});

			process.argv.push(item[0]);
			process.argv = process.argv.concat(item.slice(1));
			process.argv.push('+');
			process.argv.push('-R');
			process.argv.push('html-cov');

			var args = require('../lib/args').getParams(process.argv.slice(2));
			args.projectFolder.should.equal(item[0]);
			args.specFiles.should.eql(specFiles);
			args.specFolders.should.eql(specFolders);
			args.params.should.eql(['-R', 'html-cov']);
			args.isCoverageReport.should.be.true;
			done();
		}