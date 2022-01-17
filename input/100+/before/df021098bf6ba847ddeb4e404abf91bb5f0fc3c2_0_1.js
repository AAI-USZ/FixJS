function voxelUnderMouse(){
    //var eye = camPos.map(function(x){return x;})
    var eye = vec3.add(camPos,[0.5,0.5,0.5]);
    var at = camPos.map(Math.floor);
    var sideInto = [0,0,0];
    var lastSideInto = [0,0,0];
    var step = camRay.map(function(x){return x>=0?1:-1});
    var target = camRay.map(function(x){return x>=0?1:0});
    var iter=0;
    console.log(eye + ":" + at);
    do{
        if (at[2]<=0){
            //lastUnderMouse = blockmatrix.g(at.asInt());
            return at;
        }
        var tx = (1.*at[0]+target[0]-eye[0])/camRay[0];
        var ty = (1.*at[1]+target[1]-eye[1])/camRay[1];
        var tz = (1.*at[2]+target[2]-eye[2])/camRay[2];
        var t = 1.0;
        if (tx<ty && tx<tz){
            t=tx;
            at[0]+=step[0];
            //if (sideInto!=null){sideInto.set(stepX,0,0);}
        }else if (ty<=tx && ty<=tz){
            t=ty;
            at[1]+=step[1];
            //if (sideInto!=null){sideInto.set(0,stepY,0);}
        }else{
            t=tz;
            at[2]+=step[2];
            //if (sideInto!=null){sideInto.set(0,0,stepZ);}
        }
	console.log(at+":"+t);
        eye = vec3.add(eye,vec3.scale(camRay,t,vec3.create()),vec3.create());
	console.log(eye);
    }while(iter++<256);
    //sideInto.set(lastSideInto);
    return [undefined,0,0];//lastUnderMouse.pos;
}