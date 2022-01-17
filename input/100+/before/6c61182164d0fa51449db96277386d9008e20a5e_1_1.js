function(data) {
    	this.levelData = data;

    	var newContainer = Game.container.cloneNode(true);
    	Game.container.parentNode.replaceChild(newContainer, Game.container);
    	Game.container = newContainer;

    	var width	= Game.gameData.viewport.width;
    	var height	= Game.gameData.viewport.height;

    	if (this.useWebGL) {
    		this.renderer = new THREE.WebGLRenderer({antialias: false});
    	} else {
    		this.renderer = new THREE.CanvasRenderer({antialias: false});			
    	}
    	this.renderer.setSize(width, height);

    	Game.container.appendChild(this.renderer.domElement);

    	this.renderer.setClearColorHex(0x000000, 1.0);
    	this.renderer.clear();

  		this.camera	= new THREE.OrthographicCamera(0, width, 0, height, -1, 100000);
    	this.camera.position.z = 100000;

    	this.scene	= new THREE.Scene();
    	this.scene.add(this.camera);

    	this.skinsCoordinates	= {};
    	this.materials			= {};
    	this.entities			= {};
    	this.animations			= {};

    	this.ground		= new THREE.Geometry();
    	this.sprites	= new THREE.Geometry();
    	
    	var materialsGround		= [];
    	var materialsSprites	= [];

    	//Material
    	for (var i = 0; i < this.levelData.cells.length; i++) {
    		var id = this.levelData.cells[i].background;
    		if (materialsGround[id] == undefined) materialsGround[id] = this.getMaterial('./ressources/levels/tiles/'+id)
    	}

    	//Sprites
    	for (var i = 0; i < this.levelData.cells.length; i++) {
    		var id = this.levelData.cells[i].sprite;
    		if (id != '') {
    			id = parseInt(id);
    			if (materialsSprites[id] == undefined) materialsSprites[id] = this.getMaterial('./ressources/levels/sprites/'+id)
    		}
    	}

    	//Items
    	for (var y = this.levelData.dimensions.height-1; y >= 0; y--) {
    		for (var x = this.levelData.dimensions.width-1; x >= 0; x--) {
    			var tileID		= y * this.levelData.dimensions.width + x;
    			var tiletData	= (this.levelData.cells[tileID] != undefined) ? this.levelData.cells[tileID] : this.levelData.cells[0];

    			var position	= this.getTilePosition(x, y);
    			var left		= position.x;
    			var top			= position.y-this.isometry.y;
    			var width		= this.cellSize.width;
    			var height		= this.cellSize.height;

    			var tile = this.createPlane(width, height, materialsGround, tiletData.background);

    			tile.position.x = left;
    			tile.position.y = top;
    			tile.position.z = 0;

    			tile.matrixAutoUpdate = false;
    			tile.updateMatrix();

    			THREE.GeometryUtils.merge(this.ground, tile);

    			if (tiletData.sprite != '') {
    				var id			= tiletData.sprite;
    				var spriteData	= this.levelData.sprites['s_'+id];
    				
    				var sprite = this.createPlane(spriteData.width, spriteData.height, materialsSprites, parseInt(tiletData.sprite));
    				sprite.position.x = left -spriteData.x;
    				sprite.position.y = top - spriteData.y;
    				sprite.position.z = this.levelData.dimensions.width - x + y + 0.2;

    				sprite.matrixAutoUpdate = false;
    				sprite.updateMatrix();

    				//THREE.GeometryUtils.merge(this.sprites, sprite);
    				this.scene.add(sprite);
    			}
    		}
    	}

    	var meshGround = new THREE.Mesh(this.ground, new THREE.MeshFaceMaterial());
    	this.scene.add(meshGround);

    	/*var meshSprites = new THREE.Mesh(this.sprites, new THREE.MeshFaceMaterial());
    	this.scene.add(meshSprites);*/

    	stats = new Stats();
    	stats.domElement.style.position = 'absolute';
    	stats.domElement.style.top = '0px';
    	stats.domElement.style.zIndex = 100;
    	Game.container.appendChild( stats.domElement );

    	var self 	= this;
    	var drag	= false;
    	var dragged = false;
    	var startX;
    	var startY;

    	CrossBrowser.addEventListener(Game.container, 'mousedown', function(e) {
    		var mousePosition = CrossBrowser.getMousePosition(e);

    		startX	= mousePosition.left;
    		startY	= mousePosition.top;
    		drag	= true;
    	});

    	CrossBrowser.addEventListener(Game.container, 'mousemove', function(e) {
    		var mousePosition		= CrossBrowser.getMousePosition(e);
    		var containerPosition	= CrossBrowser.findPosition(Game.container);

    		var baseX = mousePosition.left - containerPosition.left + self.camera.position.x;
    		var baseY = mousePosition.top - containerPosition.top + self.camera.position.y;

    		var overTile = self.getCoordinates(baseX, baseY);
    		var position = self.getTilePosition(overTile.x, overTile.y)

    		self.cursor.position.x = position.x;
    		self.cursor.position.y = (position.y-self.isometry.y);

    		var onEntity = false;
    		for (var i = 0; i < Game.level.entities.length; i++) {
    			if (Game.level.entities[i].x == overTile.x && Game.level.entities[i].y == overTile.y) onEntity = true; 
    		}

    		var numTile = overTile.y * self.levelData.dimensions.width + overTile.x;
    		if (numTile >= 0 && numTile < self.levelData.dimensions.width * self.levelData.dimensions.height) {
    			if (onEntity) {
    				self.setCursor('./ressources/cursor_a');					
    			} else if (self.levelData.cells[numTile].accessible) {
    				self.setCursor('./ressources/cursor');					
    			} else {
    				self.setCursor('./ressources/cursor_na');
    			}
    		} else {
    				self.setCursor('./ressources/cursor_na');					
    		}

    		if (!drag) return;
    		dragged = true;

    		var x = mousePosition.left - startX;
    		var y = mousePosition.top - startY;

    		self.camera.position.x -= x;
    		self.camera.position.y -= y;
    		startX = mousePosition.left;
    		startY = mousePosition.top;
    	});

    	CrossBrowser.addEventListener(Game.container, 'mouseup', function(e) {
    		if (!dragged) {
	    		var mousePosition		= CrossBrowser.getMousePosition(e);
	    		var containerPosition	= CrossBrowser.findPosition(Game.container);

    			var baseX = mousePosition.left - containerPosition.left + self.camera.position.x;
    			var baseY = mousePosition.top - containerPosition.top + self.camera.position.y;

    			var clickedTile = self.getCoordinates(baseX, baseY);
    			Game.level.checkCoordinates(clickedTile.x, clickedTile.y);
    			Game.level.playerCharacter.move(clickedTile.x, clickedTile.y, true);
    		}
    	});

    	CrossBrowser.addEventListener(document, 'mouseup', function(e) {
    		dragged = false;
    		drag	= false;
    	});

    	this.cursor = this.createPlane(this.cellSize.width, this.cellSize.height, [this.getMaterial('./ressources/cursor')]);
    	this.cursor.position.z = 100;
    	this.scene.add(this.cursor);

    	this.render();
    	this.animationInterval = setInterval(function() {
    		self.doAnimation();	
    	}, 100);
    }