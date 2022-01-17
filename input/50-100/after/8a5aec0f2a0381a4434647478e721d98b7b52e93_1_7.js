function () {
            resourceful.unregister('Membership');
            return resources[e].Membership = resourceful.define('membership', function() {
              this.use(e.name, e.options);
              this.string('team');
              this.parent('User');
            });
          }