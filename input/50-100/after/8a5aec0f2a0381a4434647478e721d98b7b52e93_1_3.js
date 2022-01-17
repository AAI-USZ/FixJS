function () {
            resourceful.unregister('Repository');
            return resources[e].Repository = resourceful.define('repository', function() {
              this.use(e.name, e.options);
              this.string('name', { minLength: 1 });
              this.parent('User');
            });
          }