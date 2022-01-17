function (originFile,finalFile,callback){

		var fileReadStream = fs.createReadStream(originFile);

		var fileWriteStream = fs.createWriteStream(finalFile);

		fileReadStream.pipe(fileWriteStream);



		fileWriteStream.on('close',function(){

			var str = '[ *** copy *** ] [time:'+_myTime.get(originFile)+'ms ]'+originFile;

			_myLog(str.green);

			callback && callback();

		});

	}