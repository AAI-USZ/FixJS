function DVF_initialize() {
    let close = document.getElementById("close");
    let pauseOnExceptions = document.getElementById("pause-exceptions");
    let resume = document.getElementById("resume");
    let stepOver = document.getElementById("step-over");
    let stepIn = document.getElementById("step-in");
    let stepOut = document.getElementById("step-out");
    let frames = document.getElementById("stackframes");

    close.addEventListener("click", this._onCloseButtonClick, false);
    pauseOnExceptions.checked = DebuggerController.StackFrames.pauseOnExceptions;
    pauseOnExceptions.addEventListener("click",
                                        this._onPauseExceptionsClick,
                                        false);
    resume.addEventListener("click", this._onResumeButtonClick, false);
    stepOver.addEventListener("click", this._onStepOverClick, false);
    stepIn.addEventListener("click", this._onStepInClick, false);
    stepOut.addEventListener("click", this._onStepOutClick, false);
    frames.addEventListener("click", this._onFramesClick, false);
    frames.addEventListener("scroll", this._onFramesScroll, false);
    window.addEventListener("resize", this._onFramesScroll, false);

    this._frames = frames;
  }