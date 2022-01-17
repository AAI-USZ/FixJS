function(){

			var str = '[ *** copy *** ] [time:'+_myTime.get(originFile)+'ms ]'+originFile;

			_myLog(str.green);

			callback && callback();

		}