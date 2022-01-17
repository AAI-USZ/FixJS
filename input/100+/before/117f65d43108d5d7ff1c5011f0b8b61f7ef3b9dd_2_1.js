function () {
        var popover = $('<div/>').popover().on('click.foo', function(){})
        ok(popover.data('popover'), 'popover has data')
        ok(popover.data('events').mouseover && popover.data('events').mouseout, 'popover has hover event')
        ok(popover.data('events').click[0].namespace == 'foo', 'popover has extra click.foo event')
        popover.popover('destroy')
        ok(!popover.data('popover'), 'popover does not have data')
        ok(popover.data('events').click[0].namespace == 'foo', 'popover still has click.foo')
        ok(!popover.data('events').mouseover && !popover.data('events').mouseout, 'popover does not have any events')
      }