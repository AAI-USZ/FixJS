function () {
            resourceful.unregister('PullRequest');
            return resources[e].PullRequest = resourceful.define('pull_request', function () {
              this.use(e.name, e.options);
              this.string('title', { minLength: 1 });
              this.parent('Repository');
            });
          }