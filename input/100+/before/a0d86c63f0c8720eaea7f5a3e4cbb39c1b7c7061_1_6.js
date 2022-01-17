function() {
  var $game, $last_active, $main_menu, $menus, $pause_menu, B2AABB, B2Body, B2BodyDef, B2CircleShape, B2DebugDraw, B2DistanceJointDef, B2Fixture, B2FixtureDef, B2MassData, B2MouseJointDef, B2PolygonShape, B2RevoluteJointDef, B2Vec2, B2WeldJointDef, B2World, GameViewModel, load_level;

  $menus = $('#menus');

  $game = $('#game');

  $pause_menu = $('#pause-menu');

  $main_menu = $('#main-menu');

  GameViewModel = function() {
    var self;
    self = this;
    self.debug = ko.observable(true);
    self.tool = ko.observable("MOVE");
    self.last_tool = ko.observable("MOVE");
    self.state = ko.observable("BUILD");
    self.isPaused = ko.computed(function() {
      return self.state() === 'PAUSE';
    });
    self.isPlaying = ko.computed(function() {
      return self.state() === 'PLAY';
    });
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
    window.physics.start_game();
    load_level("test");
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
    if (window.viewModel.state() === "BUILD") {
      return window.viewModel.state("PLAY");
    } else {
      return window.viewModel.state("BUILD");
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
    load_level("test");
    return window.backwards_to($main_menu);
  });

  $('#toolbox li').click(function() {
    window.viewModel.last_tool(window.viewModel.tool());
    return window.viewModel.tool($(this).data('tool'));
  });

  window.select_last_tool = function() {
    var tmp_tool;
    tmp_tool = window.viewModel.tool();
    window.viewModel.tool(window.viewModel.last_tool());
    return window.viewModel.last_tool(tmp_tool);
  };

  /* -------------------------------------------- 
       Begin tutorial.coffee 
  --------------------------------------------
  */


  window.start_tutorial = function() {
    return window.start_game(1);
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

  window.physics = {
    canvasPosition: {
      "x": 0,
      "y": 0
    },
    world: new B2World(new B2Vec2(0, 10), true),
    init: function() {
      var debugDraw;
      debugDraw = new B2DebugDraw();
      debugDraw.SetSprite(window.game.debug_canvas.getContext("2d"));
      debugDraw.SetDrawScale(30);
      debugDraw.SetFillAlpha(0.3);
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(B2DebugDraw.e_shapeBit || B2DebugDraw.e_jointBit);
      return window.physics.world.SetDebugDraw(debugDraw);
    },
    start_game: function() {
      return window.physics.refresh_canvas_position();
    },
    refresh_canvas_position: function() {
      return window.physics.canvasPosition = window.game.$canvas.offset();
    },
    update: function() {
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
      return window.physics.world.ClearForces();
    },
    create_fixture_def: function(entity) {
      var fixDef, vector, vectors, _i, _len, _ref;
      fixDef = new B2FixtureDef();
      fixDef.density = entity.density;
      fixDef.friction = entity.friction;
      fixDef.restitution = entity.restitution;
      if (entity.shape.type === "circle") {
        fixDef.shape = new B2CircleShape(entity.shape.size);
      } else if (entity.shape.type === "rectangle") {
        fixDef.shape = new B2PolygonShape();
        fixDef.shape.SetAsBox(entity.shape.size.width, entity.shape.size.height);
      } else if (entity.shape.type === "polygon") {
        fixDef.shape = new B2PolygonShape();
        vectors = [];
        _ref = entity.shape.vectors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vector = _ref[_i];
          vectors.push(new B2Vec2(vector.x, vector.y));
        }
        fixDef.shape.SetAsArray(vectors);
      }
      return fixDef;
    },
    create_entity: function(entity, type) {
      var body, bodyDef, created_entity, fixDef;
      bodyDef = new B2BodyDef();
      if (type === "static") {
        bodyDef.type = B2Body.b2_staticBody;
      } else {
        bodyDef.type = B2Body.b2_dynamicBody;
      }
      bodyDef.position.Set(entity.x, entity.y);
      if ('angle' in entity) {
        bodyDef.angle = entity.angle;
      }
      fixDef = window.physics.create_fixture_def(entity);
      body = window.physics.world.CreateBody(bodyDef);
      created_entity = body.CreateFixture(fixDef);
      window.game.entities.push(created_entity);
      if ('id' in entity) {
        return window.game.entityIDs[entity.id] = created_entity;
      }
    },
    create_joint: function(joint) {
      var j;
      if (joint.type === 'revolute') {
        j = new B2RevoluteJointDef();
      } else if (joint.type === 'distance') {
        j = new B2DistanceJointDef();
      } else if (joint.type === 'weld') {
        j = new B2WeldJointDef();
      }
      j.bodyA = window.game.entityIDs[joint.bodyA].GetBody();
      j.bodyB = window.game.entityIDs[joint.bodyB].GetBody();
      if ("localAnchorA" in joint) {
        j.localAnchorA.Set(joint.localAnchorA.x, joint.localAnchorA.y);
      }
      if ("motor" in joint) {
        if (joint.motor.enabled) {
          j.enableMotor = true;
          j.maxMotorTorque = 55;
          j.motorSpeed = -10;
        }
      }
      j = window.physics.world.CreateJoint(j);
      return window.game.joints.push(j);
    }
  };

  /* -------------------------------------------- 
       Begin game.coffee 
  --------------------------------------------
  */


  /*global Box2D:false, $:false, Stage:false, Ticker:false
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

  window.game = {
    tools: {
      _: ""
    },
    FPS: 60,
    $canvas: $('#gameCanvas'),
    canvas: $('#gameCanvas')[0],
    debug_canvas: $('#debugCanvas')[0],
    entities: [],
    entityIDs: {},
    stage: new Stage(window.game.canvas),
    init: function() {
      window.physics.init();
      window.game.stage.update();
      Ticker.setFPS(window.game.FPS);
      return Ticker.addListener(this);
    },
    state_changed: function(state) {
      if (state === 'BUILD') {
        return window.game.reset();
      } else if (state === 'PLAY') {
        return window.game.play();
      }
    },
    load_state: function(state, save_as_default) {
      var entity, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (save_as_default) {
        window.game.default_state = state;
        window.game.build_state = state;
      }
      if (state.dynamic) {
        _ref = state.dynamic;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          window.physics.create_entity(entity, "dynamic");
        }
      }
      if (state["static"]) {
        _ref1 = state["static"];
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          entity = _ref1[_j];
          _results.push(window.physics.create_entity(entity, "static"));
        }
        return _results;
      }
    },
    get_state: function() {
      var body, entity, fixtures, position, shape, state, vector, _i, _len, _ref;
      state = {
        "dynamic": [],
        "static": []
      };
      _ref = window.game.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        body = entity.GetBody();
        position = body.GetPosition();
        fixtures = body.GetFixtureList();
        shape = fixtures.GetShape();
        entity = {
          "x": position.x,
          "y": position.y,
          "density": fixtures.GetDensity(),
          "friction": fixtures.GetFriction(),
          "restitution": fixtures.GetRestitution(),
          "angle": body.GetAngle(),
          "shape": {
            "type": "rectangle"
          }
        };
        if (shape.GetType() === 1) {
          entity.shape.type = 'polygon';
          entity.shape.vectors = [];
          for (vector in shape.m_vertices) {
            entity.shape.vectors.push({
              "x": shape.m_vertices[vector].x,
              "y": shape.m_vertices[vector].y
            });
          }
        } else if (shape.GetType() === 0) {
          entity.shape.type = 'circle';
          entity.shape.size = shape.m_radius;
        }
        if (body.GetType() === B2Body.b2_staticBody) {
          state["static"].push(entity);
        } else {
          state.dynamic.push(entity);
        }
      }
      return state;
    },
    play: function() {
      return window.game.build_state = window.game.get_state();
    },
    reset: function() {
      var entity, _i, _len, _ref;
      _ref = window.game.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        window.physics.world.DestroyBody(entity.GetBody());
      }
      window.game.entities = [];
      return window.game.load_state(window.game.build_state);
    },
    reset_level: function() {
      var entity, _i, _len, _ref;
      _ref = window.game.entities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        window.physics.world.DestroyBody(entity.GetBody());
      }
      window.game.entities = [];
      return window.game.load_state(window.game.default_state);
    },
    tick: function() {
      window.game.tools[window.viewModel.tool()].update();
      window.physics.update();
      return window.game.stage.update();
    },
    mouse_down: function(e) {
      return window.game.tools[window.viewModel.tool()].mouse_down(e);
    },
    mouse_up: function(e) {
      return window.game.tools[window.viewModel.tool()].mouse_up(e);
    },
    mouse_move: function(e) {
      return window.game.tools[window.viewModel.tool()].mouse_move(e);
    }
  };

  $(document).mousedown(window.game.mouse_down);

  $(document).mouseup(window.game.mouse_up);

  window.game.init();

  window.viewModel.state.subscribe(window.game.state_changed);

  /* -------------------------------------------- 
       Begin move.coffee 
  --------------------------------------------
  */


  window.game.tools.MOVE = {
    is_mouse_down: false,
    mouseX: false,
    mouseY: false,
    mouse_joint: false,
    mouse_down: function(e) {
      if (e.clientX > window.physics.canvasPosition.left && e.clientY > window.physics.canvasPosition.top && e.clientX < window.physics.canvasPosition.left + 660 && e.clientY < window.physics.canvasPosition.top + 570) {
        window.game.tools.MOVE.is_mouse_down = true;
        window.game.mouse_move(e);
        window.game.tools.MOVE.selected_body = window.game.tools.MOVE.get_body_at_mouse();
        return $(document).bind('mousemove', window.game.mouse_move);
      }
    },
    mouse_up: function(e) {
      return window.game.tools.MOVE.is_mouse_down = false;
    },
    mouse_move: function(e) {
      window.game.tools.MOVE.mouseX = (e.clientX - window.physics.canvasPosition.left) / 30;
      return window.game.tools.MOVE.mouseY = (e.clientY - window.physics.canvasPosition.top) / 30;
    },
    update: function() {
      var body, md;
      if (window.game.tools.MOVE.is_mouse_down && !window.game.tools.MOVE.mouse_joint) {
        body = window.game.tools.MOVE.get_body_at_mouse();
        if (body) {
          md = new B2MouseJointDef();
          md.bodyA = window.physics.world.GetGroundBody();
          md.bodyB = body;
          md.target.Set(window.game.tools.MOVE.mouseX, window.game.tools.MOVE.mouseY);
          md.collideConnected = true;
          md.maxForce = 300.0 * body.GetMass();
          window.game.tools.MOVE.mouse_joint = window.physics.world.CreateJoint(md);
          body.SetAwake(true);
        }
      }
      if (window.game.tools.MOVE.mouse_joint) {
        if (window.game.tools.MOVE.is_mouse_down) {
          return window.game.tools.MOVE.mouse_joint.SetTarget(new B2Vec2(window.game.tools.MOVE.mouseX, window.game.tools.MOVE.mouseY));
        } else {
          window.physics.world.DestroyJoint(window.game.tools.MOVE.mouse_joint);
          return window.game.tools.MOVE.mouse_joint = null;
        }
      }
    },
    get_body_at_mouse: function() {
      var aabb;
      window.game.tools.MOVE.mousePVec = new B2Vec2(window.game.tools.MOVE.mouseX, window.game.tools.MOVE.mouseY);
      aabb = new B2AABB();
      aabb.lowerBound.Set(window.game.tools.MOVE.mouseX - 0.1, window.game.tools.MOVE.mouseY - 0.1);
      aabb.upperBound.Set(window.game.tools.MOVE.mouseX + 0.1, window.game.tools.MOVE.mouseY + 0.1);
      window.game.tools.MOVE.selected_body = null;
      window.physics.world.QueryAABB(window.game.tools.MOVE.get_body_cb, aabb);
      return window.game.tools.MOVE.selected_body;
    },
    get_body_cb: function(fixture) {
      var position;
      if (fixture.GetBody().GetType() !== B2Body.b2_staticBody) {
        if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), window.game.tools.MOVE.mousePVec)) {
          window.game.tools.MOVE.selected_body = fixture.GetBody();
          position = window.game.tools.MOVE.selected_body.GetPosition();
          window.game.tools.MOVE.selected_body_offset = {
            "x": position.x - window.game.tools.MOVE.mouseX,
            "y": position.y - window.game.tools.MOVE.mouseY
          };
          return false;
        }
      }
      return true;
    }
  };

  /* -------------------------------------------- 
       Begin glue.coffee 
  --------------------------------------------
  */


  window.game.tools.GLUE = {
    mouse_down: function(e) {},
    mouse_up: function(e) {},
    mouse_move: function(e) {},
    update: function() {}
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
    return window.start_tutorial();
  });

}