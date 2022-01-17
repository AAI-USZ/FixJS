function(params) {
        this.domRoot = params.domRoot;
        this.currentScene = null;
        this.models = {};
        this.views = {};
        
        // create canvas (WebGL if possible)
        this.canvas = new Ori.Canvas({forceCanvas: 0, clearAlpha: 0, antialias: 1});
        
       
        this.splashStatus = $("#splash-status");

        // add Canvas DOM Element & or error box
        this.splashStatus.empty();
        if(this.canvas) {
          this.domRoot.append(this.canvas.domElement);
        } else {
          this.splashStatus.append(APP_STRINGS.EN.NO_HTML5);
          return;
        }


        
        this.splashStatus.empty();
        this.splashStatus.append("setup cameras...");
        this.setupCameras();
        
        this.splashStatus.empty();
        this.splashStatus.append("register input...");        
        this.setupInput();

        // setupPicking  for collision
        this.projector = new THREE.Projector();
        
        this.splashStatus.empty();
        this.splashStatus.append("setup UI...");
        this.setupUI();

        // load default model
        this.setPreset(planetPresets["Aristotle"]["Tutorial"]); //"Aristotle");
        
        this.resize();
        
        // NO WEBGL error
        if(this.canvas.type==="canvas") {
//          this.debugBox.show();
          this.splashStatus.empty();
          this.splashStatus.append(APP_STRINGS.EN.NO_WEBGL);
          this.splashStatus.append("<br><div class='button' onclick='$(\"#splash\").addClass(\"hide\");' value='ok'>CONITUNE</div>");
        } else                       
        $("#splash").hide(); //addClass("hide");        
        
}