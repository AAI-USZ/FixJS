function write(buf){
			console.log('*writing buf: ' + buf.length);
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