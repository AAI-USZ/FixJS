function Param(){

  //jellyfish
  this.jCount = 5;
  this.jScale = 4;
  this.jScaleRandom = 0;
  this.jTurb = 0.04;
  this.jSpeed = 0.02;

  //particle
  this.pBbox = [80,80,80];
  this.pFlow = [0,-0.01,0];
  this.pTurbAmp = 0.03;
  this.pTurbFreq = 1;

  //lighting
  this.lightPos = [1,1,0];
  this.lightCol = [1,0.5,0.2,1];
  this.ambientCol = [0.3,0.2,0.1,1];
  this.lightTime = 0;
  this.lightBlend = [1,-1,0];
  this.fresnelCol = [0.9,0.4,0.3,1];
  this.fresnelPower = 2;

  this.shaderDebug = 0;

  this.uAlpha = 1;
}