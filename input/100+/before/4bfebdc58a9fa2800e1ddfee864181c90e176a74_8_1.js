function(declare, _Widget, _Templated, script, domConstruct, template, SceneItem, Storage, AnimEn) {

	return declare("widgets.SceneWidget", [_Widget, _Templated], {
		templateString : template,
		activeSceneNode: null,
		sceneItemsNode:null,
		addSceneNode:null,
		scenes:{},
		sceneItems:{},
		stageInitialized: false,

		postCreate : function() {
			dojo.subscribe("/animwidget/initStage", this, "onInitStage");
			dojo.subscribe("/sceneitem/activatescene", this, "onActivateScene");
			dojo.subscribe("/sceneitem/deletescene", this, "onDeleteScene");
			dojo.create("link", {
				rel : "stylesheet",
				href : "./widgets/templates/css/scenewidget.css"
			}, dojo.query("head")[0]);
			this.scenes = AnimEn.getInst().getAllScenes();
		},
		startup : function() {
			this.init();
			
            if (!this.stageInitialized) {
                dojo.publish("/animtimelinewidget/requestInitStage", []);
            }
		},
		/**
		 * Initializes the stage and creates the scenes 
		 */
		onInitStage:function(stage) {
			if (!this.stageInitialized) {
				this.stageInitialized = true;
				this.initScenes();
				dojo.publish("/scenewidget/activatescene", [this.activeScene]);
			}
		},
		onDeleteScene: function(sceneKey) {
			if ((Object.keys(this.sceneItems).length) > 1) {
				this.sceneItems[sceneKey].destroyRecursive(false);
				delete this.scenes[sceneKey];
				delete this.sceneItems[sceneKey];
				dojo.publish("/scenewidget/deletescene", [sceneKey]);
				if (this.activeSceneNode.innerHTML == sceneKey) {
					for (var key in this.sceneItems) {
						this.onActivateScene(key);
						return;
					}
				}
			} else {
				alert("You cannot delete the last scene");
			}
		},
		/**
		 * Is called when a scene should be selected 
		 */
		onActivateScene: function(selKey) {
			for(var key in this.sceneItems) {
				this.sceneItems[key].setSelected(false);
			}
			this.activeSceneNode.innerHTML = selKey;
			this.sceneItems[selKey].setSelected(true);
			AnimEn.getInst().setActiveScene(selKey);
			dojo.publish("/scenewidget/activatescene", [selKey]);
		},
		/**
		 * Initializes the scenes and displays the list 
		 */
		initScenes:function() {
			var defaultSet = false;
			
			var scene = Storage.getString("activeScene");
			
			if (this.scenes[scene] != null) {
				this.activeSceneNode.innerHTML = scene;
				this.activeScene = scene;
				defaultSet = true;
			} else if (this.scenes["defaultAnim"] != null) {
				this.activeSceneNode.innerHTML = "defaultAnim";
				this.activeScene = "defaultAnim";
				defaultSet = true;
			}
			
			for(var key in this.scenes) {
				
				this.sceneItems[key] = new widgets.SceneItem({"name":key});
		        
		        this.sceneItemsNode.appendChild(this.sceneItems[key].domNode);
		        
		        this.sceneItems[key].startup();
		        
		        if (!defaultSet) {
		        	scene = key;
					this.activeSceneNode.innerHTML = key;
					this.activeScene = key;
					defaultSet = true;
				}
			}
			
			this.sceneItems[scene].setSelected(true);
		},
		/**
		 * Initializes the Scene Widget
		 */
		init : function() {
			this.activeSceneNode = dojo.byId("activeScene");
			this.sceneItemsNode = dojo.byId("sceneItems");
			
			
			this.addSceneNode = dojo.byId("addScene");
            dojo.connect(this.addSceneNode, "onclick", this, this.addScenePopup);
			
		},
		addScenePopup:function() {
			var newScene = window.prompt("Please enter the name of the new scene", "newScene");
            if (newScene !== null) {
            	if (this.scenes[newScene] != null) {
            		window.alert("The name of the scene you entered already exists");
            	} else {
            		this.addScene(newScene);
            	}
                
            }
		},
		/**
		 * Adds a new Scene to the Animation
		 * @param {Object} key Name of the scene
		 */
		addScene:function(key) {
			this.scenes[key] = {x:0, y:0};
			
			this.sceneItems[key] = new widgets.SceneItem({"name":key});
        
	        this.sceneItemsNode.appendChild(this.sceneItems[key].domNode);
	        
	        this.sceneItems[key].startup();
		}
	});

}