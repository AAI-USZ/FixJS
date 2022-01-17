function (){
	var time = new Date().getTime();
	if(this.objects !== undefined){
		for(var i in this.objects){
			if(this.objects[i].animated){
				var faze = (time-this.objects[i].creationTime) % this.objects[i].animLength;
				var frame = Math.floor(faze/this.objects[i].interpolation) + this.objects[i].borderFrames[0]-1;
				if(frame != this.objects[i].keyframe){
					this.objects[i].getEditMesh().morphTargetInfluences[this.objects[i].keyframe] = 0;
					this.objects[i].getEditMesh().morphTargetInfluences[frame] = 1;
					this.objects[i].keyframe = frame;
				}
			}
		};
		}
	}