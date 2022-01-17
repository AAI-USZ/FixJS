function() {
      return {
        name: "confirm_correct",
        isFinalStep: true,
        hideSubmitButton: true,
        beforeText: "<b>" + this.confirmCorrect + "</b>",
        showcrosshairs: false,
        showtooltipcoord: false,
        showgraphgrid: this.showGraphGrid
      };
    }