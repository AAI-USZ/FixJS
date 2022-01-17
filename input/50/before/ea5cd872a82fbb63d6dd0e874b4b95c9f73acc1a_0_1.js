function () {
          var o = {age: 30, hair: 'red'};
          o[resources[e].Author.key] = 'han';
          resources[e].Author.create(o, this.callback);
        }