function(){

	//是否显示程序运行过程

	var _isShowProcess = true,

	_errorNum = 0,

	//日志方法

	_myLog = function(){

		if(_isShowProcess && arguments.length > 0){

			console.log.apply(null,Array.prototype.splice.call(arguments,0));

		}

	},

	//同步创建父级目录

	_mkdirSync = function (toPath,callback){

		var arr = toPath.split('/');

		var mode = 0755;

		if(arr[0] == '.'){

			arr.shift();

		}

		if(arr[0] == '..'){

			arr.splice(0,2,arr[0]+'/'+arr[1]);

		}

		function inner(p){

			//处理windows的磁盘目录

			if(p.indexOf(':') == p.length-1){

				inner(p+'/'+arr.shift());

				return;

			}else if(!path.existsSync(p)){

				console.log(('[ mkdir ] '+p).blue);

				fs.mkdirSync(p,mode);

			}

			if(arr.length){

				inner(p+'/'+arr.shift());

			}else{

				callback && callback();

			}

		}

		if(arr.length){

			inner(arr.shift());

		}else{

			callback && callback();

		}

	},

	//格式化路径

	_formatPath = function(path){

		return path?path.replace(/\\|\/\//g,'/'):path;

	},

	//时间对象

	_myTime = {

		timeList : {

			length : 0

		},

		/**设置开始时间*/

		set : function(name){

			this.timeList[name] = new Date();

		},

		/**得到运行时间*/

		get : function(name){

			var oldDate = this.timeList[name];

			if(!oldDate){

				_myLog('[time not fond]',name);

				return 0;

			}

			delete this.timeList[name];

			return new Date().getTime() - oldDate.getTime();

		},

		/**得到整个压缩过程的总时间*/

		getTotalTime : function(){

			var _this = this;

			_this.timeList.length--;

			

			clearTimeout(_this.tt);

			_this.tt = setTimeout(function(){

				if(!_this.timeList.length){

					var str = '[*** over ***] [totalTime:'+_this.get('totalTime')+'ms]';

					_myLog('\n\r',str.magenta);

					if(_errorNum>0){

						_myLog('\n\r\t\t[ *** error *** ] you have '+_errorNum+' error!'.red);

					}

				}

			},3);

		}

	},

	/**复制单个文件*/

	_copyFile = function (originFile,finalFile,callback){

		var fileReadStream = fs.createReadStream(originFile);

		var fileWriteStream = fs.createWriteStream(finalFile);

		fileReadStream.pipe(fileWriteStream);



		fileWriteStream.on('close',function(){

			var str = '[ *** copy *** ] [time:'+_myTime.get(originFile)+'ms ]'+originFile;

			_myLog(str.green);

			callback && callback();

		});

	},

	/**压缩单个文件*/

	_compressFile = function (fileIn,fileOut,callback){

		fileIn = _formatPath(fileIn);

		_myTime.set(fileIn);

		fileOut = _formatPath(fileOut || fileIn.replace(jsSourcePath,jsMiniPath));



		path.exists(fileOut,function(exists){

			//当目标文件不存在或源文件有修改时进行压缩处理

			//(***目标文件不能人为修改**)

			_mkdirSync(path.dirname(fileOut),function(){

				if(!exists || fs.lstatSync(fileIn).mtime > fs.lstatSync(fileOut).mtime){

					//后缀为.js的且不是.min.js的进行压缩，否则直接进行复制(可能为非文本文件)

					if(path.extname(fileIn) == '.js' && fileIn.lastIndexOf('.min.js') != fileIn.length-7){

						var originCode = fs.readFileSync(fileIn,'utf8');

						try{

							var ast = jsp.parse(originCode);

							ast = pro.ast_lift_variables(ast);

							//过滤参数

							ast = pro.ast_mangle(ast,{

								'except' : ['require']//不希望被替换的参数

							});

							ast = pro.ast_squeeze(ast);

							

							var finalCode = pro.gen_code(ast);

							fs.writeFileSync(fileOut,finalCode,'utf8');

							var str = '[ *** create *** ] [time:'+_myTime.get(fileIn)+'ms ]'+fileIn;

							_myLog(str.red);

						}catch(e){

							_errorNum++;

							var str = '[ *** error *** ] [message:"'+e.message+'",line:'+e.line+',col:'+e.col+'] '+fileIn;

							_myLog(str.red);

						}

						callback && callback();

					}else{

						_copyFile(fileIn,fileOut,callback);

					}					

				}else{

					_myLog('[ not modify ] [time:',_myTime.get(fileIn),'ms ]',fileIn);

					callback && callback();

				}

			});

		});

	},

	/**遍历整个文件夹，不存在时创建*/

	_compressPath = function (oldDir,newDir){

		_myTime.set('totalTime');

		_bDir(oldDir,newDir);

		function _bDir(originDir,finalDir){

			var files = fs.readdirSync(originDir);

			_mkdirSync(finalDir,function(){

				files.forEach(function(file){

					var pathname = originDir + '/' + file,

						toPath = finalDir + '/' + file;

						stat = fs.lstatSync(pathname);

					

					if(stat.isDirectory()){

						var str = '[ * sub dir ]'+pathname;

						_myLog(str.yellow);

						_bDir(pathname,toPath);

					}else{

						_myTime.timeList.length ++;

						_compressFile(pathname,toPath,function(){

							_myTime.getTotalTime();//得到总运行时间

						});

					}

				});

			});

		}

	}

	return {

		//压缩单个文件

		compressFile : _compressFile,

		//压缩整个目录

		compressPath : _compressPath

	};

}