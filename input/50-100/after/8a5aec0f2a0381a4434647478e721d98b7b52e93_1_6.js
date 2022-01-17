function () {
            resourceful.unregister('Member');
            return resources[e].Member = resourceful.define('member', function() {
              this.use(e.name, e.options);
              this.string('user');
              this.parent('Team');
            });
          }