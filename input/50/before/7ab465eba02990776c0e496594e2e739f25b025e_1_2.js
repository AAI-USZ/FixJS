function DVB_destroy() {
    let breakpoints = this._breakpoints;
    breakpoints.removeEventListener("click", this._onBreakpointClick, false);

    this._breakpoints = null;
  }