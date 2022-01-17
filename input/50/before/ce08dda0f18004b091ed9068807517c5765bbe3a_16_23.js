function (selector) {
        // explicit nil handling
        if (!selector)
            return;

        cc.Scheduler.sharedScheduler().unscheduleSelector(selector, this);
    }