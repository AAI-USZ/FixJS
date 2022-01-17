function GLWorld( canvas, use3D, preserveDrawingBuffer ) {
    ///////////////////////////////////////////////////////////////////////
    // Instance variables
    ///////////////////////////////////////////////////////////////////////

    // flag to do the drawing with WebGL
    this._useWebGL = false;
    if(use3D) {
        this._useWebGL = use3D;
    }

    this._canvas = canvas;
    if (this._useWebGL)
    {
        if(preserveDrawingBuffer)
        {
            this._glContext = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
        }
        else
        {
            this._glContext = canvas.getContext("experimental-webgl");
        }
    }
    else
    {
        this._2DContext = canvas.getContext( "2d" );
    }

    this._viewportWidth = canvas.width;
    this._viewportHeight = canvas.height;

    // view parameters
    this._fov = 45.0;
    this._zNear = 0.1;
    this._zFar = 100.0;
    this._viewDist = 5.0;

    // default light parameters
    this._ambientLightColor  = [0.1, 0.1, 0.1,  1.0];
    this._diffuseLightColor  = [0.1, 0.1, 0.1,  1.0];
    this._specularLightColor = [0.6, 0.6, 0.6,  1.0];
    this._pointLightLoc = [0.0, 0.0, 0.05];

    // default material properties.  Material properties should be overridden
    // by the materials used by the objects
    this._materialShininess = 20.0;

    this._geomRoot = undefined;

    this._cameraMat = Matrix.I(4);
    this._cameraMat[14] = 5.0;
    this._cameraMatInv = Matrix.I(4);
    this._cameraMatInv[14] = -5.0;

    this._camera = null;
    // keep a flag indicating whether a render has been completed.
    // this allows us to turn off automatic updating if there are
    // no animated materials
    this._firstRender = true;

    this._worldCount = worldCounter;
    worldCounter++;

    // keep a counter for generating node names
    this._nodeCounter = 0;

    // for sending notifications to listeners
    this._notifier = new Notifier();

    ///////////////////////////////////////////////////////////////////////
    // Property accessors
    ///////////////////////////////////////////////////////////////////////
    this.getGLContext       = function()        {  return this._glContext;          };
    this.setGLContext       = function(gl)      {  this._glContext = gl;            };

    this.get2DContext       = function()        {  return this._2DContext;          };
    this.set2DContext       = function(c)       {  this._2DContext = c;             };

    this.getCanvas          = function()        {  return this._canvas;             };
    this.setCanvas          = function(c)       {  this._canvas = c;                };

    this.getShaderProgram   = function()        {  return this._shaderProgram;      };

    this.getViewportWidth   = function()        {  return this._viewportWidth;      };
    this.getViewportHeight  = function()        {  return this._viewportHeight;     };

    this.getAspect          = function()        {  return this._viewportWidth/this._viewportHeight;  };

    this.getGeomRoot            = function()        {  return this._geomRoot;           };
    this.getZNear               = function()        {  return this._zNear;              };
    this.getZFar                = function()        {  return this._zFar;               };
    this.getFOV                 = function()        {  return this._fov;                };

    this.getCamera              = function()        {  return this._camera;             };

    this.getCameraMat           = function()        {  return this._cameraMat.slice(0); };
    this.setCameraMat           = function(c)       {  this._cameraMat = c.slice(0);  this._cameraMatInv = glmat4.inverse(c, []);  };

    this.getCameraMatInverse  = function()      {  return this._cameraMatInv.slice(0); };

    this.getViewDistance        = function()        {  return this._viewDist;           };

    this.getRootNode            = function()        {  return this._rootNode;           };
    this.setRootNode            = function(r)       {  this._rootNode = r;              };

    this.isWebGL                = function()        {  return this._useWebGL;           };

    this.getRenderer            = function()        {  return this.renderer;            };

    // Flag to play/pause animation at authortime
    this._previewAnimation = true;

  ////////////////////////////////////////////////////////////////////////////////////
  // RDGE
  // local variables
    this.myScene = null;
    this.elapsed = 0;
    this.light = null;
    this.light2 = null;
    this.fillShader = null;
    this.strokeShader = null;
    this.renderer = null;

    // keep an array of texture maps that need to be loaded
    this._texMapsToLoad = [];
    this._allMapsLoaded = true;

    // this is the node to which objects get hung
    this._rootNode = null;

    // set up the camera matrix
    var camMat = Matrix.I(4);
    camMat[14] = this.getViewDistance();
    this.setCameraMat( camMat );

    // post-load processing of the scene
    this.init = function()
    {
        var ctx1 = RDGE.globals.engine.ctxMan.handleToObject(this._canvas.rdgeCtxHandle),
            ctx2 = RDGE.globals.engine.getContext();
        if (ctx1 != ctx2)  console.log( "***** different contexts *****" );
        this.renderer = ctx1.renderer;
        this.renderer._world = this;

        // create a camera, set its perspective, and then point it at the origin
        var cam = new RDGE.camera();
        this._camera = cam;
        cam.setPerspective(this.getFOV(), this.getAspect(), this.getZNear(), this.getZFar());
        cam.setLookAt([0, 0, this.getViewDistance()], [0, 0, 0], RDGE.vec3.up());

        // make this camera the active camera
        this.renderer.cameraManager().setActiveCamera(cam);

        // change clear color
        //this.renderer.setClearFlags(RDGE.globals.engine.getContext().DEPTH_BUFFER_BIT);
        this.renderer.setClearColor([0.0, 0.0, 0.0, 0.0]);
        //this.renderer.NinjaWorld = this;

        // create an empty scene graph
        this.myScene = new RDGE.SceneGraph();

        // create some lights
        // light 1
//      this.light = RDGE.createLightNode("myLight");
//      this.light.setPosition([0,0,1.2]);
//      this.light.setDiffuseColor([0.75,0.9,1.0,1.0]);

        // light 2
//      this.light2 = RDGE.createLightNode("myLight2");
//      this.light2.setPosition([-0.5,0,1.2]);
//      this.light2.setDiffuseColor([1.0,0.9,0.75,1.0]);

        // create a light transform
        var lightTr = RDGE.createTransformNode("lightTr");

        // create and attach a material - materials hold the light data
        lightTr.attachMaterial(RDGE.createMaterialNode("lights"));

        // enable light channels 1, 2 - channel 0 is used by the default shader
//      lightTr.materialNode.enableLightChannel(1, this.light);
//      lightTr.materialNode.enableLightChannel(2, this.light2);

        // all added objects are parented to the light node
        this._rootNode = lightTr;

        // add the light node to the scene
        this.myScene.addNode(lightTr);

        // Add the scene to the engine - necessary if you want the engine to draw for you
        //RDGE.globals.engine.AddScene("myScene" + this._canvas.id, this.myScene);
        var name = this._canvas.getAttribute( "data-RDGE-id" );
        RDGE.globals.engine.AddScene("myScene" + name, this.myScene);
    };

    // main code for handling user interaction and updating the scene
    this.update = function(dt)
    {
        if (!dt)  dt = 0.2;

        dt = 0.01;  // use our own internal throttle
        this.elapsed += dt;

        if (this._useWebGL)
        {
            // changed the global position uniform of light 0, another way to change behavior of a light
            RDGE.rdgeGlobalParameters.u_light0Pos.set([5 * Math.cos(this.elapsed), 5 * Math.sin(this.elapsed), 20]);

            // orbit the light nodes around the boxes
//          this.light.setPosition([1.2*Math.cos(this.elapsed*2.0), 1.2*Math.sin(this.elapsed*2.0), 1.2*Math.cos(this.elapsed*2.0)]);
//          this.light2.setPosition([-1.2*Math.cos(this.elapsed*2.0), 1.2*Math.sin(this.elapsed*2.0), -1.2*Math.cos(this.elapsed)]);
        }

        this.updateMaterials( this.getGeomRoot(), this.elapsed );

        // now update all the nodes in the scene
        if (this._useWebGL)
            this.myScene.update(dt);
    };

    // defining the draw function to control how the scene is rendered
    this.draw = function()
    {
        if (this._useWebGL)
        {
            RDGE.globals.engine.setContext( this._canvas.rdgeid );
            var ctx = RDGE.globals.engine.getContext();
            var renderer = ctx.renderer;
            if (renderer.unloadedTextureCount <= 0)
            {
                renderer.disableCulling();
                renderer._clear();
                this.myScene.render();

                if (this._firstRender)
                {
                    this._notifier.sendNotification( this._notifier.FIRST_RENDER );
                    if (this._canvas.task)
                    {
                        this._firstRender = false;

                        if (!this.hasAnimatedMaterials() || !this._previewAnimation)
                        {
                            this._canvas.task.stop();
                            //this._renderCount = 10;
                        }
                    }
                }
                else if (this._renderCount >= 0)
                {
                    if (this._canvas.task)
                    {
                        this._renderCount--;
                        if (this._renderCount <= 0)
                        {
                            this._canvas.task.stop();
                        }
                    }
                }
            }
        }
        else
        {
            this.render();
        }
    };

    this.onRunState = function() {
//      console.log( "GLWorld.onRunState" );
        this.restartRenderLoop();
    };

    this.onLoadState = function() {
//      console.log( "GLWorld.onLoadState" );
    };

    this.textureToLoad = function( texture )
    {
        if (!texture.previouslyReferenced)
        {
            var name = texture.lookUpName;
            texture._world = this;
            texture.callback = this.textureMapLoaded;
            this._texMapsToLoad[name] = true;
            this._allMapsLoaded = false;

            // stop the draw loop until all textures have been loaded
            this._canvas.task.stop();
        }
    };

    this.textureMapLoaded = function( texture )
    {
        var world = texture._world;
        if (!world) {
            console.log( "**** loaded texture does not have world defined ****" );
            return;
        }

        var name = texture.lookUpName;
        if (!world._texMapsToLoad[name]) {
            console.log( "loaded an unregistered texture map: " + name );
        }
        else {
            //console.log( "loaded a registered texture map: " + name );
            world._texMapsToLoad[name] = undefined;
        }

        // check if all the texture maps are loaded.  if so, resume the render loop
        world._allMapsLoaded = world.allTextureMapsLoaded();
        if (world._allMapsLoaded) {
            world._canvas.task.start();
        }
    };

    this.allTextureMapsLoaded = function() {
        for (var name in this._texMapsToLoad) {
            var needsLoad = this._texMapsToLoad[name];
            if (needsLoad)  return false;
        }

        return true;
    };

    this.textureLoadedCallback = function( name ) {
//      console.log( "*** material texture loaded: " + name );

        var world = this._world;
        if (!world) {
            console.log( "**** world not defined for loaded texture map: " + name );
        }
        else {
            world.textureMapLoaded( name );
        }
    };

    this.hasAnimatedMaterials = function() {
        var root = this.getGeomRoot();
        var rtnVal = false;
        if (root) {
            rtnVal = this.hHasAnimatedMaterials( root );
            this._hasAnimatedMaterials = rtnVal;
        }
        else
        {
            // currently...
            // we set this case to true - cloud materials create a
            // world with no objects but cloud materials animate.
            // TODO - find a better way to do this
            rtnVal = true;
            this._hasAnimatedMaterials = true;
        }

        return rtnVal;
    };

    this.hHasAnimatedMaterials = function( obj ) {
        if (obj) {
            if (obj.getFillMaterial()) {
                if (obj.getFillMaterial().isAnimated())  return true;
            }

            if (obj.getStrokeMaterial()) {
                if (obj.getStrokeMaterial().isAnimated())  return true;
            }


            // do the sibling
            var hasAnim = false;
            if  (obj.getNext())  hasAnim = this.hHasAnimatedMaterials( obj.getNext() );
            if (hasAnim)  return true;
            if  (obj.getChild())  hasAnim = this.hHasAnimatedMaterials( obj.getChild() );
            if (hasAnim)  return true;
        }

        return false;
    };

    this.generateUniqueNodeID = function() {
        var str = "" + this._nodeCounter;
        this._nodeCounter++;
        return str;
    };

    this.addListener = function( obj,  callbackFunc,  calleeData )
    {
        this._notifier.addListener( obj, callbackFunc, calleeData );
    }

    this.removeListener = function( obj )
    {
        this._notifier.removeListener( obj );
    }

    // start RDGE passing your runtime object, and false to indicate we don't need a an initialization state
    // in the case of a procedurally built scene an init state is not needed for loading data
    this._canvas.rdgeid = this._canvas.getAttribute( "data-RDGE-id" );
    if (this._useWebGL) {
        rdgeStarted = true;
        RDGE.globals.engine.unregisterCanvas( this._canvas );
        RDGE.globals.engine.registerCanvas(this._canvas, this);
        RDGE.RDGEStart( this._canvas );
        this._canvas.task.stop()
    }
}