function drawFrame(){
    if (drawFrame.timeSum === undefined){
	drawFrame.timeSum = 0;
	drawFrame.timeLast = new Date().getTime();
	drawFrame.nFrames = 0;
    }
    var start = new Date().getTime();

    camPos = [camAngles[0]*Math.sin(camAngles[1])*Math.cos(camAngles[2]),
	      camAngles[0]*Math.sin(camAngles[1])*Math.sin(camAngles[2]),
	      camAngles[0]*Math.cos(camAngles[1])]

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(45, canvas.width/canvas.height, 1, 1000.0, projMatrix);
    mat4.identity(viewMatrix);

    viewMatrix = mat4.lookAt(camPos,[0,0,0], [0,0,1])
    //camRay = vec3.unproject(mouseWinPos,mat4.inverse(viewMatrix,mat4.create()),projMatrix,[0,0,300,300],vec3.create());
    camRay = unproject(mouseWinPos[0],
		       300-mouseWinPos[1]);
    mat4.translate(viewMatrix, [0,0,1], viewMatrix);
    chunk.draw();
    //mat4.translate(viewMatrix, [0,0,-], viewMatrix);
    var t = -camPos[2]/camRay[2];
    var trans = vec3.add(camPos,vec3.scale(camRay,t,vec3.create()),
			 vec3.create());
    trans = voxelUnderMouse();
    console.log(trans);
    mat4.translate(viewMatrix, trans, viewMatrix);
    //mat4.translate(viewMatrix, [0,0,-5], viewMatrix);
    temp_voxel_sprite.draw();
    mat4.translate(viewMatrix, vec3.scale(trans,-1), viewMatrix);

    drawFrame.timeSum += new Date().getTime() - start;
    drawFrame.nFrames += 1;
    if (drawFrame.timeLast + 1000 < start){
	document.getElementById("log").innerHTML = drawFrame.timeSum +
	    "ms in " + drawFrame.nFrames + " frames";
	drawFrame.timeSum = 0;
	drawFrame.timeLast = start;
	drawFrame.nFrames = 0;
    }
}