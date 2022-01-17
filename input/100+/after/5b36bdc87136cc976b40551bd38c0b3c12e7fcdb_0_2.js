function () {
        var $root = $(this).addClass('fp-root');
        // Wrap the list in a div to provide a positioning context.
        var $wrapper = $root.wrap($('<div>')
          .css({
            height: '100%',
            position: 'relative'
          })
          .data(plugin, {
            options: options
          })
          .addClass('fp-wrapper')
        ).parent();
        // Bind event handlers.
        $wrapper
        .delegate('.fp-list, .fp-item', 'debug.flexiPanda', {}, (options.debug) ? debug : function () {return false; })
        .delegate('.fp-item', 'prepare.flexiPanda', {options: options}, insertItemHandles)
        // Called when items are added or removed, including the initialization, when all the items are added.
        .bind('listChange.flexiPanda', initItems);
        // Set up the behavior mode
        switch (options.mode) {
        case 'click' :
        // Click mode
          $wrapper
          .bind('setup.flexiPanda.clickMode', clickSetup)
          .delegate('.fp-item', 'click.flexiPanda.clickMode', itemClick)
          .delegate('.fp-list, .fp-item', 'refresh.flexiPanda', setItemData)
          .delegate('.fp-pegged', 'rebounded.flexiPanda', {edge: options.edge}, reposition)
          .delegate('.fp-item', 'clean.flexiPanda', cleanItem)
          .delegate('.fp-item', 'activate.flexiPanda.hoverMode', activateItem)
          .addClass('fp-mode-click');
          break;
        case 'hover' :
          // Hover mode
          $wrapper
          .bind('setup.flexiPanda.hoverMode', hoverSetup)
          .delegate('.fp-root', 'mouseenter.flexiPanda.hoverMode', buildClearDelay)
          .delegate('.fp-root', 'mouseleave.flexiPanda.hoverMode', {delay: options.delays.menu, args: 'exit'}, buildTriggerDelay)
          .delegate('.fp-root', 'exit.flexiPanda', cleanMenu)
          .delegate('.fp-list, .fp-item', 'refresh.flexiPanda', setItemData)
          .delegate('.fp-pegged', 'rebounded.flexiPanda', {edge: options.edge}, reposition)
          .delegate('.fp-item', 'clean.flexiPanda', cleanItem)
          .delegate('.fp-item', 'mouseenter.flexiPanda.hoverMode', activateItem)
          .addClass('fp-mode-hover');
          break;
        case 'slider' :
          // Mobile slider mode
          $wrapper
          .bind('reflowed.flexiPanda.sliderMode', sliderReflow)
          .bind('setup.flexiPanda.sliderMode', sliderSetup)
          .bind('reset.flexiPanda.sliderMode', sliderReset)
          .delegate('.fp-handle:not(.fp-back .fp-handle)', 'click.flexiPanda.sliderMode', slideForward)
          .delegate('.fp-item', 'clean.flexiPanda', cleanItem)
          .delegate('.fp-item', 'activate.flexiPanda.hoverMode', activateItem)
          .delegate('.fp-back', 'click.flexiPanda.sliderMode', slideBack)
          .addClass('fp-mode-slider');
          break;
        default:
        }
        // Set up the plugin.
        $wrapper
        .trigger('setup');
      }