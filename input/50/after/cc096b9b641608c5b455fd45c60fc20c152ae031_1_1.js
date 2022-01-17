function(){
			var pathToTest = "./doesnotexist";
			(function(){requiredir(pathToTest);}).should.throw("The directory path does not exist. [" + _path.resolve(pathToTest) + "]");
		}