function (selector) {
        // explicit nil handling
        if (!selector)
            return;

        this.getScheduler().unscheduleSelector(selector, this);
    }