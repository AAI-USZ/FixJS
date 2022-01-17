function(declare, _Widget, _Templated, script, domConstruct, template, Core, AnimEn, DisplayObject, Vector2d, Sprite, AnimObject) {

	return declare("widgets.AnimWidget", [_Widget, _Templated], {
		templateString : template,
		stage : null,

		cursorX : -1,
		cursorY : -1,
		offsetX : 305,
		offsetY : 84,
        pointerRefX : 0,
        pointerRefY : 0,
        lastStageX : 0, // Last saved x pos of the selected object
        lastStageY : 0, // y pos
		objectRefX : 0,
		objectRefY : 0,
		mouseMoved : false,
		selectedObject : null,
		draggableObject : null,
		objectModifier : null,
		deselect: false,
		draggingRefPoint: false,
		resize: false,
		rotate: false,
		selectedRotationNode : null,
		
        engineDom: "engine",
		rotation: 0,

		/**
		 * Initialize the Click and Drag Handlers
		 */
		init : function() {
			if(this.stage !== null) {
				var that = this;
				// Calculate the Offset of the page to the current Stage of the Engine
				this.offsetX = $(this.stage.domNode).offset().left;
				this.offsetY = $(this.stage.domNode).offset().top;

				this.stage.addEventListener("click", function(event) {
					//that.onClickAnimElem(event);
				});

				this.stage.addEventListener("mousedown", function(event) {
					that.onMouseDownAnimElem(event);
				});

				window.addEventListener("mousemove", function(event) {
					that.onMouseMoveAnimElem(event);
				});

				window.addEventListener("mouseup", function(event) {
					that.onMouseUpAnimElem(event);
				});

				this.stage.addEventListener("mouseleave", function(event) {
					//that.onMouseLeaveStage(event);
				});

				this.objectModifier = $("#objectModifier");
				this.objectModifier.hide();
				
				this.objectModifier.on("mousedown", function(event) {
                    if (event.preventDefault) {
                         event.preventDefault(); // Prevent image dragging
                    }
                    that.objectModifierMouseDown(event);
                    
                });
    				
                this.omRefPoint = $("#omRefPoint");
                this.omRefPoint.bind("mousedown", function(event) {
                    that.refPointMouseDown(event);
                });
                this.omRefPoint.bind("mouseup", function(event) {
                });
                
                /*
                 * Add resize handlers
                 */
                var omResizeTL = $("#omTopLeft");
                omResizeTL.on("mousedown", function(event) {
                    that.resizeMouseDown(event);
                });
                var omResizeTR = $("#omTopRight");
                omResizeTR.on("mousedown", function(event) {
                    that.resizeMouseDown(event);
                });
                var omResizeBL = $("#omBottomLeft");
                omResizeBL.on("mousedown", function(event) {
                    that.resizeMouseDown(event);
                });
                var omResizeBR = $("#omBottomRight");
                omResizeBR.on("mousedown", function(event) {
                    that.resizeMouseDown(event);
                });
                
                /*
                 * Add rotate handlers
                 */
                var orTL = $("#orTopLeft");
                orTL.on("mousedown", function(event) {
                    that.rotateMouseDown(event);
                });
                var orTR = $("#orTopRight");
                orTR.on("mousedown", function(event) {
                    that.rotateMouseDown(event);
                });
                var orBL = $("#orBottomLeft");
                orBL.on("mousedown", function(event) {
                    that.rotateMouseDown(event);
                });
                var orBR = $("#orBottomRight");
                orBR.on("mousedown", function(event) {
                    that.rotateMouseDown(event);
                });
				
				// If the mouse Leaves the editing stage
				// $(this.domNode.parentNode).bind("mouseleave", function(event) {
					// that.onMouseLeaveStage(event);			
				// });
				
				dojo.publish("/animwidget/initLayers", [this.stage]);
			}
		},
		postCreate : function() {
		    // Add Stylesheets to the head
            if (dojo.query("link[href=./engine/css/style.css]").length < 1) {
                dojo.create("link", {rel: "stylesheet", href: "./engine/css/style.css" }, dojo.query("head")[0]);
                dojo.create("link", {rel: "stylesheet", href: "./widgets/templates/css/animwidget.css" }, dojo.query("head")[0]);
            }
            dojo.subscribe("/layerwidget/selectLayer", this, "onSelect");
            
            dojo.subscribe("/animdetailswidget/updateSelectedObject", this, "onUpdateSelected");
            dojo.subscribe("/animtimelinewidget/updateObject", this, "onUpdateObject");
            dojo.subscribe("/layerwidget/updateObject", this, "onUpdateObject");
            dojo.subscribe("/layerwidget/updateLayerPosition", this, "onUpdateObjectLayers");
            dojo.subscribe("/menuwidget/addObject", this, "onAddObject");
            dojo.subscribe("/menuwidget/newProject", this, "onNewProject");
            
            

		},
		startup : function() {
		    Core.init(document.getElementById("engine"), "dom", Core);
            
            //Core.setDomNode(document.getElementById("engine"));
            this.stage = AnimEn.getStage();
			if(this.stage !== null) {
				this.init();
			}
			
            dojo.subscribe("/animtimelinewidget/requestInitStage", this, "onRequestInitStage");
            dojo.publish("/animwidget/initStage", [this.stage]);
		},
		
		
		
        onRequestInitStage: function () {
            dojo.publish("/animwidget/initStage", [this.stage]);
        },
		
		/**
		 * Creates a new object an adds it to the stage 
		 */
		onAddObject: function(type) {
		    var newObj;
		    
		    if (type === "DisplayObject") {
		        newObj = new DisplayObject({x:50, y:50, width:100, height:100});
		    } else if (type === "Sprite") {
                newObj = new Sprite({x:50, y:50, width:100, height:100});
            } else if (type === "AnimObject") {
                newObj = new AnimObject({x:50, y:50, width:100, height:100});
            }
		    
		    // If there is an object selected this will be the parent object 
		    if (this.selectedObject !== undefined && this.selectedObject !== null) {
		        this.selectedObject.addChild(newObj);
		    } else {
		        this.stage.addChild(newObj);
		    }
		    dojo.publish("/animwidget/addObject", [newObj]);
		    this.deselect = false;
		},
		
		onNewProject: function() {
		    this.setAnimObject(null);
		    this.stage.removeAllChildren();
		    this.stage.setAnimations({defaultAnim: {}});
		    dojo.publish("/animwidget/initStage", [this.stage]);
		},
		
		/**
		 * Updates the layer position of an animObj with the newParentId
		 */
		onUpdateObjectLayers: function(animObjId, oldParentId, newParentId) {
		    var obj = this.stage.findById(parseInt(animObjId));
		    if (obj !== null && obj !== undefined) {
		        var newParent = this.stage.findById(parseInt(newParentId));
		        if (newParent !== undefined) {
		            newParent.addChild(obj);
		        }
		    }
		    if (this.selectedObject != undefined) {
		        this.updateObjectModifier(this.selectedObject);
		    }
		},
		/**
		 * Is called when the object modifier has to be updated for the selected Object 
		 */
		updateObjectModifier: function(selectedObj) {
		    if (selectedObj !== undefined) {
		        var currObj = selectedObj;
		        
		        console.log(selectedObj);
		        var pos = selectedObj.getRefStagePos();
		        
		        // Save the last object pos
                lastStageX = pos.x;
                lastStageY = pos.y;
		        
		        
		        var scale = selectedObj.getParentScale();
    		    this.objectModifier.css("left", pos.x - selectedObj.getWidth() * selectedObj.getRefX() * scale.scaleX * selectedObj.getScaleX());
                this.objectModifier.css("top", pos.y - selectedObj.getHeight() * selectedObj.getRefY() * scale.scaleY * selectedObj.getScaleY());
                this.objectModifier.css("width", selectedObj.getWidth() * pos.scaleX);
                this.objectModifier.css("height", selectedObj.getHeight() * pos.scaleY);
                
                
                var omRotation = pos.rotation % 360;
                var omScaleX = pos.scaleX;
                var omScaleY = pos.scaleY;
                // Set the correct resize icons
                if (omRotation == null || (omRotation < 45 || omRotation > 315) ) {
                    $("#omTopLeft").css("cursor", "nw-resize");
                    $("#omTopRight").css("cursor", "ne-resize");
                    $("#omBottomLeft").css("cursor", "sw-resize");
                    $("#omBottomRight").css("cursor", "se-resize");
                } else if (omRotation != null && (omRotation < 135 && omRotation > 45) ) {
                    $("#omTopLeft").css("cursor", "ne-resize");
                    $("#omTopRight").css("cursor", "se-resize");
                    $("#omBottomLeft").css("cursor", "nw-resize");
                    $("#omBottomRight").css("cursor", "sw-resize");
                } else if (omRotation != null && (omRotation < 225 && omRotation > 135) ) {
                    $("#omTopLeft").css("cursor", "se-resize");
                    $("#omTopRight").css("cursor", "sw-resize");
                    $("#omBottomLeft").css("cursor", "ne-resize");
                    $("#omBottomRight").css("cursor", "nw-resize");
                } else if (omRotation != null && (omRotation < 315 && omRotation > 225) ) {
                    $("#omTopLeft").css("cursor", "sw-resize");
                    $("#omTopRight").css("cursor", "nw-resize");
                    $("#omBottomLeft").css("cursor", "se-resize");
                    $("#omBottomRight").css("cursor", "ne-resize");
                }
                // Set the correct Rotation icons
                if (omRotation == null || (omRotation < 45 || omRotation > 315)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                } else if (omRotation != null && (omRotation < 135 && omRotation > 45)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                } else if (omRotation != null && (omRotation < 225 && omRotation > 135)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                } else if (omRotation != null && (omRotation < 315 && omRotation > 225)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                }
                
                if (selectedObj.getRefX() !== undefined && selectedObj.getRefY() !== undefined) {
                    this.objectRefX = selectedObj.getRefX();
                    this.objectRefY = selectedObj.getRefY();
                    
                } else {
                    this.objectRefX = 0.5;
                    this.objectRefY = 0.5;
                }
                
                this.omRefPoint.css("left", (this.objectRefX * 100)  + "%");
                this.omRefPoint.css("top", (this.objectRefY * 100)  + "%");
                this.objectModifier.css("-moz-transform-origin", "" + (this.objectRefX * 100) + "% " + (this.objectRefY * 100) + "%");
                this.objectModifier.css("-webkit-transform-origin", "" + (this.objectRefX * 100) + "% " + (this.objectRefY * 100) + "%");
                
                this.objectModifier.css("-moz-transform", "rotate(" + omRotation + "deg)");
                this.objectModifier.css("-webkit-transform", "rotate(" + omRotation + "deg)");
                
                this.objectModifier.show();
            } else {
                this.objectModifier.hide();
            }
		},
		
		/**
		 * This Method is called when an AnimationObject should be Selected. It creates the ObjectModifier around the Object and publishes the selected Message 
		 */
		setAnimObject : function(animObj) {
			if(animObj !== undefined && animObj !== null) {
				var pos = animObj.getRefStagePos();
				this.lastStageX = pos.x;
				this.lastStageY = pos.y;
				
				rotation = animObj.getRotation();
				if (rotation !== undefined && rotation !== null) {
					this.rotation = rotation;
				} else {
					this.rotation = 0;
				}
                var scaleX = animObj.getScaleX();
                if (scaleX !== undefined && scaleX !== null) {
                    this.scaleX = scaleX;
                } else {
                    this.scaleX = 1;
                }
                var scaleY = animObj.getScaleY();
                if (scaleY !== undefined && scaleY !== null) {
                    this.scaleY = scaleY;
                } else {
                    this.scaleY = 1;
                }
				
				
				
                this.updateObjectModifier(animObj);
                
                dojo.publish("/animwidget/initLayers", [this.stage]);
                dojo.publish("/animwidget/selectObject", [animObj]);
			} else {
				this.objectModifier.hide();
				this.selectedObject = null;
				this.draggableObject = null;
                dojo.publish("/animwidget/selectObject", []);
			}

		},
		/**
		 * Is called when an object with a given id is selected
		 */
		onSelect: function (id) {
		    var object = this.stage.findById(parseInt(id));
            this.selectedObject = object;
            this.deselect = false;
		    this.setAnimObject(object);
		},
		/**
		 * Updates an Object with the given change parameters
		 */
		onUpdateObject: function(change, object) {
		    if (object != null && change != null) {
                if (change.x !== undefined) {
                    object.setX(parseFloat(change.x));
                }
                if (change.y !== undefined) {
                    object.setY(parseFloat(change.y));
                }
                if (change.width !== undefined) {
                    object.setWidth(change.width);
                }
                if (change.height !== undefined) {
                    object.setHeight(change.height);
                }
                if (change.rotation !== undefined) {
                    object.setRotation(parseFloat(change.rotation));
                }
                if (change.refX !== undefined) {
                    object.setRefX(change.refX);
                }
                if (change.refY !== undefined) {
                    object.setRefY(change.refY);
                }
                if (change.zIndex !== undefined) {
                    object.setZIndex(change.zIndex);
                }
                if (change.scaleX !== undefined) {
                    object.setScaleX(change.scaleX);
                }
                if (change.scaleY !== undefined) {
                    object.setScaleY(change.scaleY);
                }
                if (change.resourceKey !== undefined) {
                    object.setResourceKey(change.resourceKey);
                }
                if (change.name !== undefined) {
                    object.setName(change.name);
                }
                if (change.deleteObject !== undefined && change.deleteObject === true) {
                    if (object.getParent() !== undefined) {
                        if (this.selectedObject === object) {
                            this.setAnimObject(null);
                        }
                        object.getParent().removeChild(object);
                    }
                }
                if (this.selectedObject != null) {
                    this.updateObjectModifier(this.selectedObject);
                }
            }
		},
		/**
		 * Updates the selected Object with the changeset
		 */
		onUpdateSelected:function(change) {
		    if (this.selectedObject !== undefined && change !== undefined) {
		        this.onUpdateObject(change, this.selectedObject);
                this.setAnimObject(this.selectedObject);
		    }
		},
		/**
		 * Dynamically updates the selected object with the new Parameters
		 */
		updateAnimObject : function(animObj) {
			if(animObj !== undefined && animObj !== null) {
				this.objectModifier.css("left", animObj.x);
				this.objectModifier.css("top", animObj.y);
				this.objectModifier.css("width", animObj.getWidth());
				this.objectModifier.css("height", animObj.getHeight());
				this.objectModifier.show();
			} else {
				this.objectModifier.hide();
				this.selectedObject = null
				this.draggableObject = null;
			}

		},
		
		rotateMouseDown: function(event) {
		    if (event.preventDefault) {
                 event.preventDefault(); // Prevent image dragging
            }
            if (event.stopPropagation) {
                event.stopPropagation(); // Don't send this message to sublisteners
            }
            this.selectedRotationNode = event.target;
			this.rotate = true;
		},
		
		resizeMouseDown: function(event) {
			if (event.preventDefault) {
                 event.preventDefault(); // Prevent image dragging
            }
            if (event.stopPropagation) {
                event.stopPropagation(); // Don't send this message to sublisteners
            }
			this.resize = true;
		},
		
		
		refPointMouseDown: function(event) {
			this.pointerRefX = this.cursorX + this.offsetX;//- (this.selectedObject.getX() + this.offsetX);
			this.pointerRefY = this.cursorY + this.offsetY;// - (this.selectedObject.getY() + this.offsetY);
			this.draggingRefPoint = true;
			this.draggableObject = null;
            if (event.preventDefault) {
                 event.preventDefault(); // Prevent image dragging
            }
		},
		
		/**
		 * Start Dragging an Object
		 */
		objectModifierMouseDown: function (event) {
			// If no object is selected select the clicked one if there is one
			if (this.selectedObject === undefined && this.selectedObject === null) {
				this.objectModifier.hide();
				var elem = document.elementFromPoint(event.clientX, event.clientY);
				this.selectedObject = Core.getObjectFromDom(elem);
				this.objectModifier.show();
                this.setAnimObject(this.selectedObject);
			}
			// If an Object is selected it can be dragged
			if (this.selectedObject !== undefined && this.selectedObject !== null) {
			    this.saveCurrentObjectRefPos();
				this.draggableObject = this.selectedObject;
                this.selectNext = true; // If the element is not moved the next element will be selected
                this.deselect = true;
			}
		},
		
		
		saveCurrentObjectRefPos : function() {
		    var pos = this.selectedObject.getRefStagePos();
		    this.pointerRefX = this.cursorX - (pos.x + this.offsetX);
            this.pointerRefY = this.cursorY - (pos.y + this.offsetY);
		},
		
		/**
		 * Is called when an object is clicked
		 */
		onMouseDownAnimElem : function(event) {
			var elem = document.elementFromPoint(event.clientX, event.clientY);
			this.cursorX = event.clientX;
			this.cursorY = event.clientY;
			if(this.selectedObject === null) {
				// If not selected before -> select it
				this.selectedObject = AnimEn.getInst().getObjectFromDom(elem);
				if(this.selectedObject !== undefined && this.selectedObject !== null) {
				    this.saveCurrentObjectRefPos();
				}
                this.deselect = false;
				this.setAnimObject(this.selectedObject);

			} else if (elem.id === this.objectModifier[0].id) {
			    // The Object modifier has been clicked
			    if(this.selectedObject !== undefined && this.selectedObject !== null) {
			        this.deselect = true;
                    this.saveCurrentObjectRefPos();
			    }
			} else {
			    // Select the clicked element if it is not the currently selected
				if (AnimEn.getInst().getObjectFromDom(elem) !== this.selectedObject && AnimEn.getInst().getObjectFromDom(elem) !== undefined) {
					this.selectedObject = AnimEn.getInst().getObjectFromDom(elem);
					if(this.selectedObject !== undefined && this.selectedObject !== null) {
                        this.saveCurrentObjectRefPos();
					}
					this.deselect = false;
					this.setAnimObject(this.selectedObject);
				} else {
					// Deselect object if it will not be dragged
					this.deselect = true;
                    this.saveCurrentObjectRefPos();
				}
			}
			this.draggableObject = this.selectedObject;
		},
		
		/*
		 * Is called when an object is moved in the stage
		 */
		onMouseMoveAnimElem : function(event) {
			if (this.rotate) {
                
                var vec = new Vector2d(lastStageX - (this.cursorX - this.offsetX - this.pointerRefX), lastStageY - (this.cursorY - this.offsetY - this.pointerRefY));
                var vec2 = new Vector2d(lastStageX - (event.clientX - this.offsetX - this.pointerRefX), lastStageY - (event.clientY - this.offsetY - this.pointerRefY));
                
                var angle = vec.dotProduct(vec2.getX(), vec2.getY());
                
                if (!vec.isAnglePositive(vec2.getX(), vec2.getY())) {
                    angle = - angle;
                }
                
				this.selectedObject.setRotation(parseFloat(this.selectedObject.getRotation()) + angle);
                this.updateObjectModifier(this.selectedObject);
                
                dojo.publish("/animwidget/updateObject", [this.selectedObject]);
			} else if (this.resize) {
			    // The position from the stage to the current pos on stage is the half height/width
                var halfWidth = lastStageX - (this.cursorX - this.offsetX - this.pointerRefX);
                if (halfWidth < 0) {
                    halfWidth *= -1;
                }
                var halfHeight = lastStageY - (this.cursorY- this.offsetY - this.pointerRefY);
                if (halfHeight < 0) {
                    halfHeight *= -1;
                }
                this.selectedObject.setWidth(halfWidth * 2);
                this.selectedObject.setHeight(halfHeight * 2);
                this.updateObjectModifier(this.selectedObject);
                
                dojo.publish("/animwidget/updateObject", [this.selectedObject]);
			} else if (this.draggingRefPoint) {
				var x = this.cursorX - this.offsetX - this.lastStageX + this.selectedObject.getWidth() / 2 + 8;// - this.selectedObject.getOffsetX() + 8;
				var y = this.cursorY - this.offsetY - this.lastStageY + this.selectedObject.getHeight() / 2 + 8;// - this.selectedObject.getOffsetY() + 8;
				this.objectRefX = (x / this.selectedObject.getWidth());
				this.objectRefY = (y / this.selectedObject.getHeight());
				
                this.selectedObject.setRefX(this.objectRefX);
                this.selectedObject.setRefY(this.objectRefY);
                
                this.updateObjectModifier(this.selectedObject);
                
                dojo.publish("/animwidget/updateObject", [this.selectedObject]);
			} else if ((this.draggableObject !== null) && (this.draggableObject !== undefined)) {
			    // Move the selected object on stage
			    this.draggableObject.setStagePos(this.cursorX - this.offsetX - this.pointerRefX, this.cursorY - this.offsetY - this.pointerRefY);
			    
				this.mouseMoved = true;
				this.updateObjectModifier(this.draggableObject);
				
				dojo.publish("/animwidget/updateObject", [this.selectedObject]);
			}
			
			
			this.cursorX = event.clientX;
			this.cursorY = event.clientY;
		},
		
		getDisplObjFromStage: function(x, y) {
		    var elem = document.elementFromPoint(x, y);
		    var obj = AnimEn.getInst().getObjectFromDom(elem);
		    return obj;
		},
		
		/**
		 * Is Called when Mouse is up on the stage or an anim Object
		 */
		onMouseUpAnimElem : function(event) {
			this.draggableObject = null;
			
			
            if (this.selectedObject) {
                dojo.publish("/animwidget/updateObject", [this.selectedObject]);
            }
			
			if (this.draggingRefPoint) {
				this.draggingRefPoint = false;
				this.selectedObject.setRefX(this.objectRefX);
				this.selectedObject.setRefY(this.objectRefY);
				
				this.deselect = true;
                this.updateObjectModifier(this.selectedObject);
			} else if (this.resize) {
				this.resize = false;
			} else if (this.rotate) {
				this.rotate = false;
			} else if (this.mouseMoved) {
				this.mouseMoved = false;
				this.selectNext = false;
                this.deselect = false;
			} else if (this.deselect) {
				// deselect Element
				this.setAnimObject(null);
			} else if (this.selectNext) {
			    // If nothing has been done than clicking, select the element under cursor
                this.objectModifier.hide();
                var obj = this.getDisplObjFromStage(event.clientX, event.clientY);
                this.objectModifier.show();
                if (obj != null && this.selectedObject != null && obj.getId() != this.selectedObject.getId()) {
                    this.setAnimObject(null);
                    this.onMouseDownAnimElem(event);
                    this.deselect = false;
                } else if (this.deselect) {
                    this.setAnimObject(null);
                }
			    
			    this.draggableObject = null;
			}
			
            dojo.publish("/animwidget/update", [this.stage]);
		},
		onMouseLeaveStage : function(event) {
			this.draggableObject = null;
			this.mouseMoved = false;
		},
		onClickAnimElem : function(event) {
			var elem = document.elementFromPoint(event.clientX, event.clientY);
			if(elem !== undefined && this.selectedObject !== null) {
				this.selectedObject = Core.getObjectFromDom(elem);
				// If selected an element and now nothing selected deselect the element
				if (this.selectedObject === undefined || this.selectedObject === null) {
					this.setAnimObject(null);
				}
			} else if (elem !== undefined && this.selectedObject === null) {
				this.selectedObject = Core.getObjectFromDom(elem);
				// If selected no element and now selected an element select this!
				if (this.selectedObject !== undefined && this.selectedObject !== null) {
					this.setAnimObject(this.selectedObject);
				}
			}
		}
	});

}