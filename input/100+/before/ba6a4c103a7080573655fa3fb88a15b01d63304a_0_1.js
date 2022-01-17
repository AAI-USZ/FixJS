function() {
  var YouTube,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.disableEnvironment = true;

  window.Milk = (function() {

    Milk.mixin = function() {
      var key, object, objects, target, value, _i, _len;
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        for (key in object) {
          value = object[key];
          target[key] = value;
        }
      }
      return target;
    };

    Milk.prototype.mixin = function() {
      var objects;
      objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return Milk.mixin.apply(Milk, [this].concat(__slice.call(objects)));
    };

    function Milk() {
      var component, components, key, value, _i, _len, _ref;
      components = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.scene = game.scene;
      for (_i = 0, _len = components.length; _i < _len; _i++) {
        component = components[_i];
        if (component != null ? component.isMilkComponent : void 0) {
          this.components || (this.components = []);
          this.components.push(component);
          _ref = component.prototype;
          for (key in _ref) {
            value = _ref[key];
            if (!(this[key] != null)) {
              this[key] = value;
            }
          }
          component.call(this);
        }
      }
    }

    Milk.prototype.componentDispatch = function(operationName, args) {
      var component, _i, _len, _ref, _ref1;
      if (this.components) {
        _ref = this.components;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          if ((_ref1 = component.prototype[operationName]) != null) {
            _ref1.apply(this, args);
          }
        }
      }
      return null;
    };

    Milk.prototype.stage = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.componentDispatch('stage', args);
    };

    Milk.prototype.render = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.componentDispatch('render', args);
    };

    Milk.prototype.update = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.componentDispatch('update', args);
    };

    Milk.prototype.exportObject = function(object3D) {
      this.object3D = object3D;
      return this.componentDispatch('exportObject', [object3D]);
    };

    Milk.prototype.notReady = function() {
      var className, l, _base;
      this._ready = false;
      if (game.hasLoaded) {
        return;
      }
      className = this.constructor.name;
      Milk.loadingStates || (Milk.loadingStates = {});
      (_base = Milk.loadingStates)[className] || (_base[className] = 0);
      Milk.loadingStates[className] += 1;
      console.log('LOADING', className);
      if (l = $('#chat-log')) {
        return l.append("<li>Loading " + className + "</li>");
      }
    };

    Milk.prototype.ready = function() {
      var className, l;
      this._ready = true;
      if (typeof this.onready === "function") {
        this.onready();
      }
      if (game.hasLoaded) {
        return;
      }
      className = this.constructor.name;
      Milk.loadingStates[className] -= 1;
      console.log('DONE', className);
      if (l = $('#chat-log')) {
        l.append("<li>Done " + className + "</li>");
      }
      if (this.isReady()) {
        return game.ready();
      }
    };

    Milk.prototype.isReady = function() {
      var count, state, _ref;
      if (!game.isReady) {
        return false;
      }
      _ref = Milk.loadingStates;
      for (state in _ref) {
        count = _ref[state];
        if (count > 0) {
          return false;
        }
      }
      return true;
    };

    Milk.prototype.afterReady = function(callback) {
      this.onready = callback;
      if (this._ready) {
        return typeof this.onready === "function" ? this.onready() : void 0;
      }
    };

    Milk.prototype.observe = function(eventName, callback) {
      var c, _base;
      this._observers || (this._observers = {});
      c = (_base = this._observers)[eventName] || (_base[eventName] = []);
      if (c.indexOf(callback) === -1) {
        c.push(callback);
      }
      return this;
    };

    Milk.prototype.fire = function(eventName, data) {
      var c, callback, _i, _len;
      c = this._observers[eventName];
      if (c) {
        for (_i = 0, _len = c.length; _i < _len; _i++) {
          callback = c[_i];
          callback(data);
        }
      }
      return this;
    };

    return Milk;

  })();

  Milk.Component = (function() {

    function Component() {}

    Component.isMilkComponent = true;

    return Component;

  })();

  Milk.Script = (function() {

    function Script() {}

    Script.isMilkScript = true;

    return Script;

  })();

  Milk.Game = (function(_super) {

    __extends(Game, _super);

    function Game() {
      this.render = __bind(this.render, this);
      this.isReady = false;
    }

    Game.prototype.loadLevel = function(levelClass) {
      this.client = new Milk.NetworkClient;
      this.level = new levelClass;
      return this.isReady = true;
    };

    Game.prototype.ready = function() {
      this.hasLoaded = true;
      console.log('DONE LOADING GAME');
      setTimeout((function() {
        return $('#chat-log').html('');
      }), 1500);
      this.stage();
      return this.start();
    };

    Game.prototype.stage = function() {
      return this.level.stage();
    };

    Game.prototype.antialias = true;

    Game.prototype.stats = true;

    Game.prototype.constructRenderer = function() {
      var _this = this;
      if (this.renderer) {
        return;
      }
      if (!this.container) {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
      }
      this.renderer = new THREE.WebGLRenderer({
        antialias: this.antialias
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);
      if (this.stats && (typeof Stats !== "undefined" && Stats !== null)) {
        this.stats = new Stats;
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0';
        this.container.appendChild(this.stats.domElement);
      }
      return window.addEventListener('resize', function() {
        var camera, height, width;
        width = window.innerWidth;
        height = window.innerHeight;
        camera = _this.level.camera;
        if (camera != null) {
          camera.aspect = width / height;
        }
        _this.renderer.setSize(width, height);
        return camera != null ? camera.updateProjectionMatrix() : void 0;
      }, false);
    };

    Game.prototype.start = function() {
      this.clock = new THREE.Clock;
      this.constructRenderer();
      return requestAnimationFrame(this.render, this.renderer.domElement);
    };

    Game.prototype.render = function(time) {
      var delta, timestep, _ref;
      delta = this.clock.getDelta();
      requestAnimationFrame(this.render, this.renderer.domElement);
      timestep = (time - this.lastFrameTime) * 0.001;
      if ((_ref = this.stats) != null) {
        _ref.update(delta);
      }
      this.level.update(delta);
      return this.level.render(this.renderer);
    };

    return Game;

  })(Milk);

  $(function() {
    window.game = new Milk.Game;
    return game.loadLevel(Milk.MoonLevel);
  });

  /*
  class Scene
  	constructor: ->
  		## PLAYERS
  		@players = {}
  		@vehicles = []
  
  		## TARDIS
  		tardis = new Vehicle.Tardis
  		tardis.position = new THREE.Vector3(-20,10.5,-60)
  		@addVehicle tardis
  
  		@createRenderer()
  
  	add: (object) ->
  		@scene.add object
  	remove: (object) ->
  		@scene.remove object
  
  	addPlayer: (id, position = new THREE.Vector3(7,12,-70), currentPlayer = false, items) ->
  		p = new Player(id, position, items)
  		@players[id] = p
  		@add(p)
  		if currentPlayer
  			@player = p
  			requestAnimationFrame @render, @renderer.domElement
  
  	addVehicle: (object) ->
  		@scene.add object
  		@vehicles.push object
  
  	enterVehicle: ->
  		for vehicle in @vehicles
  			if vehicle.canEnter()
  				vehicle.player = @player
  				@players[@player.playerId] = vehicle
  				@player = vehicle.enter @player
  				return
  
  	exitVehicle: ->
  		return if @player.playerId
  		window.tardis = @player
  		vehicle = @player
  		vehicle.exit vehicle.player
  
  		@player = vehicle.player
  		@players[@player.playerId] = @player
  
  # Uncomment for .obj loading capabilities
  # THREE.Mesh.loader = new THREE.JSONLoader()
  
  	render: (time) =>
  		return unless @player
  
  		delta = clock.getDelta()
  		requestAnimationFrame @render, @renderer.domElement
  		timestep = (time - @lastFrameTime) * 0.001
  
  		@stats.update()
  		@handler.update(this)
  
  		@player.update(delta)
  
  		if @player.position.y < (@milk.position.y - 3)
  			@scene.fog.far = 20
  		else
  			@scene.fog.far = 100000
  
  		for vehicle in @vehicles
  			vehicle.update() if vehicle isnt @player
  		for _,player of @players
  			player.afterUpdate()
  		@renderer.render @scene, @camera
  */


  Milk.Actor = (function(_super) {

    __extends(Actor, _super);

    function Actor() {
      return Actor.__super__.constructor.apply(this, arguments);
    }

    Actor.prototype.stage = function() {
      Actor.__super__.stage.apply(this, arguments);
      return this.scene.add(this.object3D);
    };

    Actor.prototype.update = function(delta) {
      var _base;
      Actor.__super__.update.apply(this, arguments);
      return typeof (_base = this.object3D).update === "function" ? _base.update(delta) : void 0;
    };

    Actor.prototype.updateNetwork = function(data) {
      return this.componentDispatch('updateNetwork', [data]);
    };

    Actor.prototype.receiveNetworkUpdate = function(data) {
      return this.componentDispatch('receiveNetworkUpdate', [data]);
    };

    return Actor;

  })(Milk);

  Milk.Alien = (function(_super) {

    __extends(Alien, _super);

    function Alien() {
      var options,
        _this = this;
      Alien.__super__.constructor.apply(this, arguments);
      this.notReady();
      options = {
        baseUrl: "public/ratamahatta/",
        body: "ratamahatta.js",
        skins: ["ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png"],
        weapons: [["weapon.js", "weapon.png"], ["w_bfg.js", "w_bfg.png"], ["w_blaster.js", "w_blaster.png"], ["w_chaingun.js", "w_chaingun.png"], ["w_glauncher.js", "w_glauncher.png"], ["w_hyperblaster.js", "w_hyperblaster.png"], ["w_machinegun.js", "w_machinegun.png"], ["w_railgun.js", "w_railgun.png"], ["w_rlauncher.js", "w_rlauncher.png"], ["w_shotgun.js", "w_shotgun.png"], ["w_sshotgun.js", "w_sshotgun.png"]]
      };
      this.character = new THREE.MD2Character;
      this.character.scale = 0.08;
      this.character.onLoadComplete = function() {
        _this.character.meshBody.rotation.y = 1.5;
        _this.exportObject(_this.character.root);
        return _this.ready();
      };
      this.character.loadParts(options);
    }

    Alien.prototype.maxSpeed = 1.3;

    Alien.prototype.followDistance = 9;

    Alien.prototype.groundCollisionMinimum = 2;

    Alien.prototype.update = function(delta) {
      Alien.__super__.update.apply(this, arguments);
      return this.character.update(delta);
    };

    return Alien;

  })(Milk.Actor);

  Milk.Spaceman = (function(_super) {

    __extends(Spaceman, _super);

    function Spaceman() {
      var _this = this;
      Spaceman.__super__.constructor.apply(this, arguments);
      this.notReady();
      this.sprite = new Milk.Sprite("public/robot.png", function() {
        _this.exportObject(_this.sprite.object3D);
        return _this.ready();
      });
    }

    Spaceman.prototype.followDistance = 8;

    Spaceman.prototype.groundCollisionMinimum = 0.8;

    return Spaceman;

  })(Milk.Actor);

  Milk.Animation = (function(_super) {

    __extends(Animation, _super);

    function Animation() {
      return Animation.__super__.constructor.apply(this, arguments);
    }

    Animation.prototype.setAnimation = function(name, fps) {
      var _ref, _ref1;
      if (fps == null) {
        fps = 6;
      }
      if (this.currentAnimation === name) {
        return;
      }
      if ((_ref = this.character) != null) {
        _ref.animationFPS = fps;
      }
      if ((_ref1 = this.character) != null) {
        if (typeof _ref1.setAnimation === "function") {
          _ref1.setAnimation(name);
        }
      }
      this.currentAnimation = name;
      return this.currentFPS = fps;
    };

    Animation.prototype.updateNetwork = function(data) {
      return data.animation = {
        name: this.currentAnimation || 'stand',
        fps: this.currentFPS
      };
    };

    Animation.prototype.receiveNetworkUpdate = function(data) {
      if (data.animation) {
        return this.setAnimation(data.animation.name, data.animation.fps);
      }
    };

    return Animation;

  })(Milk.Component);

  Milk.Movable = (function(_super) {

    __extends(Movable, _super);

    function Movable() {
      this.velocity = 0;
      this.yVelocity = 0;
      this.speed = 0.05;
      this.maxSpeed = 0.2;
      this.angularVelocity = 0;
      this.turnSpeed = 0.01;
      this.maxTurnSpeed = 0.02;
    }

    Movable.prototype.exportObject = function() {
      return this.object3D.useQuaternion = true;
    };

    Movable.prototype.forward = function(direction) {
      this.velocity += this.speed * direction;
      if (this.velocity > this.maxSpeed) {
        return this.velocity = this.maxSpeed;
      } else if (this.velocity < -this.maxSpeed) {
        return this.velocity = -this.maxSpeed;
      }
    };

    Movable.prototype.turn = function(direction) {
      this.angularVelocity += this.turnSpeed * direction;
      if (this.angularVelocity > this.maxTurnSpeed) {
        return this.angularVelocity = this.maxTurnSpeed;
      } else if (this.angularVelocity < -this.maxTurnSpeed) {
        return this.angularVelocity = -this.maxTurnSpeed;
      }
    };

    Movable.prototype.jump = function() {
      if (!this.jumping) {
        this.yVelocity = this.speed;
        return this.jumping = true;
      }
    };

    Movable.prototype.update = function() {
      var magicNumber, mapHeightAtPlayer, rotation;
      rotation = new THREE.Quaternion();
      rotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.angularVelocity);
      this.object3D.quaternion.multiplySelf(rotation);
      this.angularVelocity *= 0.9;
      this.velocity *= 0.8;
      this.object3D.position.subSelf(this.direction().multiplyScalar(this.velocity));
      this.object3D.position.y += this.yVelocity;
      this.yVelocity -= 0.0005;
      mapHeightAtPlayer = game.level.heightAtPosition(this.object3D.position);
      magicNumber = this.groundCollisionMinimum;
      if (mapHeightAtPlayer > this.object3D.position.y - magicNumber) {
        this.object3D.position.y = mapHeightAtPlayer + magicNumber;
        if (this.jumping) {
          this.jumping = false;
          return typeof this.setAnimation === "function" ? this.setAnimation('stand') : void 0;
        }
      }
    };

    Movable.prototype.updateNetwork = function(data) {
      data.position = this.object3D.position;
      return data.quaternion = this.object3D.quaternion;
    };

    Movable.prototype.receiveNetworkUpdate = function(data) {
      if (data.position) {
        this.yVelocity = 0;
        this.object3D.position.x = data.position.x;
        this.object3D.position.y = data.position.y;
        this.object3D.position.z = data.position.z;
      }
      if (data.quaternion) {
        this.object3D.quaternion.x = data.quaternion.x;
        this.object3D.quaternion.y = data.quaternion.y;
        this.object3D.quaternion.z = data.quaternion.z;
        return this.object3D.quaternion.w = data.quaternion.w;
      }
    };

    Movable.prototype.direction = function() {
      var orient_axis;
      orient_axis = new THREE.Vector3;
      this.object3D.quaternion.multiplyVector3(new THREE.Vector3(0, 0, 1), orient_axis);
      return orient_axis;
    };

    return Movable;

  })(Milk.Component);

  /*
  class Player extends THREE.Object3D
  
  	ITEM_OPTIONS =
  		dino: 'mask'
  		helmet: 'mask'
  		hat: 'hat'
  		milk: 'hand'
  		cookies: 'hand'
  
  	ITEM_OFFSETS =
  		mask:
  			x: 0
  			y: 0.6
  		hand:
  			x: 0.45
  			y: 0
  		hat:
  			x: 0
  			y: 0.9
  
  	constructor: (id, position, startingItems = []) ->
  		@items = {}
  
  
  		@boundingBox = {max: new THREE.Vector3(1, 0.8, 1)}
  
  		for item in startingItems
  			@equipItem(item)
  
  	equipItem: (item) ->
  		unless @items[item]
  			itemSprite = new Sprite("#{item}.png")
  			slot = ITEM_OPTIONS[item] || "hand"
  			offset = ITEM_OFFSETS[slot]
  			itemSprite.position.set(offset.x, offset.y, 0.001)
  			@add(itemSprite)
  			@items[item] = itemSprite
  
  	unequipItem: (item) ->
  		if @items[item]
  			@remove @items[item]
  			@items[item] = null
  			delete @items[item]
  */


  Milk.Controllable = (function(_super) {

    __extends(Controllable, _super);

    function Controllable() {
      return Controllable.__super__.constructor.apply(this, arguments);
    }

    Controllable.prototype.stage = function() {
      var _this = this;
      Milk.KeyHandler.listen();
      return game.client.observe('willSendPlayerUpdate', function(data) {
        return _this.updateNetwork(data);
      });
    };

    Controllable.prototype.update = function() {
      if (Milk.KeyHandler.isDown('up')) {
        if (!this.jumping) {
          if (typeof this.setAnimation === "function") {
            this.setAnimation('run');
          }
        }
        if (typeof this.forward === "function") {
          this.forward(1);
        }
      } else if (Milk.KeyHandler.isDown('down')) {
        if (!this.jumping) {
          if (typeof this.setAnimation === "function") {
            this.setAnimation('run');
          }
        }
        if (typeof this.forward === "function") {
          this.forward(-1);
        }
      } else if (this.currentAnimation === 'run') {
        if (typeof this.setAnimation === "function") {
          this.setAnimation('stand');
        }
      }
      if (Milk.KeyHandler.isDown('left')) {
        if (typeof this.turn === "function") {
          this.turn(1);
        }
      }
      if (Milk.KeyHandler.isDown('right')) {
        if (typeof this.turn === "function") {
          this.turn(-1);
        }
      }
      if (Milk.KeyHandler.isDown('space')) {
        if (!this.preventJump) {
          if (typeof this.setAnimation === "function") {
            this.setAnimation('jump', 1);
          }
          return this.jump();
        }
      }
    };

    return Controllable;

  })(Milk.Component);

  Milk.HeightMap = (function(_super) {

    __extends(HeightMap, _super);

    function HeightMap(imageURL) {
      var _this = this;
      HeightMap.__super__.constructor.apply(this, arguments);
      this.notReady();
      this.image = new Image();
      this.image.onload = function() {
        return _this.ready();
      };
      if (imageURL) {
        this.image.src = imageURL;
      }
    }

    HeightMap.prototype.stage = function() {
      var cols, geo, height, rows, width;
      width = this.image.width;
      height = this.image.height;
      rows = height - 1;
      cols = width - 1;
      this.metrics = {
        width: width,
        height: height,
        rows: rows,
        cols: cols,
        cellWidth: (rows + 1) / height,
        cellHeight: (cols + 1) / width
      };
      geo = new THREE.PlaneGeometry(width, height, rows, cols);
      geo.dynamic = true;
      this.applyHeightMapToGeometry(geo);
      return geo;
    };

    HeightMap.prototype.applyHeightMapToGeometry = function(geo) {
      var heightData, i, vertex, _i, _len, _ref;
      if (!this.heightData) {
        this.heightDataFromImage();
      }
      heightData = this.heightData;
      _ref = geo.vertices;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        vertex = _ref[i];
        vertex.y = heightData[i];
      }
      return geo.computeFaceNormals();
    };

    HeightMap.prototype.heightAtPosition = function(x, z) {
      var cellHeight, cellWidth, col0, col1, gridX, gridZ, h00, h01, h10, h11, height, numCols, numRows, row0, row1, tx, txty, ty;
      if (!this.heightData) {
        this.heightDataFromImage();
      }
      numCols = this.metrics.cols;
      numRows = this.metrics.rows;
      cellWidth = this.metrics.cellWidth;
      cellHeight = this.metrics.cellHeight;
      x += numCols * cellWidth * 0.5;
      z += numRows * cellHeight * 0.5;
      gridX = x / cellWidth;
      gridZ = z / cellHeight;
      col0 = Math.floor(gridX);
      row0 = Math.floor(gridZ);
      col1 = col0 + 1;
      row1 = row0 + 1;
      if (col1 > numCols) {
        col1 = 0;
      }
      if (row1 > numRows) {
        row1 = 0;
      }
      h00 = this.heightData[col0 + row0 * (numCols + 1)];
      h01 = this.heightData[col1 + row0 * (numCols + 1)];
      h11 = this.heightData[col1 + row1 * (numCols + 1)];
      h10 = this.heightData[col0 + row1 * (numCols + 1)];
      tx = gridX - col0;
      ty = gridZ - row0;
      txty = tx * ty;
      height = h00 * (1 - ty - tx + txty) + h01 * (tx - txty) + h11 * txty + h10 * (ty - txty);
      return height;
    };

    HeightMap.prototype.heightDataFromImage = function() {
      var all, canvas, context, height, heightData, i, pixel, pixelIndex, pixels, size, width, _i, _len, _step;
      width = this.image.width;
      height = this.image.height;
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      context = canvas.getContext('2d');
      context.drawImage(this.image, 0, 0);
      size = width * height;
      heightData = new Float32Array(size);
      pixels = context.getImageData(0, 0, width, height).data;
      pixelIndex = 0;
      for (i = _i = 0, _len = pixels.length, _step = 4; _i < _len; i = _i += _step) {
        pixel = pixels[i];
        all = pixel + pixels[i + 1] + pixels[i + 2];
        heightData[pixelIndex++] = all / 30;
      }
      return this.heightData = heightData;
    };

    return HeightMap;

  })(Milk);

  /*
  class window.Inventory
    constructor: ->
      @elem = $("#inventory")
      $("body").keydown(@keyDown)
      _this = @
      $('#inventory li').click (e) ->
        item = $(@).find("img").data("item")
        _this.toggleItem(item)
  
    toggle: ->
      @elem.toggle()
  
    toggleItem: (item) ->
      if !game.player.items[item]
        client.sendEquipUpdate(item, true)
      else
        client.sendEquipUpdate(item, false)
  
    keyDown: (e) =>
      if e.keyCode is 73
        @toggle()
  */


  Milk.KeyHandler = (function(_super) {
    var KEY_MAP;

    __extends(KeyHandler, _super);

    function KeyHandler() {
      return KeyHandler.__super__.constructor.apply(this, arguments);
    }

    KeyHandler.KEY_MAP = KEY_MAP = {
      'up': 38,
      'down': 40,
      'left': 37,
      'right': 39,
      'space': 32,
      'enter': 13,
      'escape': 27,
      'e': 69
    };

    KeyHandler.listen = function() {
      var _this = this;
      if (this.downListener) {
        return;
      }
      this.pressed = {};
      this.downListener = window.addEventListener('keydown', function(e) {
        _this.pressed[e.keyCode] = true;
        return e.stopPropagation();
      });
      return this.upListener = window.addEventListener('keyup', function(e) {
        _this.pressed[e.keyCode] = false;
        return e.stopPropagation();
      });
    };

    KeyHandler.isDown = function(keyName) {
      return this.pressed[KEY_MAP[keyName]];
    };

    return KeyHandler;

  })(Milk);

  Milk.Level = (function(_super) {

    __extends(Level, _super);

    function Level(options) {
      var aspect, far, fov, near;
      game.scene = new THREE.Scene;
      Level.__super__.constructor.apply(this, arguments);
      if (!(options != null ? options.bootstrap : void 0)) {
        return;
      }
      this.bootstrapped = true;
      fov = 50;
      aspect = window.innerWidth / window.innerHeight;
      near = 1;
      far = 100000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.sunLight = new THREE.DirectionalLight;
      this.pointLight = new THREE.PointLight(0x666666);
      this.ambientLight = new THREE.AmbientLight(0x222222);
      this.fog = new THREE.Fog(0x0, 1, 10000);
    }

    Level.prototype.stage = function() {
      if (!this.bootstrapped) {
        return;
      }
      this.scene.add(this.camera);
      this.scene.add(this.sunLight);
      this.scene.add(this.ambientLight);
      this.scene.add(this.pointLight);
      return this.scene.fog = this.fog;
    };

    Level.prototype.render = function(renderer) {
      if (!this.bootstrapped) {
        return;
      }
      return renderer.render(this.scene, this.camera);
    };

    return Level;

  })(Milk);

  /*
  class Moon extends THREE.Object3D
    constructor: ->
      super()
  
      img = new Image()
      img.onload = =>
  
        @height = img.height
        @width = img.width
        @numRows = @height - 1
        @numCols = @width - 1
  
        @cellWidth = (@numRows + 1) / @height
        @cellHeight = (@numCols + 1) / @width
        @geometry = new THREE.PlaneGeometry(@width, @height, @numRows, @numCols)
        @geometry.dynamic = true
  
        @heights = @getHeightData(img)
        for vertex in @geometry.vertices
          vertex.y = @heights[_i]
        @geometry.computeFaceNormals()
  
  
        planeTex = THREE.ImageUtils.loadTexture("public/dirt.jpg")
        planeTex.wrapS = planeTex.wrapT = THREE.RepeatWrapping
        planeTex.repeat.set( 10, 10 )
  
        @material = new THREE.MeshLambertMaterial(map: planeTex, shading: THREE.SmoothShading, specular: 0x0, ambient: 0xeeeeee, diffuse: 0x0, color: 0x555555, shininess: 32)
        @mesh = new THREE.Mesh(@geometry, @material)
        @add(@mesh)
  
      img.src = 'public/map.jpg'
  
    getHeight: (x, z) ->
      return 0 unless @heights
  
      x += @numCols * @cellWidth * 0.5
      z += @numRows * @cellHeight * 0.5
  
      gridX = x / @cellWidth
      gridZ = z / @cellHeight
  
      col0 = Math.floor(gridX)
      row0 = Math.floor(gridZ)
      col1 = col0 + 1
      row1 = row0 + 1
  
  
      # make sure that the cell coordinates don't fall
      # outside the height field.
      if col1 > @numCols
        col1 = 0
      if row1 > @numRows
        row1 = 0
  
      # get the four corner heights of the cell from the height field
      h00 = @heights[col0 + row0 * (@numCols + 1)]
      h01 = @heights[col1 + row0 * (@numCols + 1)]
      h11 = @heights[col1 + row1 * (@numCols + 1)]
      h10 = @heights[col0 + row1 * (@numCols + 1)]
  
      # calculate the position of the camera relative to the cell.
      # note, that 0 <= tx, ty <= 1.
      tx = gridX - col0
      ty = gridZ - row0
  
      # the next step is to perform a bilinear interpolation
      # to compute the height of the terrain directly below
      # the object.
      txty = tx * ty
  
      height = h00 * (1 - ty - tx + txty) + h01 * (tx - txty) + h11 * txty + h10 * (ty - txty)
      height
  
  
    getHeightData: (img) ->
      canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      context = canvas.getContext('2d')
  
      size = img.width * img.height
      data = new Float32Array(size)
  
      context.drawImage(img, 0, 0)
  
      imgd = context.getImageData(0, 0, img.width, img.height)
      pix = imgd.data
  
      j = 0
      for pic, i in pix by 4
        all = pic + pix[i + 1] + pix[i + 2]
        data[j++] = all / 30
  
      data
  */


  Milk.MoonLevel = (function(_super) {

    __extends(MoonLevel, _super);

    function MoonLevel() {
      this.receiveMessage = __bind(this.receiveMessage, this);

      this.receivePlayerUpdate = __bind(this.receivePlayerUpdate, this);

      this.removePlayer = __bind(this.removePlayer, this);

      this.addPlayer = __bind(this.addPlayer, this);

      var flareColor, geometry, material, texture, textureFlare0, textureFlare2, textureFlare3,
        _this = this;
      MoonLevel.__super__.constructor.call(this, {
        bootstrap: true
      });
      this.terrain = new Milk.MoonTerrain;
      this.skybox = new Milk.Skybox("public/skybox");
      if (!window.disableEnvironment) {
        geometry = new THREE.PlaneGeometry(256, 256, 1, 1);
        material = new THREE.MeshPhongMaterial({
          ambient: 0xffffff,
          diffuse: 0xffffff,
          specular: 0xff9900,
          shininess: 64
        });
        this.milk = new THREE.Mesh(geometry, material);
        this.milk.doubleSided = true;
        this.milk.position.y = 5;
        this.notReady();
        geometry = new THREE.SphereGeometry(50, 20, 20);
        texture = new THREE.ImageUtils.loadTexture("/public/earth.jpg", null, function() {
          return _this.ready();
        });
        material = new THREE.MeshLambertMaterial({
          map: texture,
          color: 0xeeeeee
        });
        this.earth = new THREE.Mesh(geometry, material);
        this.earth.position.y = 79;
        this.earth.position.z = 500;
        this.notReady();
        textureFlare0 = THREE.ImageUtils.loadTexture("/public/lensflare0.png", null, function() {
          return _this.ready();
        });
        this.notReady();
        textureFlare2 = THREE.ImageUtils.loadTexture("/public/lensflare2.png", null, function() {
          return _this.ready();
        });
        this.notReady();
        textureFlare3 = THREE.ImageUtils.loadTexture("/public/lensflare3.png", null, function() {
          return _this.ready();
        });
        flareColor = new THREE.Color(0xffffff);
        THREE.ColorUtils.adjustHSV(flareColor, 0, -0.5, 0.5);
        this.sun = new THREE.LensFlare(textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor);
        this.sun.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        this.sun.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        this.sun.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
        this.sun.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
        this.sun.position.y = 30;
        this.sun.position.z = -500;
      }
      this.score = new Milk.Score;
      this.players = {};
      this.player = new Milk.Alien(Milk.OverheadText, Milk.Animation, Milk.Movable, Milk.Controllable);
      game.client.observe('addPlayer', this.addPlayer);
      game.client.observe('removePlayer', this.removePlayer);
      game.client.observe('receivePlayerUpdate', this.receivePlayerUpdate);
      this.chat = new Milk.NetworkChat;
      this.chat.observe('receiveMessage', this.receiveMessage);
      this.chat.observe('willSendMessage', function(data) {
        return data.voice = _this.player.voice;
      });
      this.player.voice = {
        pitch: Math.random() * 100
      };
    }

    MoonLevel.prototype.stage = function() {
      MoonLevel.__super__.stage.apply(this, arguments);
      this.terrain.stage();
      this.skybox.stage();
      if (!window.disableEnvironment) {
        this.scene.add(this.milk);
        this.scene.add(this.earth);
        this.scene.add(this.sun);
      }
      this.player.stage();
      game.client.enablePlayerUpdates();
      this.chat.stage();
      return this.score.observe('change:milk', function(count) {
        return document.getElementById('milk-count').innerHTML = count;
      });
    };

    MoonLevel.prototype.update = function(delta) {
      var id, mapHeightAtCamera, player, target, _ref;
      this.chat.update(delta);
      this.player.update(delta);
      _ref = this.players;
      for (id in _ref) {
        player = _ref[id];
        player.update(delta);
      }
      target = this.player.object3D.position.clone().subSelf(this.player.direction().multiplyScalar(-this.player.followDistance));
      this.camera.position = this.camera.position.addSelf(target.subSelf(this.camera.position).multiplyScalar(0.1));
      mapHeightAtCamera = this.terrain.heightAtPosition(this.camera.position);
      if (mapHeightAtCamera > this.player.object3D.position.y - 2) {
        this.camera.position.y = mapHeightAtCamera + 2;
      }
      this.camera.lookAt(this.player.object3D.position);
      this.pointLight.position = this.player.object3D.position.clone();
      this.pointLight.position.y += 10;
      if (!window.disableEnvironment) {
        this.earth.rotation.y += 0.01;
        this.earth.rotation.x += 0.005;
        this.earth.rotation.z += 0.005;
      }
      return MoonLevel.__super__.update.apply(this, arguments);
    };

    MoonLevel.prototype.heightAtPosition = function(position) {
      return this.terrain.heightAtPosition(position);
    };

    MoonLevel.prototype.addPlayer = function(data) {
      var player,
        _this = this;
      player = new Milk.Alien(Milk.Movable, Milk.Animation, Milk.OverheadText);
      return player.afterReady(function() {
        _this.players[data.id] = player;
        player.stage();
        return _this.receivePlayerUpdate(data);
      });
    };

    MoonLevel.prototype.removePlayer = function(data) {
      var player;
      player = this.players[data.id];
      this.scene.remove(player.object3D);
      this.players[data.id] = null;
      return delete this.players[data.id];
    };

    MoonLevel.prototype.receivePlayerUpdate = function(data) {
      var _ref;
      return (_ref = this.players[data.id]) != null ? _ref.receiveNetworkUpdate(data) : void 0;
    };

    MoonLevel.prototype.receiveMessage = function(data) {
      var currentMessage, currentPlayer, message, player,
        _this = this;
      if (!(message = data.message)) {
        return;
      }
      if (message.indexOf('milk') !== -1) {
        this.score.increase('milk');
      }
      player = data.self ? this.player : this.players[data.id];
      if (data.voice) {
        player.voice = data.voice;
      }
      player.setText(message);
      player.stageText();
      if (player.speechTimeout) {
        clearTimeout(player.speechTimeout);
        player.speechTimeout = null;
      }
      if (this.currentSpeech) {
        currentPlayer = this.currentSpeech.player;
        currentMessage = this.currentSpeech.message;
        currentPlayer.speechTimeout = setTimeout((function() {
          return currentPlayer.clearText(currentMessage);
        }), 1000);
      }
      this.currentSpeech = {
        player: player,
        message: message
      };
      return speak.play(message, player.voice || {}, function() {
        _this.currentSpeech = null;
        return player.clearText(message);
      });
    };

    return MoonLevel;

  })(Milk.Level);

  Milk.MoonTerrain = (function(_super) {

    __extends(MoonTerrain, _super);

    function MoonTerrain() {
      var _this = this;
      MoonTerrain.__super__.constructor.apply(this, arguments);
      this.heightMap = new Milk.HeightMap("public/map.jpg");
      this.notReady();
      this.texture = THREE.ImageUtils.loadTexture("public/dirt.jpg", null, function() {
        return _this.ready();
      });
      this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
      this.texture.repeat.set(10, 10);
      this.material = new THREE.MeshLambertMaterial({
        map: this.texture,
        shading: THREE.SmoothShading,
        specular: 0x0,
        ambient: 0xeeeeee,
        diffuse: 0x0,
        color: 0x555555,
        shininess: 32
      });
    }

    MoonTerrain.prototype.stage = function() {
      var geo;
      geo = this.heightMap.stage();
      this.mesh = new THREE.Mesh(geo, this.material);
      return this.scene.add(this.mesh);
    };

    MoonTerrain.prototype.heightAtPosition = function(position) {
      return this.heightMap.heightAtPosition(position.x, position.z);
    };

    return MoonTerrain;

  })(Milk);

  Milk.NetworkChat = (function(_super) {

    __extends(NetworkChat, _super);

    function NetworkChat() {
      this.keyDown = __bind(this.keyDown, this);

      this.receiveMessage = __bind(this.receiveMessage, this);
      NetworkChat.__super__.constructor.apply(this, arguments);
      this.input = document.getElementById('chat');
      this.input.addEventListener('keydown', this.keyDown, false);
      game.client.observe('receiveMessage', this.receiveMessage);
    }

    NetworkChat.prototype.stage = function() {
      return Milk.KeyHandler.listen();
    };

    NetworkChat.prototype.update = function() {
      if (Milk.KeyHandler.isDown('enter')) {
        return this.showWindow();
      }
    };

    NetworkChat.prototype.showWindow = function() {
      this.input.value = '';
      this.input.style.display = 'block';
      return this.input.focus();
    };

    NetworkChat.prototype.hideWindow = function() {
      this.input.blur();
      return this.input.style.display = 'none';
    };

    NetworkChat.prototype.sendMessage = function() {
      var data, index, message, script, scriptName;
      message = this.input.value;
      if (!message) {
        return;
      }
      if (message[0] === '/') {
        scriptName = message.substr(1);
        if (index = scriptName.indexOf(' ') !== -1) {
          scriptName = scriptName.substr(0, index - 1);
        }
        script = Milk.Script[scriptName];
        if (script) {
          return new script;
        }
      }
      data = {
        message: message
      };
      this.fire('willSendMessage', data);
      if (message) {
        return now.sendMessage(data);
      }
    };

    NetworkChat.prototype.receiveMessage = function(data) {
      var date, li, ul,
        _this = this;
      if (!data.message) {
        return;
      }
      this.fire('receiveMessage', data);
      date = new Date();
      ul = document.getElementById('chat-log');
      li = document.createElement('li');
      li.innerText = li.textContent = "" + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()) + " - " + data.message;
      li.style.cursor = 'pointer';
      li.addEventListener('click', (function() {
        return _this.fire('receiveMessage', data);
      }), false);
      ul.appendChild(li);
      li = document.createElement('li');
      li.innerHTML = '&nbsp;';
      ul.appendChild(li);
      return li.scrollIntoView();
    };

    NetworkChat.prototype.keyDown = function(e) {
      e.stopPropagation();
      if (e.keyCode === Milk.KeyHandler.KEY_MAP.enter) {
        this.sendMessage();
        return this.hideWindow();
      } else if (e.keyCode === Milk.KeyHandler.KEY_MAP.escape) {
        return this.hideWindow();
      }
    };

    return NetworkChat;

  })(Milk);

  Milk.NetworkClient = (function(_super) {

    __extends(NetworkClient, _super);

    NetworkClient.UPDATE_INTERVAL = 30;

    function NetworkClient() {
      var addPlayer,
        _this = this;
      NetworkClient.__super__.constructor.apply(this, arguments);
      this.players = {};
      now.welcome = function(data) {
        var id, player, _ref, _results;
        console.log('MY ID IS', _this.id());
        if (data.players) {
          _ref = data.players;
          _results = [];
          for (id in _ref) {
            player = _ref[id];
            _results.push(addPlayer(player));
          }
          return _results;
        }
      };
      now.addPlayer = addPlayer = function(data) {
        if (data.id === _this.id()) {
          return;
        }
        _this.players[data.id] = data;
        return _this.fire('addPlayer', data);
      };
      now.removePlayer = function(data) {
        if (data.id === _this.id()) {
          throw "BAD THINGS";
        }
        _this.players[data.id] = null;
        delete _this.players[data.id];
        return _this.fire('removePlayer', data);
      };
      now.receivePlayerUpdate = function(data) {
        var key, player, value;
        if (data.id === _this.id()) {
          return;
        }
        player = _this.players[data.id];
        if (!player) {
          return;
        }
        for (key in data) {
          value = data[key];
          player[key] = value;
        }
        return _this.fire('receivePlayerUpdate', player);
      };
      now.receiveMessage = function(data) {
        if (data.id === _this.id()) {
          data.self = true;
        }
        return _this.fire('receiveMessage', data);
      };
    }

    NetworkClient.prototype.id = function() {
      return now.core.clientId;
    };

    NetworkClient.prototype.enablePlayerUpdates = function() {
      var _this = this;
      return this.playerUpdateInterval = setInterval(function() {
        var data;
        if (!now.sendPlayerUpdate) {
          return;
        }
        data = {};
        _this.fire('willSendPlayerUpdate', data);
        if (!data.cancel) {
          return now.sendPlayerUpdate(data);
        }
      }, Milk.NetworkClient.UPDATE_INTERVAL);
    };

    NetworkClient.prototype.disablePlayerUpdates = function() {
      if (!this.playerUpdateInterval) {
        return;
      }
      clearInterval(this.playerUpdateInterval);
      return this.playerUpdateInterval = null;
    };

    return NetworkClient;

  })(Milk);

  /*
  class Client
  	now = window.now
  	constructor: (@game) ->
  
  		now.updateInventory = (data) =>
  			player = @game.players[data.id]
  			if data.equipped
  				player.equipItem(data.item)
  			else
  				player.unequipItem(data.item)
  
  	sendUpdate: ->
  		player = @game.player
  		return unless player
  		now.sendUpdate
  			position: player.position
  			voicePitch: player.voicePitch
  			items: Object.keys(game.player.items)
  
  	sendEquipUpdate: (item, equipped) ->
  		now.sendEquipUpdate item, equipped
  */


  Milk.Score = (function(_super) {

    __extends(Score, _super);

    function Score() {
      Score.__super__.constructor.apply(this, arguments);
      this.counters = {};
    }

    Score.prototype.increase = function(counter, amount) {
      var _base;
      if (amount == null) {
        amount = 1;
      }
      (_base = this.counters)[counter] || (_base[counter] = 0);
      return this.fire("change:" + counter, this.counters[counter] += amount);
    };

    return Score;

  })(Milk);

  YouTube = (function(_super) {

    __extends(YouTube, _super);

    function YouTube() {
      console.log('YOUTUBE');
    }

    return YouTube;

  })(Milk.Script);

  Milk.Script.youtube = YouTube;

  Milk.Skybox = (function(_super) {

    __extends(Skybox, _super);

    function Skybox(filepath) {
      var shader, texture, urls,
        _this = this;
      Skybox.__super__.constructor.apply(this, arguments);
      urls = ["" + filepath + "/posx.png", "" + filepath + "/negx.png", "" + filepath + "/posy.png", "" + filepath + "/negy.png", "" + filepath + "/posz.png", "" + filepath + "/negz.png"];
      this.notReady();
      texture = THREE.ImageUtils.loadTextureCube(urls, null, function() {
        if (texture.image.loadCount === 6) {
          return _this.ready();
        }
      });
      shader = THREE.ShaderUtils.lib.cube;
      shader.uniforms.tCube.texture = texture;
      this.material = new THREE.ShaderMaterial({
        uniforms: shader.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        depthWrite: false
      });
    }

    Skybox.prototype.width = 10000;

    Skybox.prototype.height = 10000;

    Skybox.prototype.depth = 10000;

    Skybox.prototype.stage = function() {
      var geo;
      geo = new THREE.CubeGeometry(this.width, this.height, this.depth, 1, 1, 1, null, true);
      this.mesh = new THREE.Mesh(geo, this.material);
      this.mesh.flipSided = true;
      return this.scene.add(this.mesh);
    };

    return Skybox;

  })(Milk);

  Milk.Sprite = (function(_super) {
    var SCALE_FACTOR;

    __extends(Sprite, _super);

    SCALE_FACTOR = 0.0001;

    function Sprite(filename, callback) {
      var _this = this;
      this.filename = filename;
      Sprite.__super__.constructor.apply(this, arguments);
      this.notReady();
      this.texture = THREE.ImageUtils.loadTexture(this.filename, null, function() {
        _this.mesh = new THREE.Sprite({
          map: _this.texture,
          size: SCALE_FACTOR,
          useScreenCoordinates: false,
          color: 0xffffff
        });
        _this.mesh.scale.x = _this.texture.image.width * SCALE_FACTOR;
        _this.mesh.scale.y = _this.texture.image.height * SCALE_FACTOR;
        _this.exportObject(_this.mesh);
        if (callback != null) {
          callback.call(_this);
        }
        return _this.ready();
      });
    }

    return Sprite;

  })(Milk);

  Milk.Text = (function(_super) {
    var DEFAULT_OPTIONS;

    __extends(Text, _super);

    DEFAULT_OPTIONS = {
      size: 42,
      height: 64,
      curveSegments: 4,
      font: "helvetiker",
      weight: "normal",
      style: "normal",
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bend: true,
      material: 0,
      extrudeMaterial: 1
    };

    function Text() {
      Text.__super__.constructor.apply(this, arguments);
      this.value = '';
      this.options = Milk.mixin({}, DEFAULT_OPTIONS);
      this.faceMaterial = new THREE.MeshFaceMaterial;
      this.frontMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
      });
      this.sideMaterial = new THREE.MeshBasicMaterial({
        color: 0xbbbbbb,
        shading: THREE.SmoothShading
      });
      this.scale = 0.015;
    }

    Text.prototype.stage = function() {
      var geo, mesh;
      Text.__super__.stage.apply(this, arguments);
      geo = new THREE.TextGeometry(this.value, this.options);
      geo.materials = [this.frontMaterial, this.sideMaterial];
      geo.computeBoundingBox();
      geo.computeVertexNormals();
      this.midX = geo.boundingBox.max.x * this.scale / 2;
      mesh = new THREE.Mesh(geo, this.faceMaterial);
      mesh.scale = new THREE.Vector3(this.scale, this.scale, this.scale);
      this.exportObject(mesh);
      return this.scene.add(mesh);
    };

    Text.prototype.unstage = function() {
      return this.scene.remove(this.object3D);
    };

    return Text;

  })(Milk);

  Milk.OverheadText = (function(_super) {

    __extends(OverheadText, _super);

    function OverheadText() {
      return OverheadText.__super__.constructor.apply(this, arguments);
    }

    OverheadText.prototype.setText = function(string) {
      this.clearText();
      this.text = new Milk.Text;
      return this.text.value = string;
    };

    OverheadText.prototype.stageText = function() {
      return this.text.stage();
    };

    OverheadText.prototype.update = function() {
      var position;
      if (!this.text) {
        return;
      }
      position = this.text.object3D.position;
      position.x = this.object3D.position.x;
      position.y = this.object3D.position.y + 1.5;
      position.z = this.object3D.position.z;
      this.text.object3D.lookAt(game.level.camera.position);
      return this.text.object3D.translateX(-this.text.midX);
    };

    OverheadText.prototype.clearText = function(string) {
      var _ref;
      if (!this.text || ((string != null) && ((_ref = this.text) != null ? _ref.value : void 0) !== string)) {
        return;
      }
      this.text.unstage();
      return this.text = null;
    };

    return OverheadText;

  })(Milk.Component);

  /*
  
  class window.Vehicle extends Player
  	enterTextShown: false
  	hasEntered: false
  	followDistance: 12
  
  	canEnter: ->
  		(!@hasEntered) and game.player.position.distanceToSquared(@position) < 75
  
  	enter: (player) ->
  		if not @backgroundAudio
  			@backgroundAudio = audio = document.createElement 'audio'
  			source = document.createElement 'source'
  			source.src = '/public/doctorwho.mp3'
  			audio.appendChild source
  			source = document.createElement 'source'
  			source.src = '/public/doctorwho.ogg'
  			audio.appendChild source
  			audio.autoplay = true
  			document.body.appendChild audio
  		else
  			@backgroundAudio.play()
  
  		game.remove @enterText
  		@hasEntered = true
  
  		player.parent.remove player
  		player.position.x = player.position.y = player.position.z = 0
  		@add player
  
  		return this
  
  	exit: (player) ->
  		@hasEntered = false
  		@backgroundAudio.pause()
  
  		@remove player
  		player.position.x = @position.x + 5
  		player.position.y = @position.y
  		player.position.z = @position.z + 5
  		game.add player
  
  		console.log @position.y
  
  	jump: ->
  		if not @wooshAudio
  			@wooshAudio = audio = document.createElement 'audio'
  			source = document.createElement 'source'
  			source.src = '/public/tardis.mp3'
  			audio.appendChild source
  			document.body.appendChild audio
  
  		super
  
  	update: (delta) ->
  		if @hasEntered
  			@wooshAudio?[if @jumping then 'play' else 'pause']()
  			super
  
  		else if @canEnter()
  			if @enterTextShown
  				@enterText.positionOver this
  			else
  				@enterTextShown = true
  				game.add @enterText
  		else
  			if @enterTextShown
  				@enterTextShown = false
  				game.remove @enterText
  
  class Vehicle.Tardis extends Vehicle
  	constructor: ->
  		super
  
  		geometry = new THREE.CubeGeometry(3, 5, 3)
  		material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture("/public/tardisFront.jpg")})
  		mesh = new THREE.Mesh(geometry, material)
  		@add mesh
  
  		geometry.computeBoundingBox()
  		@boundingBox = geometry.boundingBox
  
  		@enterText = new TextObject 'press e to enter the tardis'
  */


}