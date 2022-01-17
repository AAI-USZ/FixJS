function(runtimePage) {
      var annotation, otherAnnotations, runtimeActivity, runtimeStep, stepdef, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _results;
      this.annotations = {};
      this.yAxis = this.graphPane.yAxis;
      this.xAxis = this.graphPane.xAxis;
      this.x_axis_name = this.xAxis.label.toLowerCase();
      this.y_axis_name = this.yAxis.label.toLowerCase();
      runtimeActivity = runtimePage.activity;
      this.datadefRef = this.getDataDefRef(runtimeActivity);
      this.tags = {};
      this.annotations = {};
      otherAnnotations = [
        {
          name: "singleLineGraphing",
          type: "FreehandSketch"
        }
      ];
      for (_i = 0, _len = otherAnnotations.length; _i < _len; _i++) {
        annotation = otherAnnotations[_i];
        this.annotations[annotation.name] = runtimeActivity.createAndAppendAnnotation({
          type: "FreehandSketch"
        });
      }
      this.assemble_steps();
      _ref = this.steps;
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        stepdef = _ref[_j];
        runtimeStep = runtimePage.appendStep();
        this.runtimeStepsByName[stepdef.name] = runtimeStep;
      }
      _ref2 = this.steps;
      _results = [];
      for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
        stepdef = _ref2[_k];
        _results.push(this.setupStep({
          stepdef: stepdef,
          runtimePage: runtimePage
        }));
      }
      return _results;
    }