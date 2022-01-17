function (that) {
        that.changeTracker.revert();
        that.events.afterCancel.fire();
    }