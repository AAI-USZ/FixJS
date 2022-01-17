function (obj) {
              var o = {name: 'support'};
              o[resources[e].User.key] = 'support';
              resources[e].User.createRepository('marak', o, this.callback);
            }