function unproject(winx, winy, winz) {
    // winz is either 0 (near plane), 1 (far plane) or somewhere in between.
    // if it's not given a value we'll produce coords for both.
    if (typeof(winz) == "number") {
	
        var inf = [];
        var pm = viewMatrix, mm = projMatrix;
        var viewport = [0, 0, 300, 300];
        //Calculation for inverting a matrix, compute projection x modelview; then compute the inverse
        var m = mat4.set(mm, mat4.create());

        //mat4.inverse(m, m); // WHY do I have to do this? --see Jax.Context#reloadMatrices
        mat4.multiply(m, pm, m);
        mat4.inverse(m, m);
        // Transformation of normalized coordinates between -1 and 1
        inf[0]=(winx-viewport[0])/viewport[2]*2.0-1.0;
        inf[1]=(winy-viewport[1])/viewport[3]*2.0-1.0;
        inf[2]=2.0*winz-1.0;
        inf[3]=1.0;
	
        //Objects coordinates
        var out = vec4.create();
        mat4.multiplyVec4(m, inf, out);
        if(out[3]==0.0)
            return null;
	
        out[3]=1.0/out[3];//vec3.normalize(
        return [out[0]*out[3], out[1]*out[3], out[2]*out[3]];//);
    }
    else{
	var a = unproject(winx, winy, 0);
	var b = unproject(winx, winy, 1);
        return vec3.normalize(vec3.subtract(b, a));
    }
}