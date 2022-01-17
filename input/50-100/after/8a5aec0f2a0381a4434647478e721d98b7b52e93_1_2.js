function () {
            resourceful.unregister('User');
            return resources[e].User = resourceful.define('user', function() {
              this.use(e.name, e.options);
              this.string('name', { minLength: 1 });
            });
          }