function (global, doc) {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }

    global.WanderUte || (global.WanderUte = {});

    var WanderUte = global.WanderUte;
    
    /**
     * Die Hauptklasse, die für das initialisieren und den Ablauf der
    * render-Schleife zuständig ist.
     * @class
     *
     * @constructor Erstellt eine Instanz der Haupklasse, initialisiert alle
     * Properties und startet dann die Initialisierung aller benötigten Daten
     * um die Karte zu zeichnen, indem Main#init aufgerufen wird.
     */
    WanderUte.App = function () {
        this.container = null;

        this.camera = null;
        /** @property 
         * Die Haupszene, auf die die Karte gezeichnet wird.
         */
        this.scene = null;

        this.renderer = null;
        this.projector = null;
        this.controls = null;

        this.roadMesh = null;
        this.terrainMesh = null;
        this.line = null;

        this.shaderUniforms = null;

        this.itemsToLoad = 3;
        this.itemsLoaded = 0;

        /** @property 
         * Enthält die sekundäre Szene, in die das Pfad-Prisma
         * gezeichnet wird, das dann per Stenciltest auf die Karte projeziiert
         * wird.
         */
        this.trackProjection = {};
        /** @property
         * Scene, die den schwebenden Pfad und die Marker enthält.
         */
        this.trackScene = null;

        this.clock = new THREE.Clock();

    
        this.animate = this.animate.bind(this);
        this.animateStart = this.animateStart.bind(this);
        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onMeshLoaded = this.onMeshLoaded.bind(this);
        this.onTrackMashLoaded = this.onTrackMashLoaded.bind(this);
        this.onTrackJSONLoaded = this.onTrackJSONLoaded.bind(this);
        this.onCreateSign = this.onCreateSign.bind(this);
        this.onShowMarker = this.onShowMarkerChange.bind(this);
        this.onShowProfileChange = this.onShowProfileChange.bind(this);
        this.displaySign = this.displaySign.bind(this);
        this.initSigns = this.initSigns.bind(this);
        this.onToggleFlyAlongPath = this.onToggleFlyAlongPath.bind(this);

        this.chkShowMarker = doc.querySelector("[name='show-marker']");
        this.chkShowProfile = doc.querySelector("[name='show-profile']");
        this.chkFlyAlongPath = doc.querySelector("[name='fly-along-path']");

        this.showMarker = true;

        this.profilePanel = new global.WanderUte.ProfilePanel("profile-panel");
        this.signWindow = new global.WanderUte.SignWindow("window-sign");

        this.init();
    };

    WanderUte.App.prototype = {
        /**
         * Initialisiert alles was nötig ist um die Karte zu zeichnen. 
         * @private
         */ 
        init : function () {
            var scene, projector, that = this;

            this.flying = false;
            this.origControls = null;

            this.container = doc.createElement('div');
            doc.body.appendChild(this.container);

            scene = this.scene = new THREE.Scene();
            //scene.add(new THREE.AxisHelper());

            this.initCamera(); 

            this.projector = projector = new THREE.Projector();

            this.initRenderer(); 

            this.onWindowResize();

            this.initTerrain();
            this.initTrackProjection();
            this.initEventListeners();

            $.get("includes/signs.json", this.initSigns);
        },

        /**
         * Initialisiert die Marker
         * @private
         * @param {Array} signs Ein Array von Markern.
         */ 
        initSigns : function (signs) {
            var that = this;
            if (this.trackScene !== null) {
                // create signs and append to track scene
                signs.forEach(this.displaySign);
            }
            else {
                // wait 500ms and check again if the track scene is available
                // now.
                global.setTimeout(function () {
                    that.initSigns(signs);
                }, 500);
            }
        },

        /**
         * Initialisiert die Camera
         * @private
         */ 
        initCamera : function () {
            //camera
            var camera = this.camera = new THREE.PerspectiveCamera(20, 
                                                                   this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 
                                                                   1, 
                                                                   2000);
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 500;
            this.scene.add(camera);
        },

        /**
         * Initialisiert die Steuerelemente.
         * @private
         * @param {Array} [keys=[65,83,68]] Die drei Tasten, mit denen
         * THREE.TrackballControls gesteuert werden können.
         */ 
        initControls : function (keys) {
            keys || (keys = [/*A*/ 65, /*S*/ 83, /*D*/ 68]);

            var controls = this.controls = new THREE.TrackballControls(this.camera, this.container);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;

            controls.noZoom = false;
            controls.noPan = false;

            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;

            controls.keys = keys;
        },

        /**
         * Initialisiert den Three.WebGLRenderer.
         * @private
         */
        initRenderer : function () {
            // RENDERER
            var renderer = this.renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(global.innerWidth, global.innerHeight);
            renderer.setClearColor({
                r : 0,
                g : 0,
                b : 0
            }, 1);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.autoClear = false;

            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = 0 + "px";
            renderer.domElement.style.left = "0px";

            this.container.appendChild(renderer.domElement);
        },

        /**
         * Initialisiert die event listener.
         * @private
         */ 
        initEventListeners : function () {
            //doc.addEventListener('mousemove', onDocumentMouseMove, false);
            global.addEventListener('resize', this.onWindowResize, false);
            this.container.addEventListener('mousedown', this.onDocumentMouseDown, true);
            this.chkShowProfile.addEventListener('change', this.onShowProfileChange, false);
            this.chkShowMarker.addEventListener('change', this.onShowTrackChange, false);
            this.chkFlyAlongPath.addEventListener('change', this.onToggleFlyAlongPath, false);
        },

        /**
         * Behandlt Änderungen der "Profil anzeigen" Checkbox.
         * @private 
         */ 
        onShowProfileChange : function (e) {
            this.profilePanel.toggle(e.target.checked);
        },

        /**
         * Behandlt Änderungen der "Marker anzeigen" Checkbox.
         * @private 
         */ 
        onShowMarkerChange : function () {
            this.showMarker = this.chkShowMarker.checked;
        },

        /**
         * Initialisiert das Kartenterrain, indem die Terraindaten mittels
         * THREE.CTMLoader geladen werden. Sobald der Ladevorgang abgeschlossen
         * ist, wird Main#onMeshLoaded aufgerufen.
         * @private 
         */ 
        initTerrain : function () {
            var loader,
                shaderUniforms;

            this.shaderUniforms = shaderUniforms = {
                normal: {
                    type: "t",
                    value: 0,
                    texture: THREE.ImageUtils.loadTexture("resources/normal.png")
                },
                time: {
                    type: "f",
                    value: 1.0
                }
            };

            loader = new THREE.CTMLoader(this.renderer.context);
            loader.load("resources/map1.ctm", this.onMeshLoaded, false, false);
        },


        /**
         * Initialisiert das Projektionsprisma des Pfades mittels
         * THREE.CTMLoader. Sobald der Pfad geladen ist, wird
         * Main#onTrackMashLoaded aufgerufen.
         * Zudem werden die Wegpunkte des Pfades als JSON geladen, und sobald
         * der Ladevorgang abgeschlossen ist, die Main#onTrackJSONLoaded
         * methode ausgeführt.
         * @private
         */
        initTrackProjection : function () {
            var loader,
                xhr, callback;

            
            loader = new THREE.CTMLoader(this.renderer.context);
            loader.load("resources/path.ctm", this.onTrackMashLoaded, false, true);

            xhr = new XMLHttpRequest();
            callback = this.onTrackJSONLoaded;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200 || xhr.status === 0) {
                        if (xhr.responseText) {
                            callback(JSON.parse(xhr.responseText).Position);
                        }
                    }
                }
            };

            xhr.open("GET", "resources/path.json", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(null);
        },

        /**
         * Hilfsfunktion um ein Element anhand dessen id-Attributs zu
         * ermitteln.
         * @private
         */
        $ : function (id) {
            return doc.getElementById(id);
        },

        /**
         * Callback der aufgerufen wird, sobald das Mesh der Karte fertig
         * geladen wurde.
         * Initialisiert ein Three.Mesh objekt mit dieser Geometrie und fügt
         * dieses der Haupszene hinzu.
         * @private 
         * @param {THREE.Geometry} geometry. Objekt, dass die Geoetrie der
         * Karte enthält.
         */ 
        onMeshLoaded : function (geometry) {
            var shaderMaterial = new THREE.ShaderMaterial({
                    uniforms : this.shaderUniforms,
                    vertexShader:   this.$('terrain.vert').textContent,
                    fragmentShader: this.$('terrain.frag').textContent
                });

            geometry.computeFaceNormals();

            this.terrainMesh = new THREE.Mesh(geometry, shaderMaterial);

            this.scene.add(this.terrainMesh);

            this.updateLoadCounter();
        },

        /**
         * Callback, der ausgeführt wird, sobald das Mesh des Pfades
         * vollständig geladen ist.
         * Bereitet dann das Trackprisma für die Projektion auf die Karte vor
         * und platziert es an der richtigen Stelle im Raum und fügt es der 
         * Trackprojektions-Szene hinzu.
         * @private
         * @param {THREE.Geometry} geometry. Objekt, dass die Geoetrie der
         * Strecke enthält.
         */
        onTrackMashLoaded : function (geometry) {
            var trackProjection = this.trackProjection,
                options = {
                    minFilter: THREE.LinearFilter,
                    stencilBuffer: false
                },
                roadTest,
                roadMesh;

            trackProjection.scene = new THREE.Scene();

            trackProjection.rtTextureDepth = new THREE.WebGLRenderTarget(this.SCREEN_WIDTH, this.SCREEN_HEIGHT, options);

            roadTest = new THREE.ShaderMaterial({
                vertexShader:   this.$('simple.vert').textContent,
                fragmentShader: this.$('test.frag').textContent
            });


            roadMesh = this.roadMesh = new THREE.Mesh(geometry, this.roadTest);
            roadMesh.position.set(-0.5, -0.5, 0.0);
            //roadMesh.rotation.x = -0.8;
            roadMesh.material.depthWrite = false;
            this.trackProjection.scene.add(this.roadMesh);

            this.updateLoadCounter();
        },

        /**
         * Callback, der aufgerufen wird, sobald die Wegpunkte der Strecke
         * vollständig geladen wurden.
         * Dannach werden zunächst #createPath und dann
         * ProfilePanel#calculateTrackProfile aufgerufen.
         * @private
         * @param {Array} geometry Array, der alle Wegpunkte in der Form [x, y, z] beinhaltet.
         */
        onTrackJSONLoaded : function (geometry) {
            this.createPath(geometry);

            this.profilePanel.calculateTrackProfile(geometry);

            this.updateLoadCounter();
        },

        /**
         * Updatet den Counter, der zählt, wie viele Asynchrone loader bereits mit dem Laden fertig sind.
         * Sobald alle Loader fertig sind, wird die Uhr und die Animation gestartet.
         * @private
         */
        updateLoadCounter : function () {
            this.itemsLoaded += 1;
            if (this.itemsLoaded === this.itemsToLoad) {
                //this.terrainMesh.rotation.x = -0.8;
                this.clock.start();
                this.camera.lookAt(this.scene.position);
                this.animateStart();
            }
        },

        /**
         * Behandelt MouseDown Events. 
         * @private
         * @param {MouseEvent} e MouseEvent. 
         */
        onDocumentMouseDown : function (e) {
            if (e.button === 2) {
                e.preventDefault();
                var intersects = this.mousePositionToPointOnMap(e.clientX, e.clientY);
                if (intersects.length > 0) {
                    this.showSignWindow(intersects[0].point); 
                }
                else {
                    console.log("No intersections found");
                }
            }
        },

        /**
         * Projeziert den Punkte (x, y) des Bildauschnitts in das
         * Weltkoordinatensystem der Karte und ermittlet den Schnittpunkt mit
         * der Karte.
         * @private
         * @param {Number} x Mausposition auf der x-Achse
         * @param {Number} y Mausposition auf der y-Achse
         * @return {Array} intersects Liste der Schnittpunkte.
         */
        mousePositionToPointOnMap : function (x, y) {
            var camera = this.camera,
                vector = new THREE.Vector3((x / this.SCREEN_WIDTH) * 2 - 1,
                    - (y / this.SCREEN_HEIGHT) * 2 + 1,
                    // Percentage of diff between near and far to go towards far
                    // starting at near to determine intersection.
                    // @see https://github.com/sinisterchipmunk/jax/blob/5d392c9d67cb9ae5623dc03846027c473f625925/src/jax/webgl/camera.js#L568
                    0.2),
                ray,
                intersects;

            this.projector.unprojectVector(vector, camera);

            ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());

            intersects = ray.intersectObject(this.terrainMesh);

            return intersects;
        },

        /**
         * Öffnet das Fenster zum Erstellen eines neuen Markers.
         * @param {Object} position Position des Markers
         * @param {Number} position.x X-Achsen Abschnitt der
         * Markerposition
         * @param {Number} position.y Y-Achsen Abschnitt der
         * Markerposition
         * @param {Number} position.z Z-Achsen Abschnitt der
         * Markerposition
         * @param {Object} [data] Zusätzliche Markerinformationen
         * @param {String} [data.name] Der Name des Markers
         * @param {String} [data.type] Der Typ des markers (Dateinahme der
         * Marker-dateien ohne Dateiendung)
         */
        showSignWindow : function (position, data) {
            data || (data = {name : "", type : ""});
            this.signWindow.show({
                name : data.name || "",
                type : data.type || null,
                position: position || {x : "", y : "", z : ""} 
            }, this.onCreateSign);
        },

        /**
         * Erstellt ein neues Zeichen und speichert es auf dem Server.
         * @private
         * @param {Object} data Datenobjekt, das die Informationen eines
         * Markers beinhaltet.
         * @param {Object} data.position Position des Markers
         * @param {Number} data.position.x X-Achsen Abschnitt der
         * Markerposition
         * @param {Number} data.position.y Y-Achsen Abschnitt der
         * Markerposition
         * @param {Number} data.position.z Z-Achsen Abschnitt der
         * Markerposition
         * @param {String} data.name Der Name des Markers
         * @param {String} data.type Der Typ des markers (Dateinahme der
         * Marker-dateien ohne Dateiendung)
         */
        onCreateSign : function (data) {
            $.ajax({
                type : "POST",
                url : "includes/jsonWriter.php",
                dataType : 'json',
                data : {
                    json : data,
                    p : "signs.json"
                }
            });
            this.displaySign(data);
        },



        /**
         * Läd den Marker per THREE.ColladaLoader und fügt ihn dann in
         * Main#trackScene ein.
         * @param {Object} data Datenobjekt, das die Informationen eines
         * Markers beinhaltet.
         * @param {Object} data.position Position des Markers
         * @param {Number} data.position.x X-Achsen Abschnitt der
         * Markerposition
         * @param {Number} data.position.y Y-Achsen Abschnitt der
         * Markerposition
         * @param {Number} data.position.z Z-Achsen Abschnitt der
         * Markerposition
         * @param {String} data.name Der Name des Markers
         * @param {String} data.type Der Typ des markers (Dateinahme der
         * Marker-dateien ohne Dateiendung)
         */
        displaySign : function (data) {
            var loader = new THREE.ColladaLoader(),
                material,
                trackScene = this.trackScene;

            loader.convertUpAxis = true;
            loader.load('resources/models/' + data.type + '.dae', function (collada) {
                //var hlMaterial = new THREE.MeshPhongMaterial({color: 0x750004});

                THREE.SceneUtils.traverseHierarchy(collada.scene, function (object) { 
                    object.scale.set(0.01, 0.01, 0.01);
                    object.position.set(data.position.x * 1, data.position.y * 1, data.position.z * 1 + 0.05);
                    /*if (object.material) {
                        object.material = new THREE.MeshBasicMaterial({ wireframe: true });
                    }*/
                    if ((material = object.material)) {
                        object.material = new THREE.MeshBasicMaterial({
                            color : 0xFFFFFF,
                            map: material.map, 
                            morphTargets: material.morphTargets
                        });
                    }
                });
                trackScene.add(collada.scene);
            });
        },

        /**
         * Behandelt window resize Events, indem die Cameraposition neu
         * berechnet.
         * @private
         * @param {Event} event Resize-Event
         */
        onWindowResize : function (event) {
            this.SCREEN_WIDTH = global.innerWidth;
            this.SCREEN_HEIGHT = global.innerHeight;

            this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

            this.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
            this.camera.updateProjectionMatrix();
        },

        /**
         * Animations-Schleife, die zu Beginn des Renderings aufgerufen wird und
         * für das Hineinfliegen in die Karte zuständig ist. Nachdem
         * Main#camera.position.z < 2 ist, wird im Folgenden Main#animate
         * aufgerufen.
         * @private
         */
        animateStart : function () {
            var delta = this.clock.getDelta();

            this.shaderUniforms.time.value += delta;

            this.render();

            if (this.camera.position.z === 2) {
                this.initControls();
                global.requestAnimationFrame(this.animate);
            }
            else {
                global.requestAnimationFrame(this.animateStart);
                this.camera.position.z -= 250 * delta;
                this.camera.position.z = this.camera.position.z < 2 ? 2 : this.camera.position.z;
            }
        },

        /**
         * Hauptanimations-Scheife. 
         * @private
         */
        animate : function () {
            var delta = this.clock.getDelta();

            THREE.AnimationHandler.update(delta);
            this.controls.update(delta);
            
            this.render();
            global.requestAnimationFrame(this.animate);
        },

        /**
         * Zeichnet die Karte und die Projektion darauf. 
         * Sofern Main#showMarker auf true gesetzt ist, wird auch der Track als
         * Linie, sowie die Marker gezeichnet.
         * @private
         */
        render : function () {
            var renderer = this.renderer,
                gl = renderer.getContext();

            renderer.clear(true, true, true);

            //Terrain rendern nd Depthbuffer füllen

            renderer.render(this.scene, this.camera);

            //Stencilbuffer füllen
            gl.enable(gl.STENCIL_TEST);
            gl.stencilFunc(gl.ALWAYS, 0, 0);
            gl.colorMask(false, false, false, false);
            this.roadMesh.material.depthTest = true;
            gl.stencilOp(gl.KEEP, gl.INCR, gl.KEEP);
            renderer.setFaceCulling("front");
            renderer.render(this.trackProjection.scene, this.camera);

            gl.stencilOp(gl.KEEP, gl.DECR, gl.KEEP);
            renderer.setFaceCulling("back");
            renderer.render(this.trackProjection.scene, this.camera);
            gl.colorMask(true, true, true, true);

            //weg rendern
            gl.stencilFunc(gl.NOTEQUAL, 0, 0xFF);
            renderer.setFaceCulling("front");
            this.roadMesh.material.depthTest = false;
            renderer.render(this.trackProjection.scene, this.camera);

            //GL state zurücksetzten
            gl.disable(gl.STENCIL_TEST);
            renderer.setFaceCulling("back");

            if (this.showMarker) {
                renderer.render(this.trackScene, this.camera);
            }
        },

        /**
         * Erstellt den Pfad aus einem Array von Wegpunkten.
         * @private
         * @param {Array} vertices Liste der Wegpunkte in der Form [x, y, z],
         * die den Pfad beschreiben.
         */
        createPath : function (vertices) {
            var path = new THREE.Geometry(), 
                waypoints = [],
                vert, i, len = vertices.length, track,
                options = {
                    minFilter: THREE.LinearFilter,
                    stencilBuffer: false
                },
                light;

            for (i = 0; i < len; i += 1) {
                vert = vertices[i];
                waypoints.push(vert);
                path.vertices.push(
                    new THREE.Vector3(vert[0] - parseInt(vert[0], 10), 
                        vert[1] - parseInt(vert[1], 10), 
                        vert[2]) 
                );
            }

            this.waypoints = waypoints;

            path.computeVertexNormals();

            track = new THREE.Line(path, new THREE.LineBasicMaterial({
                color : 0xff0000,
                linewidth: 5,
                linecap : 'round',
                linejoin : 'round',
                vertexColors : false,
                fog : false
            }), THREE.LineStrip);
            
            track.position.set(-0.5, -0.5, 0.005);
            //track.rotation.x = -0.8;
            this.trackScene = new THREE.Scene();

            this.trackScene.add(track);
        },



        /**
         * Sofern Main#flying true ist, man also über den Pfad fliegt,
         * wird Main#stopFlying aufgerufen, ansonsten Main#startFlying.
         * @private
         */
        onToggleFlyAlongPath : function (e) {
            if (!this.flying) {
                this.startFlying();
            }
            else {
                this.stopFlying();
            }
        },


        /**
         * Startet den Flug entlang des Pfads.
         */
        startFlying : function () {
            this.fying = true;


            this.origControls = this.controls;
            this.origCameraPosition = this.camera.position;

            var controls = new THREE.PathControls(this.camera);

            controls.waypoints = this.waypoints;
            controls.duration = 28;
            controls.useConstantSpeed = true;
            //controls.createDebugPath = true;
            //controls.createDebugDummy = true;
            controls.lookSpeed = 0.06;
            controls.lookVertical = false;
            controls.lookHorizontal = false;
            controls.verticalAngleMap = { srcRange: [ 0, 2 * Math.PI ], dstRange: [ -0.5, -0.5 ] };
            controls.horizontalAngleMap = { srcRange: [ 0, 2 * Math.PI ], dstRange: [ -0.5, -0.5 ] };
            controls.lon = 180;
            controls.lat = 0;

            this.controls = controls;
            this.controls.init();

            this.scene.add(controls.animationParent);

            controls.animation.play(true, 0);
        },

        /**
         * Stopt den Flug entlang des Pfads.
         */
        stopFlying : function () {
            this.flying = false;
            this.controls.animation.stop();
            this.camera.position = this.origCameraPosition;
            this.scene.remove(this.controls.animationParent);
            this.controls = this.origControls;
            this.controls.init();
        }
    };

    WanderUte.App.start = function () {
        var app = new WanderUte.App();
    };

}