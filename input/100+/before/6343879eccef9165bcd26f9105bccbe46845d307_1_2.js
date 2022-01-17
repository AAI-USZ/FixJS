function(params) {
        this.name = params.name;
        this.curves = {};
        this.sphere = new Array(params.spheres);

        this.systemSun = [];
        this.viewPoints = {"Free":0, "Earth":0, "Planet":0};
        this.viewPresets = {"World": {from: "Free",at:"Earth"}, "Earth": {from: "Earth",at:"Free"}};

        this.light = Sunlight();

        this.lookAt = params.renderer.lookAt;
        this.scene = params.renderer.scene;
        this.camera = params.renderer.camera;

        this.root = new SceneJS.node();
        this.camera.addNode(this.root);

        this.root.addNode(this.light);

        this.root.addNode(SceneJS.material({
            baseColor:  { r: 0.5, g: 0.5, b: 1.0 },
            specularColor:  { r: 0.0, g: 0.0, b: 0.0 },
            emit: 0.0, specular: 0.0, shine: 3.0},
                this.earthPlane = SceneJS.cube({xSize: 6.0,  ySize: 0.01, zSize: 6.0})
                )
                );

        this.earthPlane.setEnabled(false);

        this.root.addNode(this.earth = new Planet({betaRotate:180.0, dist: 0.0, scale: 0.4, emit:0.0, color: colors["Earth"], id: this.name+"Earth"}));

        this.root.addNode(this.curve = SceneJS.material({
            baseColor:      { r: 0.0, g: 0.0, b: 0.0 },
            specularColor:  { r: 0.0, g: 0.0, b: 0.0 },
            emit: 1.0, specular: 0.0, shine: 1.0
        }));

        this.root.addNode(this.sphere[0] = new Spherical({scale: 9, axisAngle: 0.0, speed: 0.0, color: colors["S0"]}));


        this.updateList = [];
        this.updateList[0] = this.sphere[0];
        for (var i = 1; i < this.sphere.length; i++) {
            tmp = this.sphere[i] = new Spherical({scale: 9, axisAngle: 0.0, speed: 0.0, color: colors["S" + i + ""]});
            this.sphere[i - 1].anchor.addNode(tmp);
            this.updateList[i] = tmp;

        }
        this.sphere[this.sphere.length - 1].anchor.addNode(this.planet = new Planet({ dist: 9.0, emit: 0.5, scale: 0.2, inner_id: params.name+"Planet",  color:colors["Planet"] }));

        for (i in this.sphere) {
            this["setSpeed" + i] = new Function("value", "this.sphere[" + i + "].setSpeed(value);");
            this["setAxisAngle" + i] = new Function("value", "this.sphere[" + i + "].setAxisAngle(value);");
            this["setRotateStart" + i] = new Function("value", "this.sphere[" + i + "].setRotateStart(value);");
            this["getSpeed" + i] = new Function("return this.sphere[" + i + "].getSpeed();");
            this["getAxisAngle" + i] = new Function("return this.sphere[" + i + "].getAxisAngle();");
            this["getRotateStart" + i] = new Function("return this.sphere[" + i + "].getRotateStart();");
            this["showSphere" + i] = new Function("state", "this.sphere[" + i + "].setVisuals([\"equator\",\"npole\",\"spole\",\"rotationarc\",\"markerarc\",\"arc1\",\"arc2\",\"markerball\"], state);");
        }

        this.sphere[1].addNode(this.stars = new SceneJS.cloud({count:400, scale:20.0}));


        this.sphere[0].curve.addNode(this.systemSun[0] = new Spherical({ scale: 9, axisAngle: 24.0, speed: 365.0, color: {r:0.2, g:0.2, b:1.0}},
                this.systemSun[1] = new Spherical({ scale: 9, axisAngle: 0.5, speed: 0.0 },
                        this.sun = new Planet({  betaRotate: 90.0, emit: 0.5, scale: 0.3, dist: 9.0, inner_id: params.name+"Sun", color:colors["Sun"] })
                        )
                )
                );

        this.root.setEnabled(false);

    }