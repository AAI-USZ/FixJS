function(x,y,z){this.mode=GLGE.P_EULER;this.rotX=parseFloat(x);this.rotY=parseFloat(y);this.rotZ=parseFloat(z);this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}