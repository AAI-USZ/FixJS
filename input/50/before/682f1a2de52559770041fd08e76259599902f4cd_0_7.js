function(buf){
				currentSegmentSize += buf.length;
				var to = totalOffset;
				totalOffset += buf.length;
				console.log('segmented file wrote to ws: ' + buf.length)
				ws.write(buf)
				return to;
			}