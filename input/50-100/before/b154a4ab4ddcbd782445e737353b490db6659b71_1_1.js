function() {
      return {
        name: "question",
        defaultBranch: "confirm_correct",
        submitButtonTitle: "Check My Answer",
        beforeText: this.initialPrompt,
        substitutedExpressions: [],
        submissibilityCriterion: ["=", ["lineCount"], 1],
        showCrossHairs: this.showCrossHairs,
        showToolTipCoords: this.showToolTipCoords,
        showGraphGrid: this.showGraphGrid,
        graphAnnotations: ['singleLineGraphing'],
        tableAnnotations: [],
        tools: ['graphing'],
        responseBranches: this.check_correct_answer()
      };
    }