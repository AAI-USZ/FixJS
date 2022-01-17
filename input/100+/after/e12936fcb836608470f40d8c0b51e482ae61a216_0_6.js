function() {
  var Board, GrassSimulation, GrassSimulationView, Random, Simulation, chance_doer, extend, fixed_cycle_spawner, include, linear_mover, random_mover, spawn_at_age, spawner,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  extend = function() {
    var k, mixin, mixins, obj, v, _i, _len;
    obj = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = mixins.length; _i < _len; _i++) {
      mixin = mixins[_i];
      for (k in mixin) {
        v = mixin[k];
        obj[k] = v;
      }
    }
    return obj;
  };

  include = function() {
    var klass, mixin, mixins, _i, _len, _results;
    klass = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    _results = [];
    for (_i = 0, _len = mixins.length; _i < _len; _i++) {
      mixin = mixins[_i];
      _results.push(extend(klass.prototype, mixin));
    }
    return _results;
  };

  Random = (function() {

    Random.name = 'Random';

    function Random() {}

    Random.prototype.int = function(min, max) {
      if (min == null) {
        min = 0;
      }
      if (max == null) {
        max = 100;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    Random.prototype.chance = function(chance) {
      return Math.random() < chance;
    };

    Random.prototype.bool = function() {
      return this.chance(0.5);
    };

    Random.prototype.sign = function() {
      if (this.bool()) {
        return 1;
      } else {
        return -1;
      }
    };

    return Random;

  })();

  Board = (function() {

    Board.name = 'Board';

    function Board(width, height) {
      this.width = width;
      this.height = height;
    }

    Board.prototype.max_point = function() {
      return [this.width - 1, this.height - 1];
    };

    Board.prototype.random_point = function() {
      var max;
      max = this.max_point();
      return [Random.prototype.int(0, max[0]), Random.prototype.int(0, max[1])];
    };

    Board.prototype.bounds_near = function(location, radius) {
      var max, rx_max, rx_min, ry_max, ry_min;
      rx_min = location[0] - radius;
      ry_min = location[1] - radius;
      if (rx_min < 0) {
        rx_min = 0;
      }
      if (ry_min < 0) {
        ry_min = 0;
      }
      max = this.max_point();
      rx_max = location[0] + radius;
      ry_max = location[1] + radius;
      if (rx_max > max[0]) {
        rx_max = max[0];
      }
      if (ry_max > max[1]) {
        ry_max = max[1];
      }
      return [rx_min, rx_max, ry_min, ry_max];
    };

    Board.prototype.random_point_near = function(location, radius) {
      var bounds;
      bounds = this.bounds_near(location, radius);
      return [Random.prototype.int(bounds[0], bounds[1]), Random.prototype.int(bounds[2], bounds[3])];
    };

    return Board;

  })();

  Simulation = (function() {

    Simulation.name = 'Simulation';

    function Simulation(opts) {
      var default_config;
      default_config = {
        rate: 1,
        max_days: 250,
        board: {
          width: 300,
          height: 300
        }
      };
      this.config = extend({}, default_config, opts);
      this.day = 0;
      this.interval_id = null;
      this.board = new Board(this.config.board.width, this.config.board.height);
    }

    Simulation.prototype.start = function() {
      var cb,
        _this = this;
      cb = function() {
        if (_this.day >= _this.config.max_days) {
          _this.stop();
          return $(_this).trigger('end');
        } else {
          $(_this).trigger('pre-tick');
          _this.tick();
          return $(_this).trigger('post-tick');
        }
      };
      cb();
      return this.interval_id = setInterval(cb, 1000 / this.config.rate);
    };

    Simulation.prototype.stop = function() {
      clearInterval(this.interval_id);
      return this.interval_id = null;
    };

    Simulation.prototype.running = function() {
      return this.interval_id != null;
    };

    Simulation.prototype.toggle = function() {
      if (this.running()) {
        return this.stop();
      } else {
        return this.start();
      }
    };

    Simulation.prototype.tick = function() {
      return this.day += 1;
    };

    return Simulation;

  })();

  spawner = function(klass, board, min_age, max_made, max_made_per_spawn, max_radius) {
    var remaining;
    remaining = max_made;
    return function() {
      var i, m, possible, r, _results;
      if (this.age < min_age) {
        return [];
      }
      possible = Math.min(max_made_per_spawn, remaining);
      i = Random.prototype.int(1, possible);
      _results = [];
      while (remaining > 0 && i > 0) {
        remaining -= 1;
        i -= 1;
        r = Random.prototype.int(1, max_radius);
        m = new klass;
        m.location = board.random_point_near(this.location, r);
        _results.push(m);
      }
      return _results;
    };
  };

  fixed_cycle_spawner = function(klass, board, min_age, cycle, count, max_radius) {
    return function() {
      var i, m, r, _i, _results;
      if (this.age < min_age || this.age % cycle !== 0) {
        return [];
      }
      _results = [];
      for (i = _i = 0; 0 <= count ? _i <= count : _i >= count; i = 0 <= count ? ++_i : --_i) {
        r = Random.prototype.int(1, max_radius);
        m = new klass;
        m.location = board.random_point_near(this.location, r);
        _results.push(m);
      }
      return _results;
    };
  };

  spawn_at_age = function(klass, board, age, count, radius) {
    return function() {
      var i, m, r, _i, _results;
      if (this.age !== age) {
        return [];
      }
      _results = [];
      for (i = _i = 0; 0 <= count ? _i <= count : _i >= count; i = 0 <= count ? ++_i : --_i) {
        r = Random.prototype.int(1, radius);
        m = new klass;
        m.location = board.random_point_near(this.location, r);
        _results.push(m);
      }
      return _results;
    };
  };

  random_mover = function(board, direction_change_chance, max_radius) {
    return function() {
      var r;
      r = Random.prototype.int(1, max_radius);
      return this.location = board.random_point_near(this.location, r);
    };
  };

  linear_mover = function(board, distance) {
    var dx, dy;
    dx = distance * Random.prototype.sign();
    dy = distance * Random.prototype.sign();
    return function() {
      this.location[0] += dx;
      return this.location[1] += dy;
    };
  };

  chance_doer = function(chance, func) {
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (Random.prototype.chance(chance)) {
        return func.apply(this, args);
      }
    };
  };

  GrassSimulation = (function(_super) {

    __extends(GrassSimulation, _super);

    GrassSimulation.name = 'GrassSimulation';

    function GrassSimulation(opts) {
      var Base, Elk, Grass, b, default_config, e, g, i, s;
      default_config = {
        rate: 4,
        elk: {
          initial_count: 20,
          move_radius: 1,
          move_chance: 0.5
        },
        grass: {
          initial_count: 500,
          max_age: 30,
          spawn: {
            min_age: 20,
            chance: 0.2,
            cycle: 5,
            max_made: 25,
            max_made_per_spawn: 5,
            max_radius: 20
          },
          disease: {
            chance: 0.0005
          }
        }
      };
      GrassSimulation.__super__.constructor.call(this, extend({}, default_config, opts));
      b = this.board;
      Base = (function() {

        Base.name = 'Base';

        function Base() {
          this.age = 0;
          this.location = b.random_point();
          this.diseased = false;
        }

        return Base;

      })();
      s = this.config.grass.spawn;
      Grass = (function(_super1) {

        __extends(Grass, _super1);

        Grass.name = 'Grass';

        function Grass() {
          Grass.__super__.constructor.call(this);
          this.spawn = chance_doer(s.chance, spawn_at_age(Grass, b, s.min_age, s.max_made_per_spawn, s.max_radius));
        }

        return Grass;

      })(Base);
      this.grasses = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.config.grass.initial_count; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          g = new Grass;
          g.age = Random.prototype.int(1, this.config.grass.max_age);
          _results.push(g);
        }
        return _results;
      }).call(this);
      e = this.config.elk;
      Elk = (function(_super1) {

        __extends(Elk, _super1);

        Elk.name = 'Elk';

        function Elk() {
          Elk.__super__.constructor.call(this);
          this.move = chance_doer(e.move_chance, linear_mover(b, e.move_radius));
        }

        return Elk;

      })(Base);
      this.elk = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.config.elk.initial_count; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(new Elk);
        }
        return _results;
      }).call(this);
    }

    GrassSimulation.prototype.tick = function() {
      var elk, grass, next_grasses, _i, _j, _len, _len1, _ref, _ref1, _results;
      GrassSimulation.__super__.tick.call(this);
      next_grasses = [];
      _ref = this.grasses;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        grass = _ref[_i];
        grass.age += 1;
        if (grass.age <= this.config.grass.max_age) {
          grass.diseased = grass.diseased || Random.prototype.chance(this.config.grass.disease.chance);
          next_grasses.push(grass);
          next_grasses.push.apply(next_grasses, grass.spawn());
        }
      }
      this.grasses = next_grasses;
      _ref1 = this.elk;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        elk = _ref1[_j];
        _results.push(elk.move());
      }
      return _results;
    };

    return GrassSimulation;

  })(Simulation);

  GrassSimulationView = (function() {

    GrassSimulationView.name = 'GrassSimulationView';

    function GrassSimulationView(sim, canvas, playback) {
      var _this = this;
      this.sim = sim;
      this.canvas = canvas;
      this.playback = playback;
      this.canvas.attr('width', this.sim.board.width);
      this.canvas.attr('height', this.sim.board.height);
      this.ctx = this.canvas[0].getContext('2d');
      $(this.sim).bind('post-tick', function() {
        var elk, grass, _i, _j, _len, _len1, _ref, _ref1;
        _this.ctx.clearRect(0, 0, _this.sim.board.width, _this.sim.board.height);
        _this.ctx.save();
        _ref = _this.sim.grasses;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          grass = _ref[_i];
          _this.ctx.fillStyle = grass.diseased ? 'red' : 'green';
          _this.ctx.fillRect(grass.location[0], grass.location[1], 2, 2);
        }
        _ref1 = _this.sim.elk;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          elk = _ref1[_j];
          _this.ctx.fillStyle = 'blue';
          _this.ctx.fillRect(elk.location[0], elk.location[1], 4, 4);
        }
        _this.ctx.restore();
        return _this.playback.find('#day').text(_this.sim.day);
      });
      this.playback.find('#start-stop').click(function() {
        return _this.sim.toggle();
      });
    }

    return GrassSimulationView;

  })();

  this.GrassSimulation = GrassSimulation;

  this.GrassSimulationView = GrassSimulationView;

}