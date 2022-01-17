function(_arg) {
      var annotation, response_def, runtimePage, step, stepdef, tool, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      runtimePage = _arg.runtimePage, stepdef = _arg.stepdef;
      step = this.runtimeStepsByName[stepdef.name];
      step.addGraphPane({
        title: this.graphPane.title,
        datadefRef: this.getDataDefRef(runtimePage.activity),
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        index: this.graphPane.index,
        showCrossHairs: stepdef.showCrossHairs,
        showGraphGrid: stepdef.showGraphGrid,
        showToolTipCoords: stepdef.showToolTipCoords
      });
      step.addTablePane({
        datadefRef: this.getDataDefRef(runtimePage.activity),
        index: this.tablePane.index
      });
      step.beforeText = stepdef.beforeText;
      step.substitutedExpressions = stepdef.substitutedExpressions;
      step.variableAssignments = stepdef.variableAssignments;
      step.submitButtonTitle = stepdef.submitButtonTitle;
      step.defaultBranch = this.runtimeStepsByName[stepdef.defaultBranch];
      step.setSubmissibilityCriterion(stepdef.submissibilityCriterion);
      _ref = stepdef.graphAnnotations || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        annotation = _ref[_i];
        if (this.annotations[annotation]) {
          step.addAnnotationToPane({
            annotation: this.annotations[annotation],
            index: this.graphPane.index
          });
        }
      }
      _ref2 = stepdef.tools || [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        tool = _ref2[_j];
        step.addGraphingTool({
          index: this.index || 0,
          datadefRef: this.getDataDefRef(runtimePage.activity),
          annotation: this.annotations["singleLineGraphing"],
          shape: "singleLine"
        });
      }
      step.defaultBranch = this.runtimeStepsByName[stepdef.defaultBranch];
      _ref3 = stepdef.responseBranches || [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        response_def = _ref3[_k];
        step.appendResponseBranch({
          criterion: response_def.criterion,
          step: this.runtimeStepsByName[response_def.step]
        });
      }
      return step;
    }