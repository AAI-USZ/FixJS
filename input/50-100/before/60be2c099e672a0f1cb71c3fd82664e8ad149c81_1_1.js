function AssignedResource(id, release, resource, project, focusFactor, startDate, endDate) {
      this.id = id;
      this.release = release;
      this.resource = resource;
      this.project = project;
      this.focusFactor = focusFactor;
      this.assignedPeriod = new Period(startDate, endDate, "");
      console.log("create AssignedResource:" + ko.toJSON(this.assignedPeriod));
    }