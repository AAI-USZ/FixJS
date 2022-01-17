function() {
            var ctx1 = RDGE.globals.engine.ctxMan.handleToObject(this._canvas.rdgeCtxHandle),
                ctx2 = RDGE.globals.engine.getContext();
            if (ctx1 != ctx2)  console.log( "***** different contexts *****" );
            this.renderer = ctx1.renderer;

            // create a camera, set its perspective, and then point it at the origin
            var cam = new RDGE.camera();
            this._camera = cam;
            cam.setPerspective(this.getFOV(), this.getAspect(), this.getZNear(), this.getZFar());
            cam.setLookAt([0, 0, this.getViewDistance()], [0, 0, 0], RDGE.vec3.up());

            // make this camera the active camera
            this.renderer.cameraManager().setActiveCamera(cam);

            // change clear color
            this.renderer.setClearColor([1.0, 1.0, 1.0, 0.0]);

            // create an empty scene graph
            this.myScene = new RDGE.SceneGraph();

            // load the scene graph data
            this.loadScene();

            // Add the scene to the engine - necessary if you want the engine to draw for you
            var name = "myScene" + this._canvas.getAttribute( "data-RDGE-id" );
            RDGE.globals.engine.AddScene(name, this.myScene);

            this._initialized = true;
        }