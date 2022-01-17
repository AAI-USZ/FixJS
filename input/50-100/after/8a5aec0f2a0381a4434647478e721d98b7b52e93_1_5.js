function () {
            resourceful.unregister('Team');
            return resources[e].Team = resourceful.define('team', function() {
              this.use(e.name, e.options);
              this.string('name', { minLength: 1 });
            });
          }