function() {
		// Use self to reduce confusion about 'this'
		var self 	 = this;

		// internal vars
		var canvas  	= new Canvas2D('canvas2d');
		var preview 	= new Preview3D('preview3d');
		var running 	= true;
		var previewing 	= true;

		var vars		= []; // this will contain the choices we have made in the side bar
		var $container 	= $('#container');

		var width		= $container.width(),
			height		= $container.height();

		var $gui		= $('#palette');

		// predefined shape to be previewed by the Botprint app
		var geometry = new THREE.CubeGeometry( 100, 100, 100 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
		var mesh 	 = new THREE.Mesh( geometry, material );



		/**
		 * Pauses the 3D preview animation
		 */
		self.pause = function() {
			running = false;
		};

		/**
		 * Plays the 3D preview animation
		 */
		self.play = function() {
			// init whatever we need, man!
			self.init();
			if(!running) {
				running = true;
				preview.animate();
			} else {
				preview.animate();
			}

			setInterval(function(){
				//  Previews the 3d shape as long as it is indicated.
				// 	This interval will give the browser chance to
				//  extrude the shape object
				if(previewing){
					self.preview();
				}
			}, 100);
		};

		/**
		 * Previews the sketch in 3D.
		 */
		self.preview = function(){
			var svgs = canvas.svgs;
			if(svgs.length > 0){
				var chassis = new Chassis(svgs, 50);
				chassis.rotation.x = Math.PI/2;
				preview.setObject(chassis);
			}else{
				preview.setObject(mesh);
			}
		};

		/**
		 * Initializes the Botprint experiment and kicks everything off. Yay!
		 */
		self.init = function() {
			// set up our initial vars
			vars["shape"]				= "Free";
			vars["color"]				= "#00FF00";
			vars["wheelsLocation"]		= false;
			vars["show3dPreview"]		= true;
			vars["sketching"]			= true;

			// create our stuff
			if(bootstrapCanvas2D()) {
				setupUIComponents();
				$gui.addClass('live');
			} else {
				$('html').removeClass('webgl').addClass('no-webgl');
			}
		};

		/**
		 * This function will be used to
		 * @return {Boolean}
		 */
		function bootstrapCanvas2D() {
			// add listeners
			addEventListeners();

			canvas.width  = width;
			canvas.height = height;
			return true;
		}

		function addEventListeners() {
			// window event
			$(window).resize(callbacks.windowResize);

			// GUI events
			$(".palette-set a").click(callbacks.guiClick);
			$(".palette-set a.default").trigger('click');
		}

		/**
		 * Creates the objects we need to make the UI nicer.
		 */
		function setupUIComponents() {
			// todo(Huascar) improve UI. low priority
		}

		function checkforChassisExistence(elems, varName, varVal) {
			if(elems.length == 0){
				if(varName == "wheelsLocation" && varVal == true){
					alert("You must sketch a chassis before providing wheels.");
					return false;
				}

				if(varName == "transform" && varVal == false){
					alert("You must sketch a shape before start editing.");
					return false;
				}
			}

			return true;
		}

		function updateCanvasHandler (){
			var opts = {
				stroke: "#F8F8F8 ",
				"stroke-opacity": 1,
				fill: vars["color"],
				"stroke-width": 2,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			};

			previewing = vars["show3dPreview"];
			
			var handler =  pickHandler({
				shape: vars["shape"], 
				wheels: vars["wheelsLocation"],
				sketching: vars["sketching"],
				shapeAttributes: opts,
				canvas: canvas});
			canvas.setHandler(handler);
		}
		
		function pickHandler(options){
			var constructor;
			if(options.sketching){
				if(options.wheels) {
					constructor = circleHandler;
				} else {
					switch(options.shape) {
						case "Free":
							constructor = freeShapeHandler;
							break;
						case "Square":
							constructor = rectangleHandler;
							break;
						case "Polygon":
							constructor = polygonHandler;
							break;
						case "Ellipse":
							constructor = ellipseHandler;
							break;
					}
				}
			} else {
				constructor = editHandler;
			}
			return constructor({shapeAttributes: options.shapeAttributes, canvas: options.canvas});
		}	


		/**
		 * Our internal callbacks object - a neat
		 * and tidy way to organise the various
		 * callbacks in operation.
		 */
		callbacks = {
			windowResize: function() {
				width			= $container.width();
				height			= $container.height();
			},

			guiClick:function() {
				var $this 	= $(this),
					varName	= $this.data("guivar");
				var varVal  = $this.data ("guival");


				checkforChassisExistence(canvas.svgs, varName, varVal);

				vars[varName] = varVal;

				$this.siblings().addClass('disabled');
				$this.removeClass('disabled');

				updateCanvasHandler();

				return false;
			}
		};
	}