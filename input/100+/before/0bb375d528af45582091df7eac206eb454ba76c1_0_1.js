function (controller) {
  this.FPS = 24;
  this.FPS_INTERVAL = 1000 / this.FPS;
  this.FRAME_DATA_SAMPLE = 24;
  this.FRAME_DATA_REFRESH = 12;
  this.fpsTop = 0;
  this.fpsBottom = 1000;
  this.animations = [];
  this.defaultValues = [];
  this.progress = 0.0;
  this.controllers = [];
  this.maxProgress = 1;
  this.timer = undefined;
  this.allowWeakProgress = true;
  this.frameRate = this.FPS;
  this.stepSize = 0;

  if (controller === undefined) {
    if($.browser.iDevice){
      this.controllers.push(new ControllerApple(false));
    } else if ($.browser.mozilla) {
      this.controllers.push(new ControllerScroll(false));
    } else {
      this.controllers.push(new ControllerScroll(true));
    }
  } else if (controller !== 'none') {
    if (controller.length) {
      this.controllers = controller;
    } else if (typeof (controller) === 'object') {
      this.controllers.push(controller);
    } else {
      throw new Error('wrong controller data type: "' +
                      typeof (controller) +
                      '". Expected "object" or "array"');
    }
  }

  for (var i in this.controllers) {
    this.controllers[i].activate(this);
  }
  
  this.frameChart = [];
  for(var j = 1; j <= 600; j++) {
    this.frameChart[j] = (1000 / j);
  }
}