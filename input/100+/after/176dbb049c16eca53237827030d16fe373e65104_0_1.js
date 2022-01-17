function (){
	var time = new Date().getTime();
	if(this.objects !== undefined){
		for(var i in this.objects){
			if(this.objects[i].animated === true ){
				var faze = (time-this.objects[i].creationTime) % this.objects[i].animLength;
				var frame = Math.floor(faze/this.objects[i].interpolation);
				if(frame != this.objects[i].keyframe){
					this.scene.__objects[this.objects[i].getPoradi()].morphTargetInfluences[this.objects[i].keyframe] = 0;
					this.scene.__objects[this.objects[i].getPoradi()].morphTargetInfluences[frame] = 1;
					this.objects[i].keyframe = frame;
				}
			}
		};
		}
	}