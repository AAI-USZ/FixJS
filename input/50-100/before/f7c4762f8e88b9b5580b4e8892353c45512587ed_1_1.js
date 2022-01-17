function(id) {
      if(this.bodiesMap[id]){
        this.bodiesMap[id].DestroyFixture(this.fixturesMap[id]);
        this.world.DestroyBody(this.bodiesMap[id]);
        delete this.fixturesMap[id];
        delete this.bodiesMap[id];
      }
    }