function(system, execType, priority) {
      if (priority == null) {
        priority = 0;
      }
      if (execType !== "update" && execType !== "draw") {
        throw "Invalid type when adding a system: it can only be the string update or draw";
      }
      system.world = this.world;
      this.systems[system.constructor.name] = system;
      if (execType === "update") {
        if (!this.updateSystems[priority]) {
          this.updateSystems[priority] = [];
        }
        this.updateSystems[priority].push(system);
      } else if (execType === "draw") {
        if (!this.renderSystems[priority]) {
          this.renderSystems[priority] = [];
        }
        this.renderSystems[priority].push(system);
      }
      if (__indexOf.call(this.allSystems, system) < 0) {
        this.allSystems.push(system);
      }
      system.bit = this._getBitFor(system.constructor.name);
      return system;
    }