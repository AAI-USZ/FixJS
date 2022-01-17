function() {
      var copy;
      copy = ko.toJS(this);
      delete copy.phase;
      delete copy.resource;
      delete copy.project;
      delete copy.assignedPeriod;
      copy.resourceId = this.resource.id;
      copy.phaseId = this.phase.id;
      copy.projectId = this.project.id;
      copy.startDate = this.assignedPeriod.startDate.dateString;
      copy.endDate = this.assignedPeriod.endDate.dateString;
      return copy;
    }