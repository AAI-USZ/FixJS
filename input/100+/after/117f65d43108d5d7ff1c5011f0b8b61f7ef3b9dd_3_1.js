function () {
        var tooltip = $('<div/>').tooltip().on('click.foo', function(){})
        ok(tooltip.data('tooltip'), 'tooltip has data')
        ok(tooltip.data('events').mouseover && tooltip.data('events').mouseout, 'tooltip has hover event')
        ok(tooltip.data('events').click[0].namespace == 'foo', 'tooltip has extra click.foo event')
        tooltip.tooltip('show')
        tooltip.tooltip('destroy')
        ok(!tooltip.hasClass('in'), 'tooltip is hidden')
        ok(!tooltip.data('tooltip'), 'tooltip does not have data')
        ok(tooltip.data('events').click[0].namespace == 'foo', 'tooltip still has click.foo')
        ok(!tooltip.data('events').mouseover && !tooltip.data('events').mouseout, 'tooltip does not have any events')
      }