function(args) {
    _(this).bindAll('render',
                    'renderHabit',
                    'renderGoal',
                    'renderAmount',
                    'currencyTextChanged',
                    'sliderChanged',
                    'applyCostToSlider',
                    'initializeListeners',
                    'save');

    $(this.el).live('pageinit', this.initializeListeners);
  }