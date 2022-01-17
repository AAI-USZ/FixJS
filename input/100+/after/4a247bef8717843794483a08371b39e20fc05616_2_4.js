function() {
  var $game, $last_active, $main_menu, $menus, $pause_menu, B2AABB, B2Body, B2BodyDef, B2CircleShape, B2ContactListener, B2DebugDraw, B2DistanceJointDef, B2Fixture, B2FixtureDef, B2MassData, B2MouseJointDef, B2PolygonShape, B2RevoluteJointDef, B2Vec2, B2WeldJointDef, B2World, FORCE_PER_METER, GameViewModel, MAX_DISTANCE, MAX_FORCE, count, i, images, load_level, preload, _i, _len,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $menus = $('#menus');

  $game = $('#game');

  $pause_menu = $('#pause-menu');

  $main_menu = $('#main-menu');

  GameViewModel = function() {
    var self;
    self = this;
    self.debug = ko.observable(true);
    self.level = ko.observable(1);
    self.tool = ko.observable("MOVE");
    self.last_tool = ko.observable("MOVE");
    self.state = ko.observable("BUILD");
    self.isPaused = ko.computed(function() {
      return self.state() === 'PAUSE';
    });
    self.isPlaying = ko.computed(function() {
      return self.state() === 'PLAY';
    });
    self.allowed_tools = ko.observableArray();
    self.replay_mode = ko.observable(false);
    self.replay_name = ko.observable(false);
    self.build_state = ko.observable(null);
    self.build_state_string = ko.computed(function() {
      return JSON.stringify(self.build_state());
    });
    self.name = ko.observable();
    self.balls_complete = ko.observable(0);
    self.balls_needed = ko.observable(0);
  };

  window.viewModel = new GameViewModel();

  ko.applyBindings(window.viewModel);

  load_level = function(level_name) {
    return $.getJSON('/levels/' + level_name, function(data) {
      window.game.load_state(data, true);
      window.viewModel.state("BUILD");
      return window.game.reset();
    });
  };

  window.start_game = function() {
    window.game.start_game();
    load_level("level" + window.viewModel.level());
  };

  window.level_complete = function() {
    if (window.replay) {
      window.forward_to($('#replay-complete-menu'));
    } else {
      window.forward_to($('#level-complete-menu'));
    }
    $menus.fadeIn();
    window.viewModel.state("COMPLETE");
    return false;
  };

  $('.pause').click(function() {
    window.forward_to($pause_menu);
    $menus.fadeIn();
    window.viewModel.last_state = window.viewModel.state();
    window.viewModel.state("PAUSE");
    return false;
  });

  $('.resume').click(function() {
    $menus.fadeOut();
    window.viewModel.state(window.viewModel.last_state);
    return false;
  });

  $('.start').click(function() {
    $('canvas').css('opacity', '100');
    if (window.viewModel.state() === "BUILD") {
      return window.viewModel.state("PLAY");
    } else {
      if (window.viewModel.replay_mode()) {
        window.viewModel.state("BUILD");
        window.game.load_state(window.replay.state);
        return window.viewModel.state("PLAY");
      } else {
        return window.viewModel.state("BUILD");
      }
    }
  });

  $('.confirm-exit-game').click(function() {
    window.viewModel.state("BUILD");
    $game.fadeOut();
    return window.backwards_to($main_menu);
  });

  $('.confirm-restart-level').click(function() {
    window.viewModel.state("BUILD");
    $menus.fadeOut();
    load_level(window.viewModel.level());
    return window.backwards_to($main_menu);
  });

  $('.watch-replay').click(function() {
    $('#replay-form').submit();
    window.backwards_to($('#level-complete-menu'));
    return false;
  });

  $('.watch-replay-again').click(function() {
    $menus.fadeOut();
    window.game.load_state(window.replay.state);
    return window.viewModel.state("PLAY");
  });

  $('.next-level').click(function() {
    window.viewModel.level(window.viewModel.level() + 1);
    load_level("level" + window.viewModel.level());
    return $menus.fadeOut();
  });

  $('#toolbox li').live('click', function() {
    window.viewModel.last_tool(window.viewModel.tool());
    return window.viewModel.tool($(this).attr('rel'));
  });

  $(window).resize(function() {
    return window.game.refresh_canvas_position();
  });

  window.select_last_tool = function() {
    var tmp_tool;
    tmp_tool = window.viewModel.tool();
    window.viewModel.tool(window.viewModel.last_tool());
    return window.viewModel.last_tool(tmp_tool);
  };

  /* -------------------------------------------- 
       Begin physics.coffee 
  --------------------------------------------
  */


  /*global Box2D:false, $:false
  */


  B2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

  B2Vec2 = Box2D.Common.Math.b2Vec2;

  B2AABB = Box2D.Collision.b2AABB;

  B2BodyDef = Box2D.Dynamics.b2BodyDef;

  B2Body = Box2D.Dynamics.b2Body;

  B2FixtureDef = Box2D.Dynamics.b2FixtureDef;

  B2Fixture = Box2D.Dynamics.b2Fixture;

  B2World = Box2D.Dynamics.b2World;

  B2MassData = Box2D.Collision.Shapes.b2MassData;

  B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

  B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

  B2DebugDraw = Box2D.Dynamics.b2DebugDraw;

  B2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

  B2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;

  B2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;

  B2ContactListener = Box2D.Dynamics.b2ContactListener;

  window.physics = {
    world: new B2World(new B2Vec2(0, 10), true),
    entities_to_delete: [],
    begin_contact: function(contact) {
      var bodyA, bodyB, component, entityA, entityB, manifold, _i, _j, _len, _len1, _ref, _ref1, _results;
      bodyA = contact.GetFixtureA().GetBody();
      bodyB = contact.GetFixtureB().GetBody();
      entityA = window.game.entityIDs[bodyA.userData];
      entityB = window.game.entityIDs[bodyB.userData];
      manifold = contact.GetManifold();
      entityA.touching[entityB.id] = {
        "manifold": manifold
      };
      entityB.touching[entityA.id] = {
        "manifold": manifold
      };
      _ref = entityA.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if ("begin_contact" in window.game.components[component]) {
          window.game.components[component].begin_contact(entityA, entityB);
        }
      }
      _ref1 = entityB.components;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        component = _ref1[_j];
        if ("begin_contact" in window.game.components[component]) {
          _results.push(window.game.components[component].begin_contact(entityB, entityA));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    end_contact: function(contact) {
      var bodyA, bodyB, component, entityA, entityB, _i, _j, _len, _len1, _ref, _ref1;
      bodyA = contact.GetFixtureA().GetBody();
      bodyB = contact.GetFixtureB().GetBody();
      entityA = window.game.entityIDs[bodyA.userData];
      entityB = window.game.entityIDs[bodyB.userData];
      _ref = entityA.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if ("end_contact" in window.game.components[component]) {
          window.game.components[component].end_contact(entityA, entityB);
        }
      }
      _ref1 = entityB.components;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        component = _ref1[_j];
        if ("end_contact" in window.game.components[component]) {
          window.game.components[component].end_contact(entityB, entityA);
        }
      }
      delete entityA.touching[entityB.id];
      return delete entityB.touching[entityA.id];
    },
    pre_solve: function(contact) {
      var bodyA, bodyB, component, entityA, entityB, _i, _j, _len, _len1, _ref, _ref1, _results;
      bodyA = contact.GetFixtureA().GetBody();
      bodyB = contact.GetFixtureB().GetBody();
      entityA = window.game.entityIDs[bodyA.userData];
      entityB = window.game.entityIDs[bodyB.userData];
      _ref = entityA.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if ("pre_solve" in window.game.components[component]) {
          window.game.components[component].pre_solve(entityA, entityB, contact);
        }
      }
      _ref1 = entityB.components;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        component = _ref1[_j];
        if ("pre_solve" in window.game.components[component]) {
          _results.push(window.game.components[component].pre_solve(entityB, entityA, contact));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    init: function() {
      var debugDraw;
      window.physics.contact_listener = new B2ContactListener();
      window.physics.contact_listener.BeginContact = window.physics.begin_contact;
      window.physics.contact_listener.EndContact = window.physics.end_contact;
      window.physics.contact_listener.PreSolve = window.physics.pre_solve;
      window.physics.world.SetContactListener(window.physics.contact_listener);
      debugDraw = new B2DebugDraw();
      debugDraw.SetSprite(window.game.debug_canvas.getContext("2d"));
      debugDraw.SetDrawScale(30);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(B2DebugDraw.e_shapeBit || B2DebugDraw.e_jointBit);
      return window.physics.world.SetDebugDraw(debugDraw);
    },
    start_game: function() {},
    update: function() {
      var entity, fixture, _i, _j, _len, _len1, _ref, _ref1;
      if (window.viewModel.state() === 'PAUSE') {
        if (window.viewModel.debug()) {
          window.physics.world.DrawDebugData();
        }
        return;
      }
      window.physics.world.Step(1 / window.game.FPS, 10, 10);
      if (window.viewModel.debug()) {
        window.physics.world.DrawDebugData();
      }
      window.physics.world.ClearForces();
      _ref = window.physics.entities_to_delete;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        _ref1 = entity.fixtures;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          fixture = _ref1[_j];
          window.physics.world.DestroyBody(fixture.GetBody());
        }
      }
      return window.physics.entities_to_delete = [];
    },
    create_fixture_def: function(entity, body) {
      var fixDef, vector, vectors, _i, _len, _ref;
      fixDef = new B2FixtureDef();
      if ("density" in body) {
        fixDef.density = body.density;
      }
      if ("friction" in body) {
        fixDef.friction = body.friction;
      }
      if ("restitution" in body) {
        fixDef.restitution = body.restitution;
      }
      if (body.shape.type === "circle") {
        if (!('size' in body.shape)) {
          body.shape.size = (entity.bitmaps[0].image.width * entity.bitmaps[0].scaleX) / (window.game.scale * 2);
        }
        fixDef.shape = new B2CircleShape(body.shape.size);
      } else if (body.shape.type === "rectangle") {
        fixDef.shape = new B2PolygonShape();
        if (!('size' in body.shape)) {
          body.shape.size = {
            width: (entity.bitmaps[0].image.width * entity.bitmaps[0].scaleX) / (window.game.scale * 2),
            height: (entity.bitmaps[0].image.height * entity.bitmaps[0].scaleY) / (window.game.scale * 2)
          };
        }
        fixDef.shape.SetAsBox(body.shape.size.width, body.shape.size.height);
      } else if (body.shape.type === "polygon") {
        fixDef.shape = new B2PolygonShape();
        vectors = [];
        _ref = body.shape.vectors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vector = _ref[_i];
          vectors.push(new B2Vec2(vector.x, vector.y));
        }
        fixDef.shape.SetAsArray(vectors);
      }
      return fixDef;
    },
    add_entity: function(entity) {
      var body, bodyDef, fixDef, fixDefs;
      bodyDef = new B2BodyDef();
      if (entity.fixed) {
        bodyDef.type = B2Body.b2_staticBody;
      } else {
        bodyDef.type = B2Body.b2_dynamicBody;
      }
      bodyDef.position.Set(entity.x, entity.y);
      if ('angle' in entity) {
        bodyDef.angle = entity.angle;
      }
      fixDefs = (function() {
        var _i, _len, _ref, _results;
        _ref = entity.bodies;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          body = _ref[_i];
          _results.push(window.physics.create_fixture_def(entity, body));
        }
        return _results;
      })();
      body = window.physics.world.CreateBody(bodyDef);
      body.userData = entity.id;
      return entity.fixtures = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = fixDefs.length; _i < _len; _i++) {
          fixDef = fixDefs[_i];
          _results.push(body.CreateFixture(fixDef));
        }
        return _results;
      })();
    },
    remove_entity: function(entity, now) {
      var fixture, _i, _len, _ref, _results;
      if (now) {
        _ref = entity.fixtures;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fixture = _ref[_i];
          _results.push(window.physics.world.DestroyBody(fixture.GetBody()));
        }
        return _results;
      } else {
        return window.physics.entities_to_delete.push(entity);
      }
    }
  };

  /* -------------------------------------------- 
       Begin game.coffee 
  --------------------------------------------
  */


  /*global Box2D:false, $:false, Stage:false, Ticker:false, Bitmap:false, Graphics:false, Shape:false
  */


  B2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

  B2Vec2 = Box2D.Common.Math.b2Vec2;

  B2AABB = Box2D.Collision.b2AABB;

  B2BodyDef = Box2D.Dynamics.b2BodyDef;

  B2Body = Box2D.Dynamics.b2Body;

  B2FixtureDef = Box2D.Dynamics.b2FixtureDef;

  B2Fixture = Box2D.Dynamics.b2Fixture;

  B2World = Box2D.Dynamics.b2World;

  B2MassData = Box2D.Collision.Shapes.b2MassData;

  B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

  B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

  B2DebugDraw = Box2D.Dynamics.b2DebugDraw;

  B2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

  B2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;

  B2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;

  count = 0;

  window.game = {
    tools: {
      _: ""
    },
    bitmaps: {
      glue: new Bitmap("/img/glue.png"),
      magnet_beam: new Bitmap("/img/magnet-beam.png")
    },
    FPS: 60,
    scale: 30,
    $canvas: $('#gameCanvas'),
    canvas: $('#gameCanvas')[0],
    $debug_canvas: $('#debugCanvas'),
    debug_canvas: $('#debugCanvas')[0],
    canvas_position: {
      "x": 0,
      "y": 0
    },
    canvas_width: 700,
    canvas_height: 600,
    entities: [],
    entityIDs: {},
    walls: [],
    next_id: 1,
    stage: new Stage($('#gameCanvas')[0]),
    last_state: "BUILD",
    last_selected_tool: "MOVE",
    init: function() {
      window.physics.init();
      window.game.stage.update();
      Ticker.setFPS(window.game.FPS);
      return Ticker.addListener(this);
    },
    start_game: function() {
      window.game.refresh_canvas_position();
      return window.physics.start_game();
    },
    refresh_canvas_position: function() {
      return window.game.canvas_position = window.game.$canvas.offset();
    },
    state_changed: function(state) {
      if (state === 'BUILD') {
        if (window.game.last_state !== "PAUSE") {
          window.game.reset();
        }
      } else if (state === 'PLAY') {
        if (window.game.last_state !== "PAUSE") {
          window.game.play();
        }
      }
      return window.game.last_state = state;
    },
    tool_changed: function(new_tool) {
      if ('deselect' in window.game.tools[window.game.last_selected_tool]) {
        window.game.tools[window.game.last_selected_tool].deselect();
      }
      if ('select' in window.game.tools[new_tool]) {
        window.game.tools[new_tool].select();
      }
      return window.game.last_selected_tool = new_tool;
    },
    create_entity: function(entity) {
      var bitmap, component, scale, scale_adjustment, _i, _len, _ref;
      entity = $.extend(true, {}, window.game.entity_base, window.game.entity_types[entity.type], entity);
      if ("init" in entity && !("initialised" in entity)) {
        entity.init(entity);
        entity.initialised = true;
      }
      if (!entity.id) {
        entity.id = 'entity_' + (window.game.next_id++);
      }
      if (!('bitmaps' in entity)) {
        entity.bitmaps = [];
      }
      if (!('touching' in entity)) {
        entity.touching = {};
      }
      if ('image' in entity) {
        bitmap = new Bitmap("/img/" + entity.image);
        bitmap.regX = bitmap.image.width * 0.5;
        bitmap.regY = bitmap.image.height * 0.5;
        if ("scale" in entity) {
          scale = 1;
          if ("scale" in entity) {
            scale = entity.scale;
          }
          scale_adjustment = 1;
          if ("scale_adjustment" in entity) {
            scale_adjustment = entity.scale_adjustment;
          }
          bitmap.scaleX = scale * scale_adjustment;
          bitmap.scaleY = scale * scale_adjustment;
        }
        entity.bitmaps.push(bitmap);
        window.game.stage.addChild(bitmap);
      }
      window.game.entities.push(entity);
      window.game.entityIDs[entity.id] = entity;
      _ref = entity.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        window.game.components[component].init(entity);
      }
      return window.physics.add_entity(entity);
    },
    create_wall: function(wall) {
      if (wall === "bottom") {
        return window.game.create_entity({
          "type": "xwall",
          "x": 11.5,
          "y": 20
        });
      } else if (wall === "top") {
        return window.game.create_entity({
          "type": "xwall",
          "x": 11.5,
          "y": -0
        });
      } else if (wall === "left") {
        return window.game.create_entity({
          "type": "ywall",
          "x": -0,
          "y": 10
        });
      } else if (wall === "right") {
        return window.game.create_entity({
          "type": "ywall",
          "x": 23.2,
          "y": 10
        });
      }
    },
    load_state: function(state, save_as_default) {
      var entity, tool, wall, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      window.game.clear_entities();
      if (save_as_default) {
        window.game.default_state = state;
        window.viewModel.build_state(state);
      }
      if (state.entities) {
        _ref = state.entities;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          window.game.create_entity(entity);
        }
      }
      window.game.settings = state.settings;
      window.viewModel.allowed_tools.removeAll();
      _ref1 = window.game.settings.tools;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        tool = _ref1[_j];
        window.viewModel.allowed_tools.push(tool);
      }
      window.viewModel.balls_needed(window.game.settings.balls_needed);
      if (!("seed" in window.game.settings)) {
        window.game.settings.seed = Math.random();
      }
      Math.seedrandom(window.game.settings.seed);
      window.game.walls = state.walls;
      _ref2 = window.game.walls;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        wall = _ref2[_k];
        _results.push(window.game.create_wall(wall));
      }
      return _results;
    },
    clean_entity: function(entity) {
      var component, position, _i, _len, _ref;
      entity = $.extend(true, {}, entity);
      if (entity.fixtures.length > 0) {
        position = entity.fixtures[0].GetBody().GetPosition();
        entity.x = position.x;
        entity.y = position.y;
        entity.angle = entity.fixtures[0].GetBody().GetAngle();
      }
      delete entity.bitmaps;
      delete entity.touching;
      delete entity.fixtures;
      delete entity.init;
      _ref = entity.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if ('clean' in window.game.components[component]) {
          window.game.components[component].clean(entity);
        }
      }
      return entity;
    },
    get_state: function() {
      var entity, state;
      state = {
        "walls": [],
        "settings": window.game.settings
      };
      state.entities = (function() {
        var _i, _len, _ref, _results;
        _ref = window.game.entities;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          _results.push(window.game.clean_entity(entity));
        }
        return _results;
      })();
      return state;
    },
    play: function() {
      window.viewModel.balls_complete(0);
      return window.viewModel.build_state(window.game.get_state());
    },
    remove_entity: function(entity, now) {
      var bitmap, _i, _len, _ref;
      if ("bitmaps" in entity) {
        _ref = entity.bitmaps;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bitmap = _ref[_i];
          window.game.stage.removeChild(bitmap);
        }
      }
      return window.physics.remove_entity(entity, now);
    },
    clear_entities: function() {
      var entity, _i, _len, _ref;
      _ref = window.game.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        window.game.remove_entity(entity, true);
      }
      window.game.entities = [];
      return window.game.entityIDs = [];
    },
    reset: function() {
      return window.game.load_state(window.viewModel.build_state());
    },
    reset_level: function() {
      return window.game.load_state(window.game.default_state);
    },
    meters_to_pixels: function(meters) {
      return meters * window.game.scale;
    },
    pixels_to_meters: function(pixels) {
      return pixels / window.game.scale;
    },
    degrees_to_radians: function(degrees) {
      return degrees * 0.0174532925199432957;
    },
    radians_to_degrees: function(radians) {
      return radians * 57.295779513082320876;
    },
    update_position: function(entity) {
      var bitmap, position, _i, _len, _ref, _results;
      if ("bitmaps" in entity && entity.fixtures.length > 0) {
        position = entity.fixtures[0].GetBody().GetPosition();
        _ref = entity.bitmaps;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bitmap = _ref[_i];
          bitmap.x = window.game.meters_to_pixels(position.x);
          bitmap.y = window.game.meters_to_pixels(position.y);
          _results.push(bitmap.rotation = window.game.radians_to_degrees(entity.fixtures[0].GetBody().GetAngle()));
        }
        return _results;
      }
    },
    update_positions: function() {
      var entity, _i, _len, _ref, _results;
      _ref = window.game.entities;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        _results.push(window.game.update_position(entity));
      }
      return _results;
    },
    tick: function() {
      var component, entity, _i, _j, _len, _len1, _ref, _ref1;
      window.game.tools[window.viewModel.tool()].update();
      _ref = window.game.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        _ref1 = entity.components;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          component = _ref1[_j];
          window.game.components[component].update(entity);
        }
      }
      window.physics.update();
      window.game.update_positions();
      window.game.stage.update();
      if (window.viewModel.state() === "PLAY" && window.viewModel.balls_complete() >= window.viewModel.balls_needed()) {
        return window.level_complete();
      }
    },
    mouse_down: function(e) {
      if (window.viewModel.state() === 'BUILD') {
        window.game.mouse_down = true;
        if ('mouse_down' in window.game.tools[window.viewModel.tool()]) {
          return window.game.tools[window.viewModel.tool()].mouse_down(e);
        }
      }
    },
    mouse_up: function(e) {
      if (window.viewModel.state() === 'BUILD') {
        window.game.mouse_down = false;
        if ('mouse_up' in window.game.tools[window.viewModel.tool()]) {
          return window.game.tools[window.viewModel.tool()].mouse_up(e);
        }
      }
    },
    mouse_move: function(e) {
      if (window.viewModel.state() === 'BUILD') {
        window.game.mouseX = e.offsetX / window.game.scale;
        window.game.mouseY = e.offsetY / window.game.scale;
        if ('mouse_move' in window.game.tools[window.viewModel.tool()]) {
          return window.game.tools[window.viewModel.tool()].mouse_move(e);
        }
      }
    },
    get_entity_at_mouse: function() {
      var aabb, get_body_cb, mousePVec, selected_body;
      mousePVec = new B2Vec2(window.game.mouseX, window.game.mouseY);
      aabb = new B2AABB();
      aabb.lowerBound.Set(window.game.mouseX - 0.1, window.game.mouseY - 0.1);
      aabb.upperBound.Set(window.game.mouseX + 0.1, window.game.mouseY + 0.1);
      selected_body = null;
      get_body_cb = function(fixture) {
        if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
          selected_body = fixture.GetBody();
          return false;
        }
        return true;
      };
      window.physics.world.QueryAABB(get_body_cb, aabb);
      if (selected_body) {
        return window.game.entityIDs[selected_body.userData];
      }
    },
    get_entity_by_fixture: function(fixture) {
      return window.game.entityIDs[fixture.GetBody().userData];
    },
    get_offset_to_mouse: function(entity) {
      var body, mouse_position, position, rotated_position;
      body = entity.fixtures[0].GetBody();
      position = body.GetPosition();
      mouse_position = {
        "x": window.game.mouseX,
        "y": window.game.mouseY
      };
      rotated_position = window.game.rotate_point(mouse_position, position, 0 - body.GetAngle());
      return {
        "x": position.x - rotated_position.x,
        "y": position.y - rotated_position.y
      };
    },
    rotate_point: function(point, origin, angle) {
      var c, s, xnew, ynew;
      s = Math.sin(angle);
      c = Math.cos(angle);
      point.x -= origin.x;
      point.y -= origin.y;
      xnew = point.x * c - point.y * s;
      ynew = point.x * s + point.y * c;
      point.x = xnew + origin.x;
      point.y = ynew + origin.y;
      return point;
    }
  };

  window.game.$debug_canvas.mousedown(window.game.mouse_down);

  window.game.$debug_canvas.mouseup(window.game.mouse_up);

  window.game.$debug_canvas.mousemove(window.game.mouse_move);

  window.game.$canvas.mousedown(window.game.mouse_down);

  window.game.$canvas.mouseup(window.game.mouse_up);

  window.game.$canvas.mousemove(window.game.mouse_move);

  window.game.init();

  window.viewModel.state.subscribe(window.game.state_changed);

  window.viewModel.tool.subscribe(window.game.tool_changed);

  /* -------------------------------------------- 
       Begin tools.coffee 
  --------------------------------------------
  */


  /* -------------------------------------------- 
       Begin move.coffee 
  --------------------------------------------
  */


  window.game.tools.MOVE = {
    mouse_joint: false,
    update: function() {
      var body, entity, md;
      if (window.game.mouse_down && !window.game.tools.MOVE.mouse_joint) {
        entity = window.game.get_entity_at_mouse();
        if (entity) {
          body = entity.fixtures[0].GetBody();
          md = new B2MouseJointDef();
          md.bodyA = window.physics.world.GetGroundBody();
          md.bodyB = body;
          md.target.Set(window.game.mouseX, window.game.mouseY);
          md.collideConnected = true;
          md.maxForce = 300.0 * body.GetMass();
          window.game.tools.MOVE.mouse_joint = window.physics.world.CreateJoint(md);
          body.SetAwake(true);
        }
      }
      if (window.game.tools.MOVE.mouse_joint) {
        if (window.game.mouse_down) {
          return window.game.tools.MOVE.mouse_joint.SetTarget(new B2Vec2(window.game.mouseX, window.game.mouseY));
        } else {
          window.physics.world.DestroyJoint(window.game.tools.MOVE.mouse_joint);
          return window.game.tools.MOVE.mouse_joint = null;
        }
      }
    }
  };

  /* -------------------------------------------- 
       Begin glue.coffee 
  --------------------------------------------
  */


  window.game.tools.GLUE = {
    mouse_is_down: false,
    select: function() {},
    deselect: function() {},
    mouse_down: function(e) {
      return window.game.tools.GLUE.mouse_is_down = true;
    },
    mouse_up: function(e) {
      return window.game.tools.GLUE.mouse_is_down = false;
    },
    update: function() {
      var entity, offset;
      if (window.game.tools.GLUE.mouse_is_down) {
        entity = window.game.get_entity_at_mouse();
        if (entity) {
          offset = window.game.get_offset_to_mouse(entity);
          return entity.add_glue(offset);
        }
      }
    }
  };

  /* -------------------------------------------- 
       Begin clean.coffee 
  --------------------------------------------
  */


  window.game.tools.CLEAN = {
    update: function() {
      var entity, offset;
      if (window.game.mouse_down) {
        entity = window.game.get_entity_at_mouse();
        if (entity) {
          offset = window.game.get_offset_to_mouse(entity);
          return entity.clean_glue(offset);
        }
      }
    }
  };

  /* -------------------------------------------- 
       Begin entities.coffee 
  --------------------------------------------
  */


  window.game.entity_types = {};

  window.game.entity_base = {
    scale: 1,
    components: [],
    bitmaps: [],
    fixtures: [],
    tags: []
  };

  /* -------------------------------------------- 
       Begin ball.coffee 
  --------------------------------------------
  */


  window.game.entity_types.ball = {
    name: "Ball",
    image: "ball.png",
    width_scale: 1,
    height_scale: 1,
    scale_adjustment: 0.5,
    bodies: [
      {
        density: 40,
        friction: 2,
        restitution: 0.4,
        shape: {
          type: "circle",
          size: 1
        }
      }
    ],
    init: function(entity) {
      return entity.tags.push("ball");
    }
  };

  /* -------------------------------------------- 
       Begin metal-ball.coffee 
  --------------------------------------------
  */


  window.game.entity_types['metal-ball'] = {
    name: "Metal Ball",
    image: "metal-ball.png",
    width_scale: 1,
    height_scale: 1,
    scale_adjustment: 0.5,
    bodies: [
      {
        density: 70,
        friction: 2,
        restitution: 0.2,
        shape: {
          type: "circle",
          size: 1
        }
      }
    ],
    init: function(entity) {
      return entity.tags.push("magnetic");
    }
  };

  /* -------------------------------------------- 
       Begin wheel.coffee 
  --------------------------------------------
  */


  window.game.entity_types.wheel = {
    name: "Wheel",
    image: "wheel.png",
    bodies: [
      {
        density: 40,
        friction: 2,
        restitution: 0.2,
        shape: {
          type: "circle"
        }
      }
    ]
  };

  /* -------------------------------------------- 
       Begin box.coffee 
  --------------------------------------------
  */


  window.game.entity_types.box = {
    name: "Box",
    image: "box.png",
    scale_adjustment: 1,
    bodies: [
      {
        density: 40,
        friction: 2,
        restitution: 0.2,
        shape: {
          type: "rectangle"
        }
      }
    ]
  };

  /* -------------------------------------------- 
       Begin conveyor-belt.coffee 
  --------------------------------------------
  */


  window.game.entity_types["conveyor-belt"] = {
    name: "Conveyor Belt",
    image: "conveyor-belt.png",
    scale_adjustment: 1,
    bodies: [
      {
        density: 40,
        friction: 2,
        restitution: 0.2,
        shape: {
          type: "rectangle"
        }
      }
    ],
    init: function(entity) {
      return entity.components.push('conveyor-belt');
    }
  };

  /* -------------------------------------------- 
       Begin magnet.coffee 
  --------------------------------------------
  */


  window.game.entity_types.magnet = {
    name: "Magnet",
    image: "magnet.png",
    scale_adjustment: 1,
    bodies: [
      {
        density: 90,
        friction: 2,
        restitution: 0,
        shape: {
          type: "polygon",
          vectors: [
            {
              "x": -1.1,
              "y": -1.1
            }, {
              "x": 0,
              "y": -1.4
            }, {
              "x": 1.4,
              "y": -1.1
            }, {
              "x": 1.4,
              "y": 1.1
            }, {
              "x": 0,
              "y": 1.4
            }, {
              "x": -1.1,
              "y": 1.1
            }, {
              "x": -1.4,
              "y": 0
            }
          ]
        }
      }
    ],
    init: function(entity) {
      return entity.components.push('magnetized');
    }
  };

  /* -------------------------------------------- 
       Begin plank.coffee 
  --------------------------------------------
  */


  window.game.entity_types.plank = {
    name: "Plank",
    image: "plank.png",
    scale_adjustment: 0.5,
    bodies: [
      {
        density: 40,
        friction: 2,
        restitution: 0.1,
        shape: {
          type: "rectangle"
        }
      }
    ]
  };

  /* -------------------------------------------- 
       Begin dropper.coffee 
  --------------------------------------------
  */


  window.game.entity_types.enter_dropper = {
    name: "Ball Dropper",
    fixed: true,
    bodies: [
      {
        shape: {
          type: "rectangle",
          size: {
            width: 0.1,
            height: 0.1
          }
        }
      }
    ],
    init: function(entity) {
      return entity.components.push('enter_dropper');
    }
  };

  /* -------------------------------------------- 
       Begin exit.coffee 
  --------------------------------------------
  */


  window.game.entity_types.exit = {
    name: "Box",
    fixed: true,
    bodies: [
      {
        density: 40,
        friction: 2,
        restitution: 0.2,
        shape: {
          type: "rectangle",
          size: {
            width: 1,
            height: 1
          }
        }
      }
    ],
    init: function(entity) {
      return entity.components.push('exit');
    }
  };

  /* -------------------------------------------- 
       Begin walls.coffee 
  --------------------------------------------
  */


  window.game.entity_types.xwall = {
    name: "Wall",
    fixed: true,
    bodies: [
      {
        shape: {
          type: "rectangle",
          size: {
            width: 11.5,
            height: 0.1
          }
        }
      }
    ]
  };

  window.game.entity_types.ywall = {
    name: "Wall",
    fixed: true,
    bodies: [
      {
        shape: {
          type: "rectangle",
          size: {
            width: 0.1,
            height: 10
          }
        }
      }
    ]
  };

  /* -------------------------------------------- 
       Begin lines.coffee 
  --------------------------------------------
  */


  window.game.entity_types.xline = {
    name: "Line",
    image: "xline.png",
    fixed: true,
    bodies: [
      {
        shape: {
          type: "rectangle"
        }
      }
    ]
  };

  window.game.entity_types.yline = {
    name: "Line",
    image: "yline.png",
    fixed: true,
    bodies: [
      {
        shape: {
          type: "rectangle"
        }
      }
    ]
  };

  /* -------------------------------------------- 
       Begin components.coffee 
  --------------------------------------------
  */


  window.game.components = {};

  /* -------------------------------------------- 
       Begin enter_dropper.coffee 
  --------------------------------------------
  */


  /*global Box2D:false, $:false, Math:false
  */


  window.game.components.enter_dropper = {
    init: function(entity) {
      entity.balls_created = 0;
      if (!("ball_order" in entity)) {
        entity.ball_order = ['ball', 'metal-ball'];
      }
      entity.ball_order_pointer = 0;
      if (!("ball_creation_interval" in entity)) {
        entity.ball_creation_interval = 120;
      }
      entity.last_ball_created = entity.ball_creation_interval - 50;
    },
    update: function(entity) {
      var ball_entity, position, x, y;
      if (window.viewModel.state() === 'PLAY') {
        if (entity.balls_created < entity.maximum_balls) {
          entity.last_ball_created += 1;
          if (entity.last_ball_created > entity.ball_creation_interval) {
            entity.last_ball_created = 0;
            entity.balls_created += 1;
            position = entity.fixtures[0].GetBody().GetPosition();
            x = position.x + (Math.random() * 0.2) - 0.1;
            y = position.y + 1;
            ball_entity = {
              "type": entity.ball_order[entity.ball_order_pointer++],
              "x": x,
              "y": y
            };
            window.game.create_entity(ball_entity);
            if (entity.ball_order_pointer >= entity.ball_order.length) {
              return entity.ball_order_pointer = 0;
            }
          }
        }
      }
    }
  };

  /* -------------------------------------------- 
       Begin exit.coffee 
  --------------------------------------------
  */


  window.game.components.exit = {
    init: function(entity) {},
    update: function(entity) {},
    begin_contact: function(entity, other_entity) {
      if (__indexOf.call(other_entity.tags, "ball") >= 0) {
        window.game.remove_entity(other_entity);
        return window.viewModel.balls_complete(window.viewModel.balls_complete() + 1);
      }
    }
  };

  /* -------------------------------------------- 
       Begin magnetized.coffee 
  --------------------------------------------
  */


  MAX_FORCE = 2500;

  MAX_DISTANCE = window.game.pixels_to_meters(500);

  FORCE_PER_METER = MAX_FORCE / MAX_DISTANCE;

  window.game.components.magnetized = {
    init: function(entity) {},
    update: function(entity) {
      var body, e, e_position, position, xspeed, yspeed, _i, _len, _ref, _results;
      if (entity.fixtures.length > 0) {
        position = entity.fixtures[0].GetBody().GetPosition();
        _ref = window.game.entities;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (__indexOf.call(e.tags, 'magnetic') >= 0) {
            body = e.fixtures[0].GetBody();
            e_position = body.GetPosition();
            if (Math.abs(position.x - e_position.x) > MAX_DISTANCE || Math.abs(position.y - e_position.y) > MAX_DISTANCE) {
              continue;
            }
            xspeed = (MAX_DISTANCE - Math.abs(position.x - e_position.x)) * FORCE_PER_METER;
            yspeed = (MAX_DISTANCE - Math.abs(position.y - e_position.y)) * FORCE_PER_METER;
            if (e_position.x > position.x) {
              xspeed = 0 - xspeed;
            }
            if (e_position.y > position.y) {
              yspeed = 0 - yspeed;
            }
            _results.push(body.ApplyForce(new B2Vec2(xspeed, yspeed), body.GetWorldCenter()));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    play: function(entity) {},
    reset: function(entity) {}
  };

  /* -------------------------------------------- 
       Begin conveyor-belt.coffee 
  --------------------------------------------
  */


  /*global Box2D:false, $:false, Math:false
  */


  window.game.components["conveyor-belt"] = {
    init: function(entity) {},
    update: function(entity) {}
  };

  /* -------------------------------------------- 
       Begin menu.coffee 
  --------------------------------------------
  */


  $menus = $('#menus');

  $game = $('#game');

  $last_active = $('.overlay-window.active');

  window.forward_to = function($element) {
    $last_active = $('.overlay-window.active');
    if ($last_active.attr('id') === $element.attr('id')) {
      return;
    }
    if ($element.prevAll('.overlay-window.active').length === 0) {
      $menus.css({
        'left': '+=600px'
      });
    }
    $last_active.after($element).removeClass('active');
    $element.addClass('active');
    return $menus.animate({
      "left": "-=600px"
    });
  };

  window.backwards_to = function($element) {
    $last_active = $('.overlay-window.active');
    if ($last_active.attr('id') === $element.attr('id')) {
      return;
    }
    if ($element.prevAll('.overlay-window.active').length > 0) {
      $menus.css({
        'left': '-=600px'
      });
    }
    $last_active.before($element).removeClass('active');
    $element.addClass('active');
    return $menus.animate({
      "left": "+=600px"
    });
  };

  window.show_menu = function(menu_target) {
    var $menu_target;
    if (menu_target === 'previous') {
      window.backwards_to($last_active);
      return;
    }
    $menu_target = $(menu_target);
    return window.forward_to($menu_target);
  };

  $('li[data-menu]').click(function() {
    var $this, menu_target;
    $this = $(this);
    menu_target = $this.data('menu');
    return window.show_menu(menu_target);
  });

  $('.start-tutorial').click(function() {
    $menus.fadeOut();
    $game.fadeIn();
    return window.start_game();
  });

  /* -------------------------------------------- 
       Begin preload.coffee 
  --------------------------------------------
  */


  preload = function(filename) {
    var image;
    image = new Image();
    image.src = filename;
    return image.onload = function() {
      var i, _i, _ref;
      for (i = _i = 0, _ref = images.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (images[i] === filename) {
          images.splice(i, 1);
          if (images.length === 0) {
            window.forward_to($('#main-menu'));
          }
          return;
        }
      }
    };
  };

  images = ["/img/ball.png", "/img/metal-ball.png", "/img/wheel.png", "/img/plank.png", "/img/box.png", "/img/conveyor-belt.png", "/img/magnet.png", "/img/magnet-beam.png", "/img/dry-glue.png", "/img/enter_dropper.png", "/img/exit_box.png", "/img/glue.png", "/img/out.png", "/img/in.png", "/img/xline.png", "/img/yline.png"];

  for (_i = 0, _len = images.length; _i < _len; _i++) {
    i = images[_i];
    preload(i);
  }

}