function() {
      var badFunction, system, systemManager;
      system = null;
      badFunction = null;
      systemManager = null;
      before(function() {
        systemManager = new Artemis.SystemManager(world);
        system = new Artemis.System("DummyComponentHP", "DummyComponentPosition");
        return badFunction = function() {
          return systemManager.addSystem(system);
        };
      });
      it("should throw an error", function() {
        return badFunction.should["throw"]("Invalid type when adding a system: it can only be the string update or draw");
      });
      return it("should not have pushed in any objects/array", function() {
        systemManager.allSystems.should.be.empty;
        systemManager.updateSystems.should.be.empty;
        return systemManager.renderSystems.should.be.empty;
      });
    }