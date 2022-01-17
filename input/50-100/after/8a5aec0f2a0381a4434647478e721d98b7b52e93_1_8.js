function () {
            resourceful.unregister('Follower');
            return resources[e].Follower = resourceful.define('follower', function() {
              this.use(e.name, e.options);
              this.string('name');
              this.parent('User');
            });
          }