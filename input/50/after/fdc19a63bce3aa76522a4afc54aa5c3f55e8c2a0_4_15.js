function (selector) {
        // explicit nil handling
        if (!selector)
            return;

        this._scheduler.unscheduleSelector(selector, this);
    }