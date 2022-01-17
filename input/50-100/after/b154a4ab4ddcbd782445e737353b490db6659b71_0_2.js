function() {
      return {
        name: "confirm_correct",
        isFinalStep: true,
        hideSubmitButton: true,
        beforeText: "<b>" + this.confirmCorrect + "</b>",
        showCrossHairs: false,
        showToolTipCoords: false,
        showGraphGrid: this.showGraphGrid,
        graphAnnotations: ["singleLineGraphing"]
      };
    }