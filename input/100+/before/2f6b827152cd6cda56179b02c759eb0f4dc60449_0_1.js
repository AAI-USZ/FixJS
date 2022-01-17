function(f, key){
			if(key === 'flush'){
				res[key] = f;
				return;
			}
			res[key] = function(e, manyAdded){
				_.assertInt(manyAdded)
				var localSegOff = segOff;
				f(e);
				_.assertInt(segmentCounts[localSegOff])
				segmentCounts[localSegOff] += manyAdded;
				fullSegmentCounts[localSegOff] += manyAdded;
				return localSegOff;
			}
		}