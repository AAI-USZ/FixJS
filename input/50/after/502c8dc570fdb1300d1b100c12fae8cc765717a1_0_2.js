function () {
        var router = restful.createRouter([fixtures.Creature, fixtures.User]);
        this.callback(null, router);
      }