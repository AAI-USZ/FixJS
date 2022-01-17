function(target){
      V3.sub(target,this.pos,delta);

      V3.normalize(delta, deltaNorm);
      V3.scale(deltaNorm, this.spring, deltaNorm);
      V3.sub(delta, deltaNorm, delta);

      V3.scale(delta,this.stiffness,force);
      force[1] += this.gravity;
      V3.scale(force,1/this.mass,accel);
      V3.add(force,accel,this.veloc);
      V3.scale(this.veloc,this.damping,this.veloc);
      V3.add(this.pos,this.veloc,this.pos);

      this.pos[0] += Math.sin(this.pos[0]/Param.pTurbFreq+1)*Param.pTurbAmp*0.2;
      this.pos[1] += Math.sin(this.pos[1]/Param.pTurbFreq+2)*Param.pTurbAmp*0.2;
      this.pos[2] += Math.sin(this.pos[2]/Param.pTurbFreq+5)*Param.pTurbAmp*0.2;

    M4x4.makeLookAt(this.pos,target,localParam.camera.eye,this.lookat);
  }