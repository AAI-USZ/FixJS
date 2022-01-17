function(obj)
		{
			var viewer = this;
			var count = obj.length;
			for(var i = 0; i < count; i++)
			{
				this.c_length = Math.max(obj[i].length);
				var id = obj[i].frame + '_' + obj[i].strand;
				
				if(!viewer.tracks[id])viewer.tracks[id] = new BRAGV.Track(id);
				viewer.tracks[id].isReverse = obj[i].strand < 0;
				viewer.tracks[id].features = obj[i].features;
				viewer.trackIndex[i] = id;
			}
			this.draw();
		}