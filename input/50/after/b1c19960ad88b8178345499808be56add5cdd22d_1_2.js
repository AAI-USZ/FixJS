function(){
			var pathToTest = "../LICENSE";
			(function(){requiredir(pathToTest);}).should.throw("The path provided is not a directory. [" + _path.resolve(__dirname, pathToTest) + "]");
		}