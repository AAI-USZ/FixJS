function Grass() {
          Grass.__super__.constructor.call(this);
          this.spawn = chance_doer(s.chance, spawn_at_age(Grass, b, s.min_age, s.max_made_per_spawn, s.max_radius));
        }