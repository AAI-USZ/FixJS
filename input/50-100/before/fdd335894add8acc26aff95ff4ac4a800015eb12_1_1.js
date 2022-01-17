function() {
          this.state = 1;
          this.overlays = [];
          this.circles = [];
          this.coordinates = [];
          this.addAgencies();
          this.countAshokas();
          this.addProjects();
          this.currentProject = null;
          this.projectMarkers = {};
          this.previousZoom   = 3;
          this.previousCenter = null;

          var that = this;
        }