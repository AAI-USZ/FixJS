function Elk() {
          Elk.__super__.constructor.call(this);
          this.move = chance_doer(linear_mover(b, e.move_radius), e.move_chance);
        }