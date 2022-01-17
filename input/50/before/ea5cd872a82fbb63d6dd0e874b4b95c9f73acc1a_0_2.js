function () {
          var o = {};
          o[resources[e].Creature.key] = 'han';
          resources[e].Creature.create(o, this.callback);
        }