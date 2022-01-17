function() {
      return {
        name: "incorrect_answer_but_slope_correct",
        defaultBranch: "confirm_correct",
        submitButtonTitle: "Check My Answer",
        beforeText: " <b>" + this.yInterceptIncorrect + "</b><p>" + this.initialPrompt + "</p>",
        substitutedExpressions: [],
        showcrosshairs: true,
        showtooltipcoord: true,
        showgraphgrid: true,
        submissibilityCriterion: ["or", ["pointMoved", this.datadefRef.datadef.name, 1], ["pointMoved", this.datadefRef.datadef.name, 2]],
        showCrossHairs: "false",
        showToolTipCoords: this.showToolTipCoords,
        showGraphGrid: this.showGraphGrid,
        graphAnnotations: ['singleLineGraphing'],
        tableAnnotations: [],
        tools: ['graphing'],
        responseBranches: this.check_correct_answer()
      };
    }