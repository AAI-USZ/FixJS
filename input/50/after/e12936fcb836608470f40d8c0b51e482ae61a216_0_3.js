function Elk() {
          Elk.__super__.constructor.call(this);
          this.move = chance_doer(e.move_chance, linear_mover(b, e.move_radius));
        }