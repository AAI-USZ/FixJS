function LineConstructionSequence(_arg) {
      var i, pane, _len, _ref;
      this.slope = _arg.slope, this.slopeTolerance = _arg.slopeTolerance, this.yIntercept = _arg.yIntercept, this.yInterceptTolerance = _arg.yInterceptTolerance, this.initialPrompt = _arg.initialPrompt, this.confirmCorrect = _arg.confirmCorrect, this.slopeIncorrect = _arg.slopeIncorrect, this.yInterceptIncorrect = _arg.yInterceptIncorrect, this.allIncorrect = _arg.allIncorrect, this.showCrossHairs = _arg.showCrossHairs, this.showToolTipCoords = _arg.showToolTipCoords, this.showGraphGrid = _arg.showGraphGrid, this.page = _arg.page;
      this.steps = [];
      this.runtimeStepsByName = {};
      _ref = this.page.panes || [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        pane = _ref[i];
        if (pane instanceof AuthorPane.classFor['PredefinedGraphPane']) {
          this.graphPane = pane;
        }
        if (pane instanceof AuthorPane.classFor['TablePane']) {
          this.tablePane = pane;
        }
      }
    }