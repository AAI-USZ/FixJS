function () {
            resourceful.unregister('Forum');
            return resources[e].Forum = resourceful.define('forum', function() {
              this.use(e.name, e.options);
              this.string('name', { minLength: 1 });
              this.parent('Forum');
            });
          }