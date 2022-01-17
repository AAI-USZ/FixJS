function () {
        var router = restful.createRouter([helpers.Creature, helpers.User]);
        this.callback(null, router);
      }