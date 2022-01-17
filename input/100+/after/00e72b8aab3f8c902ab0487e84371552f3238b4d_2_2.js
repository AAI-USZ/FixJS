function() {
      var system, systemManager;
      system = null;
      systemManager = null;
      before(function() {
        systemManager = new Artemis.SystemManager(world);
        system = new Artemis.System("DummyComponentHP", "DummyComponentPosition");
        return systemManager.addSystem(system, "draw");
      });
      it("should have added a entry in the systems object and so it should have a length of 1", function() {
        return Object.keys(systemManager.systems).should.have.length(1);
      });
      it("should have pushed the system to the allSystems array", function() {
        return systemManager.allSystems.should.contain(system);
      });
      it("should have set the default priority to 0", function() {
        return systemManager.renderSystems[0].should.be.an["instanceof"](Object);
      });
      return it("should have pushed the system to the updateSystems object", function() {
        return Object.keys(systemManager.renderSystems[0]).should.have.length(1);
      });
    }