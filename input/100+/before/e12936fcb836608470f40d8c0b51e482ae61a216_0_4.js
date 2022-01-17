function GrassSimulation(opts) {
      var Base, Elk, Grass, b, default_config, e, g, i, s;
      default_config = {
        rate: 1000,
        max_days: 500,
        board: {
          width: 300,
          height: 300
        },
        elk: {
          initial_count: 20,
          move_radius: 1,
          move_chance: 0.5
        },
        grass: {
          initial_count: 500,
          max_age: 50,
          spawn: {
            min_age: 25,
            chance: 0.01,
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
          this.spawn = chance_doer(spawner(Grass, b, s.min_age, s.max_made, s.max_made_per_spawn, s.max_radius));
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
          this.move = chance_doer(linear_mover(b, e.move_radius), e.move_chance);
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