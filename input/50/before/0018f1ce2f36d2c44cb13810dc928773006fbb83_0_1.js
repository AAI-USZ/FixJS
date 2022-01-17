function(args) {
    _(this).bindAll('render',
                    'renderHabit',
                    'renderGoal',
                    'renderAmount',
                    'currencyTextChanged',
                    'sliderChanged',
                    'applyCostToSlider',
                    'initializeListeners',
                    'initializePostRenderListeners',
                    'save');
    this.initializeListeners();
  }