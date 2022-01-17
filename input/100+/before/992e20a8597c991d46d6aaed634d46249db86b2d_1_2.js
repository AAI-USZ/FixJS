function DVF_destroy() {
    let close = document.getElementById("close");
    let pauseOnExceptions = document.getElementById("pause-exceptions");
    let resume = document.getElementById("resume");
    let stepOver = document.getElementById("step-over");
    let stepIn = document.getElementById("step-in");
    let stepOut = document.getElementById("step-out");
    let frames = this._frames;

    close.removeEventListener("click", this._onCloseButtonClick, false);
    pauseOnExceptions.removeEventListener("click",
                                          this._onPauseExceptionsClick,
                                          false);
    resume.removeEventListener("click", this._onResumeButtonClick, false);
    stepOver.removeEventListener("click", this._onStepOverClick, false);
    stepIn.removeEventListener("click", this._onStepInClick, false);
    stepOut.removeEventListener("click", this._onStepOutClick, false);
    frames.removeEventListener("click", this._onFramesClick, false);
    frames.removeEventListener("scroll", this._onFramesScroll, false);
    window.removeEventListener("resize", this._onFramesScroll, false);

    this._frames = null;
  }