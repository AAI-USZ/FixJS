function () {
            resourceful.unregister('Following');
            return resources[e].Following = resourceful.define('following', function() {
              this.use(e.name, e.options);
              this.string('name');
              this.parent('User');
            });
          }