function load(dataDir, objectSchema, reader, olLatestVersionId, loadedCb){
	_.assertLength(arguments, 5);
	
	//var objEx = baleen.makeFromSchema(objectSchema,undefined,true);
	var ex = baleen.makeFromSchema(editSchema)//, objEx);
	
	var exReader = {}
	Object.keys(reader).forEach(function(key){
		var rf = reader[key];
		exReader[key] = function(e){
			++count;
			//console.log(olLatestVersionId + ' reading: ' + key)
			//console.log(rf)
			if(count >= olLatestVersionId){
				rf(e, count)
			}else{
				console.log('skipping: ' + count)
			}
		}
	})
	
	var deser = ex.binary.stream.makeReader(exReader);
	
	var dir = dataDir + '/minnow_data';
	_.assertString(dir);
	
	var fullName = dir+'/ap'

	var count = 0;//for compatibility with ol, we don't start from 0
	
	var manyDesered = 0;
	
	var beginningSegment = true;
	
	
	
	function readCb(buf){
		if(beginningSegment){
			count = bin.readLong(buf, 0);
			buf = buf.slice(8)
			beginningSegment = false;
		}
		deser(buf);
	}
	function segmentCb(wasDiscarded){
		//TODO
		beginningSegment = true;
	}

	var start = Date.now()
	
	sf.open(fullName, readCb, segmentCb, function(sfw){
	
		var end = Date.now()

		count +=  deser.manyRead;
		
		function writeCount(){
			var b = new Buffer(8)
			bin.writeLong(b, 0, count);
			sfw.write(b);
		}
		
		console.log('done loading ' + deser.manyRead + ' commands in ' + (end-start) + 'ms');

		//write the count for the initial segment
		if(count === 0){
			writeCount()
		}
				
		var handle = {}
		
		handle.close = function(cb){
			clearInterval(flushHandle)
			//w.flush()
			var cdl = _.latch(2, function(){
				//console.log('closed apf')
				cb()
			})
			w.flush()
			w.end(cdl)
			sfw.end()
			sfw.sync(function(){
				//console.log('apf segment file synced')
				cdl()
			})
		}
	
		_.each(editSchema, function(s){
			handle[s.name] = function(json){
				_.errout('why this?')
			}
		})
	
		var segmentSize = sfw.getCurrentSegmentSize()
	
		function write(buf){
			//console.log('*writing buf: ' + buf.length);
			sfw.write(buf)
			segmentSize += buf.length;
			if(segmentSize > MaxDesiredSegmentSize){
				segmentSize = 0;
				sfw.segment();
				writeCount();
				//w.reset();//tells the writer to make the stream readable from this point ('keyframes' it.)
				initWriter()
			}
		}

		var w;

		var flushHandle = setInterval(function(){
			w.flush();
		}, 1000);

		function initWriter(){
			w = deser.makeWriter(write, function(cb){
				if(cb) cb()
			});
			_.each(w, function(writer, name){
				handle[name] = function(json){
					//console.log('wrote object to apf')
					++count;
					writer(json);
					return count;
				}
			});
		}
		initWriter()
		
		handle.getCurrentEditId = function(){return count;}
	
		loadedCb(handle);
	})
}