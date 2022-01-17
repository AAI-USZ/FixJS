function runStep(step) {
    "use strict";
    var skipLog = utils.isObject(step.options) && step.options.skipLog === true;
    var stepInfo = f("Step %d/%d", this.step, this.steps.length);
    var stepResult;
    if (!skipLog) {
        this.log(stepInfo + f(' %s (HTTP %d)', this.getCurrentUrl(), this.currentHTTPStatus), "info");
    }
    if (utils.isNumber(this.options.stepTimeout) && this.options.stepTimeout > 0) {
        var stepTimeoutCheckInterval = setInterval(function _check(self, start, stepNum) {
            if (new Date().getTime() - start > self.options.stepTimeout) {
                if (self.step === stepNum) {
                    self.emit('step.timeout');
                    if (utils.isFunction(self.options.onStepTimeout)) {
                        self.options.onStepTimeout.call(self, self);
                    } else {
                        self.die("Maximum step execution timeout exceeded for step " + stepNum, "error");
                    }
                }
                clearInterval(stepTimeoutCheckInterval);
            }
        }, this.options.stepTimeout, this, new Date().getTime(), this.step);
    }
    this.emit('step.start', step);
    stepResult = step.call(this, this);
    if (utils.isFunction(this.options.onStepComplete)) {
        this.options.onStepComplete.call(this, this, stepResult);
    }
    if (!skipLog) {
        this.emit('step.complete', stepResult);
        this.log(stepInfo + f(": done in %dms.", new Date().getTime() - this.startTime), "info");
    }
}