function (obj) {
              var o = {name: 'issues'};
              o[resources[e].Repository.key] = 'issues';
              obj.createRepository(o, this.callback);
            }