function(event, target)

  {

    var bp_id = parseInt(event.target.get_attr('parent-node-chain',

                                               'data-breakpoint-id'));

    var bp = this._bps.get_breakpoint_with_id(bp_id);

    if (bp)

    {

      this._toggle_bp(bp, event.target.checked);

    }

  }