function (window, undefined) {
	if (window.jQuery === undefined) {
		return null;
	}
	// Replace 'pluginName' with the name of your plugin.
	var plugin = 'flexiPanda',
	// A private reference to this $plugin object.
	$plugin,
	// Local copy of jQuery.
	$ = window.jQuery,
	// Local copies of context globals.
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	navigator = window.navigator,
	location = window.location,
	// Local copy of jQuery.
	$ = window.jQuery,
	// Private variables
	html = document.documentElement,
	textDirection = (html.dir) ? html.dir : 'ltr';

  /**
   * Clear all the timers on an element.
   */
  function clearDelay(context) {
    var context = context || this;
    var $context = ('jquery' in context) ? context : $(context);
    var data = $context.data()[plugin];
    if ('timers' in data) {
      while (data.timers.timeouts.length > 0) {
        clearTimeout(data.timers.timeouts.pop());
      }
      while (data.timers.intervals.length > 0) {
        clearInterval(data.timers.intervals.pop());
      }
    }
    $context.trigger('debug');
  }
  /**
   * Create a delay to call a function on an element.
   */
  function setDelay(fn, context, options) {
    // Nothing to do without a function.
    if (!fn) {
      return null;
    }
    var context = context || this;
    var $context = ('jquery' in context) ? context : $(context);
    var options = options || {};
    // 'args' here needs to be made more robust so it isn't assumed that the value
    // is a single string.
    // $.proxy works with the signature of (fn, context [, options]) in jQuery 1.7+
    // but not in 1.4, so I had to make my own function.
    var proxy = fakeProxy(fn, $context, ('args' in options) ? options.args : null);
    if ($.isFunction(proxy)) {
      var delay = ('delay' in options) ? options.delay : 500;
      var timeout;
      // Add a timer to the context
      var data = $context.data()[plugin];
      // Store timeouts and intervals on the object.
      if (!data.timers) {
        data.timers = {timeouts: [], intervals: []};
      }
      if ('type' in options && options.type === 'interval') {
        data.timers.intervals.push(setInterval(proxy, delay));
      } else {
        data.timers.timeouts.push(setTimeout(proxy, delay));
      }
    }
    $context.trigger('debug');
  }
  /**
   *
   */
  function buildClearDelay(event) {
    clearDelay(this);
  }
  /**
   *
   */
  function buildTriggerDelay (event) {
    event.data = ('data' in event) ? event.data : {};
    setDelay($.fn.trigger, $(this), {'delay': event.data.delay || undefined, 'args': event.data.args || undefined});
  }
  /**
   * This exists because $.proxy can't be overloaded in jQuery 1.4.
   */
  function fakeProxy(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
      fn.apply(context, args);
    }
  }
  /**
   * This needs to be made more generic and less slide-y
   */
  function initItems(event) {
    event.stopImmediatePropagation();
    // The plugin wrapper.
    var $wrapper = $(this);
    var options = $wrapper.data(plugin).options;
    var rootClass = 'fp-root';
    var listClass = 'fp-list';
    var itemClass = 'fp-item';
    var linkClass = 'fp-link';
    // Get lists and items.
    // @TODO, we want to allow arbitrary HTML in item bodies,
    // so this selection will need to be tighter.
    var $root = $wrapper.children('.' + rootClass);
    var $ul = $wrapper.find('ul').not('.' + listClass);
    var $li = $wrapper.find('li').not('.' + itemClass);
    // Basic setup
    $ul
    .addClass(listClass)
    .each(function (index, element) {
      $(this).data('flexiPanda', {
        processed: false,
        type: 'list',
        level: NaN
      });
    });
    // Initialize items and their links.
    $li
    .addClass(itemClass)
    .each(function (index, element) {
      $(this).data('flexiPanda', {
        processed: false,
        type: 'item'
      });
    })
    // Add a class to item links.
    .children('a')
    .addClass(linkClass)
    .end()
    .trigger('prepare');    
    // Indicate the level of each menu.
    markListLevels($root);
    // Set visibility
    setLevelVisibility($root, options['hide-levels-after']);
    // Set positioning
    setLevelPositioning($root, options['position-levels-after']);
    // Set orientation.
    setOrientation.call($wrapper, options['orientation']);
    // Trigger setup events.
    $ul
    // Move sub menus that might be positioned outside the viewport.
    .trigger('rebounded')
    // Trigger debugging.$ul
    .trigger('debug', {enable: options.debug});
    
    $li
    // Establish item data.
    .trigger('refresh')
    // Trigger debugging.
    .trigger('debug', {enable: options.debug});
  }
  /**
   * Clean the interaction classes from the element and its children.
   */
  function cleanItem(event) {
    event.stopImmediatePropagation();
    $(this)
    .removeClass('fp-trail fp-active fp-hovered fp-clicked');
  }
  /**
   *
   */
  function cleanMenu(event) {
    $(this)
    .find('.fp-trail')
    .trigger('clean');
  }
  /**
   * Handles the hover event of li elements.
   */
  function activateItem(event) {
    if (!event.hoverProcessed) {
      // liveFired is replaced with delegateTarget in jQuery 1.7
      var $root = $(event.liveFired);
      $(this)
      // Clean out all .fp-trail classes.
      .closest('.fp-wrapper')
      .find('.fp-trail')
      .trigger('clean')
      .end()
      .end()
      // Trace the active trail.
      .addClass('fp-trail fp-active')
      .parentsUntil('.fp-wrapper')
      .filter('.fp-item')
      .addClass('fp-trail')
      .end()
      .end()
      // Deal with window collisions.
      .flexiPanda('parentList')
      .trigger('rebounded');
    }
    // Propagation shouldn't be stopped here, but this function
    // should only run once.
    event.hoverProcessed = true;
  }
  /**
   * Hangles the click event of li elements.
   */
  function itemClick(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this)
    .trigger('pathSelected')
    .addClass('fp-trail fp-clicked')
    .closest('ul')
    .trigger('debug');
  }
  /**
   * Adds an fp-level class to each list based on its depth in the menu.
   */
  function markListLevels($lists, level) {
    level = level || 1;
    $lists
    .addClass('fp-level-' + level)
    .each(function (index, element) {
      $(this).data().flexiPanda.level = level;
    });
    $lists = $lists.children('li').children('ul');
    if ($lists.length > 0) {
      markListLevels($lists, (level + 1));
    }
  }
  /**
   *
   */
  function setLevelVisibility($lists, visibleAfter) {
    var level;
    $lists
    .each(function (index, element) {
      var $this = $(this);
      level = $(this).data().flexiPanda.level;
      if (level > visibleAfter) {
        $this.addClass('fp-dormant');
      }
      else {
        $this.addClass('fp-visible');
      }
    });
    $lists = $lists.children('li').children('ul');
    if ($lists.length > 0) {
      setLevelVisibility($lists, visibleAfter);
    }
  }
  /**
   *
   */
  function setLevelPositioning($lists, positionedAfter) {
    var level;
    $lists
    .each(function (index, element) {
      var $this = $(this);
      level = $(this).data().flexiPanda.level;
      if (level > positionedAfter) {
        $this.addClass('fp-pegged');
      }
      else {
        $this.addClass('fp-unpegged');
      }
    });
    $lists = $lists.children('li').children('ul');
    if ($lists.length > 0) {
      setLevelPositioning($lists, positionedAfter);
    }
  }
  /**
   * 
   */
  function setOrientation(orientation) {
    var $this = $(this);
    switch (orientation) {
    case 'horizontal':
      $this.addClass('fp-horizontal');
      break;
    case 'vertical':
      $this.addClass('fp-vertical');
      break;
    default:
      $this.addClass('fp-horizontal');
      break;
    }
  }
  /**
   * Determines if the dimenions are outside the bounds of the viewport.
   */
  function checkBounds(dimensions) {
    return {
      left: (dimensions.left === undefined) ? undefined : (dimensions.left >= 0),
      top: (dimensions.top === undefined) ? undefined : (dimensions.top >= 0),
      right: (dimensions.right === undefined) ? undefined : (dimensions.right >= 0),
      bottom: (dimensions.bottom === undefined) ? undefined : (dimensions.bottom >= 0)
    };
  }
  /**
   *
   */
  function checkDataFreshness(data) {
    // If the item hasn't been processed, just return.
    if (data.processed === false || data.processed === undefined) {
      return null;
    }
    data.dimensions = data.dimensions || {};
    // If the item knows nothing about the client yet,
    // then the data is stale.
    if (data.dimensions.client === undefined) {
      data.processed = false;
      return null;
    }
    // Get the current client dimensions.
    var client = {
      left: document.documentElement.clientLeft,
      top: document.documentElement.clientTop,
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth
    }, 
    edge = '';
    for (edge in client) {
      if (client.hasOwnProperty(edge)) {
        if (client[edge] !== data.dimensions.client[edge]) {
          data.processed = false;
          return null;
        }
      }
    }
  }
  /**
   * Moves elements around the page based on a vector object.
   *
   * param vectors {object}
   */
  function move(vectors) {
    var $this = $(this),
    elem = $this.get(0),
    offset = $this.offset(),
    coords = {};
    if (vectors.right && textDirection === 'ltr') {
      coords.left = (offset.left + vectors.right);
    }
    if (vectors.left && textDirection === 'rtl') {
      coords.left = (offset.left - vectors.left);
    }
    if (vectors.bottom) {
      coords.top = (offset.top + vectors.bottom);
    }
    if (vectors.top) {
      coords.top = (offset.top - vectors.top);
    }
    // Move the item.
    $this.offset(coords);
  }
  /**
   * Shifts the item lists with margins.
   */
  function shiftPosition(data, options) {
    var $this = $(this),
    vectors = {top: {dir: 'top', sign: ''}, bottom: {dir: 'top', sign: '-'}},
    vector = '',
    tolerance = options.tolerance,
    buffer = options.buffer,
    delta = 0,
    occlusionFix = {},
    fixes = 0;
    // LRT and RTL languages are dealt with separately.
    if (textDirection === 'rtl') {
      vectors.left = {dir: 'left', sign: ''};
    }
    else {
      vectors.right = {dir: 'left', sign: '-'};
    }
    var dimensions = data.dimensions.item,
    parentListDimensions = data.dimensions.parentList;
    for (vector in vectors) {
      if (vectors.hasOwnProperty(vector)) {
        var index = 'margin-' + vectors[vector].dir;
        // If the list is closer to the viewport than tolerance, shift it with margins
        // to the tolerance value.
        if (dimensions[vector] < tolerance) {
          delta = tolerance - dimensions[vector];
          var obj = {};
          obj[index] = vectors[vector].sign + delta + 'px';
          $this.css(obj);
        }
        // If the list occludes its parent lists, shift it with margins.
        if (parentListDimensions) {
          var diff = Math.abs((dimensions[vector] + delta) - parentListDimensions[vector]);
          if (diff < tolerance) {
            delta = buffer - diff;
            occlusionFix[index] = vectors[vector].sign + buffer + 'px';
            fixes += 1;
            if (fixes > 1) {
              $this.css(occlusionFix);
            }
          }
        }
      }
    }
  }
  /**
   * Responds to the rebounded event.
   */
  function reposition(event) {
    event.stopPropagation();
    var $this = $(this);
    // Remove any margins from position shifting.
    $this.css({margin: 0});    
    var data = $this.trigger('refresh').data().flexiPanda,
    dimensions = data.dimensions,
    // Check if the item falls within the bounds of the viewport within the
    // configured tolerance.
    bounds = checkBounds(dimensions.item),    
    // idealBounds is the placement of the item if the viewport had no limits.
    idealBounds = checkBounds(dimensions.ideal),
    edge = '',
    vectors = {};
    // Move the item if it is out of bounds
    for (edge in bounds) {
      if (bounds.hasOwnProperty(edge)) {
        // If the idealBound is true and the ideal bound is closer to the client
        // edge than the current item edge, move it the difference of the distance
        // between the two positions.
        if (idealBounds[edge] === true && (dimensions.ideal[edge] > 0) && (dimensions.ideal[edge] < dimensions.item[edge])) {
          vectors[edge] = dimensions.item[edge] - dimensions.ideal[edge];
        }
        // If the idealBound is false and the current item edge is farther from the
        // client edge than the tolerance, reposition it.
        if (idealBounds[edge] === false && (dimensions.item[edge] > 0)) {
          vectors[edge] = dimensions.item[edge];
        }
        // If the item is outside the edge of the screen, reposition it.
        if (bounds[edge] === false) {
          vectors[edge] = dimensions.item[edge];
        }
        idealBounds[edge] = bounds[edge] = true;
      }
    }
    // Move the item. 
    // move() will deal with conflicting vectors
    if (!$.isEmptyObject(vectors)) {
      move.call(this, vectors);
      data = $this.trigger({type: 'refresh', cache: false}).data().flexiPanda;
    }
    // Shift the lists by adjusting margins to correct lists against the edge 
    // of the screen and lists occluding other lists.
    shiftPosition.call(this, data, event.data.edge);
    
    // Trigger refresh on the child lists. Parent lists have to be repositioned
    // before child lists.
    $this.find('.fp-level-' + (data.level + 1)).trigger('rebounded');
  }
  /**
   *
   */
  function hoverSetup(event) {
    var $wrapper = $(this);
    // Mark up the lists and items.
    $wrapper
    .trigger('listChange');
    
  }
  /**
   *
   */
  function insertItemHandles(event) {
    event.stopImmediatePropagation();
    var options = event.data.options;
    var $item = $(this);
    var $link = $item.children('.fp-link');
    var $box = $link
    .wrap(
      $('<div>', {
        'class': 'fp-box'
      })
    )
    .parent();
    var handleClass = 'fp-handle';
    if ($item.children('.fp-list').length > 0 || $item.hasClass('fp-back')) {
      // If handles are disabled, make the link the click handler.
      if (!options['menu-handles']['show']) {
        $link.addClass(handle);
        return;
      }
      // The placement of the handles requires a positing context that can
      // be set to relative. This will not work on the .fp-items.
      $box
      .prepend(
        $('<span>', {
          'class': handleClass,
          text: options['menu-handles']['content']
        })
      );
    }
  }
  /**
   * Build the Slider menu when it is instantiated.
   */
  function sliderSetup(event) {
    var $this = $(this);
    // Mark up the lists and items.
    $this
    .trigger('listChange')
    // Add slider controls.
    .find('.fp-list')
    .not('.fp-root')
    // Add a back button.
    .prepend(
      $('<li>', {
        html: $('<a>', {
          text: 'back'
        }),
        'class': 'fp-back'
      })
    )
    .end()
    .end()
    // Mark up the back buttons.
    .trigger('listChange')
    .trigger('reflowed');
    
  }
  /**
   * Bring the Slider menu back to the root and clean active items.
   */
  function sliderReset(event) {
    var $this = $(this);
    // Clean active items.
    $this
    .find('.fp-root')
    .animate({
      'left': 0
    }, 250)
    .find('.fp-item')
    .trigger('clean')
    .end()
    .end()
    .trigger('reflowed');
    
  }
  /**
   * Since the Slider wrapper is set to overflow hidden, we need to manage
   * its height or risk hiding items in the menu list.
   *
   * Reflow is called when items are added to the list, when the menu slides,
   * or when the menu is reset.
   */
  function sliderReflow(event) {
    var $this = $(this);
    var $activeList = $this.find('.fp-item.fp-active > .fp-list');
    var height = 'auto';
    if ($activeList.length > 0) {
      height = $activeList.outerHeight();
    }
    else {
      var h = 0;
      $this.find('.fp-root').children('.fp-item').each(function(index, element) {
        h += $(this).outerHeight();
      });
      height = h || 'auto';
    }
    // Set the height.
    $this.animate({
      height: height
    }, 100);
  }
  /**
   * Move the Slider menu left or right.
   */
  function slide(level, sign) {
    // Move the item and list left the width of the wrapper.
    this
    .animate({
      'left': sign + (level * 100) + '%'
    }, 250);
  }
  /**
   *
   */
  function slideForward(event) {
    event.preventDefault();
    // Keep the menu from multiple-sliding.
    event.stopPropagation();
    var $this = $(this);
    var $wrapper = $this.flexiPanda('wrapper');
    var $root = $this.flexiPanda('root');
    var $item = $this.closest('.fp-item');
    var level = $this.closest('.fp-list').data()[plugin].level;
    var $list = $item.children('.fp-list');
    var sign = '-';
    var unit = '%';
    // Return is the item has no sub-menus.
    if ($list.length === 0) {
      return;
    }
    // Slide the menu
    slide.call($root, level, sign);
    // Make the list item element active.
    $item.trigger('activate');
    // Reflow to get the height calculation.
    $wrapper.trigger('reflowed');
  }
  /**
   *
   */
  function slideBack(event) {
    event.preventDefault();
    // Keep the menu from multiple-sliding.
    event.stopImmediatePropagation();
    // Navigate link.
    var $this = $(this);
    var $wrapper = $this.flexiPanda('wrapper');
    var $root = $this.flexiPanda('root');
    var $list = $this.closest('.fp-list');
    var $item = $this.flexiPanda('parentItem');
    // The level determines how far to move the menu i.e. level * 100.
    var level = Number($list.data()[plugin].level) - 2;
    var sign = (level === 0) ? '' : '-';
    
    // Slide the menu
    slide.call($root, level, sign);
    // Clean the active item. A little hinky, but it works.
    var event = {
      data: {}
    };
    // Clean the trail after a delay.
    event.data = {
      delay: 200,
      args: 'clean'
    };
    buildTriggerDelay.call($item, event);
    // The parent item of this item is now the active item.
    event.data = {
      delay: 250,
      args: 'activate'
    };
    buildTriggerDelay.call($item.flexiPanda('parentItem'), event);
    // Reflow to get the height calculation.
    event.data = {
      delay: 300,
      args: 'reflowed'
    };
    buildTriggerDelay.call($wrapper, event);
  }
  /**
   * Saves the dimensions of each item in its data() object.
   */
  function setItemData(event) {
    event.stopPropagation();
    var $this = $(this),
    cache = (event.cache !== undefined) ? event.cache : true,
    data = $this.data().flexiPanda;
    checkDataFreshness.call(this, data);
    // Only process the item's data if cache is false (meaning the
    // cache is intentionally busted) or if the item has not been
    // processed yet. This function gets called a lot and it 
    // interacts heavily with the DOM, so it should be run without cause.
    if (!cache || !data.processed) {
      data.classes = this.classList;
      var $parentItem = $this.flexiPanda('parentItem'),
      $parentList = $this.flexiPanda('parentList'),
      offset = NaN,
      width = NaN,
      height = NaN,
      client = {
        left: document.documentElement.clientLeft,
        top: document.documentElement.clientTop,
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth
      };
      data.parentItem = $parentItem;
      data.parentList = $parentList;
      data.dimensions = {};
      data.dimensions.client = client;
      // Get the dimensions of the parent list
      if ($parentList.length > 0) {
        offset = $parentList.offset();
        width = $parentList.width();
        height = $parentList.height();
        data.dimensions.parentList = {
          width: width,
          height: height,
          left: offset.left,
          right: client.width - (offset.left + width),
          top: offset.top,
          bottom: client.height - (offset.top + height)
        };
      }
       // Get the dimensions of the parent item
      if ($parentItem.length > 0) {
        offset = $parentItem.offset();
        width = $parentItem.width();
        height = $parentItem.height();
        data.dimensions.parentItem = {
          width: width,
          height: height,
          top: offset.top,
          bottom: client.height - (offset.top + height)
        };
      }
      offset = $this.offset();
      height = $this.outerHeight(false);
      width = $this.outerWidth(false);
      // These dimensions are calculated as distance from the respective
      // edge of the viewport, not as distance from the left/top origin.
      // This allows us to know if an item is out of bounds if the
      // distance is negative.
      data.dimensions.item = {
        width: width,
        height: height,
        left: offset.left,
        top: offset.top,
        right: (client.width - (offset.left + width)),
        bottom: (client.height - (offset.top + height))
      };
      // The placement of the element if the viewport had no limits.
      data.dimensions.ideal = {};
      if (data.dimensions.parentItem) {
        data.dimensions.ideal.top = data.dimensions.parentItem.top;
        data.dimensions.ideal.bottom = client.height - (data.dimensions.ideal.top + data.dimensions.item.height);
      }
      if (data.dimensions.parentList) {
        /* LTR text */
        if (textDirection === 'ltr' || textDirection === 'undefined') {
          data.dimensions.ideal.left = data.dimensions.parentList.left + data.dimensions.parentList.width;
          data.dimensions.ideal.right = client.width - (data.dimensions.ideal.left + data.dimensions.item.width);
        }
        /* RTL text */
        if (textDirection === 'rtl') {
          data.dimensions.ideal.left = data.dimensions.parentList.left - data.dimensions.parentList.width;
          data.dimensions.ideal.right = client.width - (data.dimensions.ideal.left - data.dimensions.item.width);
        }
      }
      // Mark this item as processed.
      data.processed = true;
    }
  }
  /**
   * Returns a <ul> list from a javascript object.
   */
  function listMaker(data) {
    var $list = $('<div>');
    for (var datum in data) {
      if (data.hasOwnProperty(datum)) {
        var $item = $('<div>');
        $item.append($('<span>', {
          text: datum + ': '
        }));
         // Deal with objects.
        if (typeof(data[datum]) === 'object') {
          // jQuery objects are large and will stall the browse
          // if we try to print them. Just state that this is
          // a jQuery object.
          if (data[datum].jquery) {
            $item.append($('<b>', {
              text: '[jQuery] jQuery object'
            }));
          }
          // Otherwise recurse the function.
          else {
            $item.append(listMaker(data[datum]));
          }
        }
        else {
          $item.append($('<b>', {
            text: '[' + typeof(data[datum]) + '] ' + data[datum]
          }));
        }
        $item.appendTo($list);
      }
    }
    return ($list.children().length > 0) ? $list : $('<span>', {
      text: 'null'
    });
  }
  /**
   * Returns a renderable list of item data for debugging.
   */
  function renderItemData() {
    var $this = $(this),
    data = $this.data().flexiPanda,
    $list = listMaker(data).addClass('fp-data');
    return ($list.children().length > 0) ? $list : $();
  }
  /**
   * Handles window resizes. This should work the same for all menu modes.
   */
  function handleResize(event) {
    $('.fp-wrapper')
    .trigger('reflowed');    
  }
  // private function for debugging
  function getDebugger($element) {
    var $debugger = $element.children('.fp-debug').detach();
    // Make a new debugger or detach the existing one.
    return (!$debugger.length > 0) ? $('<div>').addClass('fp-debug') : $debugger;
  }
  /**
   * Appends a debugger to elements listening to debug events.
   */
  function debug(event) {
    event.stopPropagation();
    var $this = $(this);
    
    var $debugger = getDebugger($this),
        items = $.proxy(renderItemData, this)();
    
    if (items.length > 0) {
      $debugger
      .html(items)
      .css({
        left: 50,
        position: 'absolute'
      })
      .appendTo($this);
    }
  }
  /**
   * Public methods of the flexiPanda plugin.
   */
  var methods = {
    init : function (options) {
      // Add the dir attribute to the HTML element if it does not exist.
      // This is part of RTL language support.
      if ($('html').attr('dir') === undefined) {
        $('html').attr('dir', textDirection);
      }
      // Build main options before element iteration.
      options = $.extend({}, $.fn.flexiPanda.defaults, options);
      // Handle screen resizes
      // This could be made much more efficient in jQuery 1.6+ with Callbacks.
      $(window).bind('resize.flexiPanda', handleResize);
      // Iterate over matched elements.
      return this.each(function () {
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
      });
    },
    clean: function () {
      return this.each(function () {
        // Clean returns the menu to its resting state.
        $(this).trigger('reset');
      });
    },
    // This function doesn't chain correctly yet.
    destroy : function () {
      var $wrapper = this;
      var $menu;
      // Find the wrapper
      if (!$wrapper.hasClass('fp-wrapper')) {
        $wrapper = this.closest('.fp-wrapper');
      }
      $menu = $wrapper.children('.fp-root');
      $debug = $wrapper.find('.fp-debug');
      // Remove event handlers.
      $wrapper.undelegate('.flexiPanda').find('*').each(function () {
        var $this = $(this);
        // Remove fp- namespaced classes.
        $this[0].className = $this[0].className.replace(/\bfp.*?\b/g, '');
      });
      // Remove debug elements.
      $debug.remove();
      // Unwrap the element
      $menu.unwrap();
      // Return the menu item for chaining.
      return this.pushStack($menu.get());
    },
    // Custom traversal functions
    parentItem : function () {
      var data = this.data().flexiPanda,
      parent = $();
      if (data.type === 'item') {
        parent = this.closest('.fp-list').closest('.fp-item');
        return this.pushStack(parent.get());
      }
      if (data.type === 'list') {
        parent = this.closest('.fp-item');
        return this.pushStack(parent.get());
      }
      return this.pushStack(parent.get());
    },
    parentList : function () {
      var data = this.data().flexiPanda,
      parent = $();
      if (data.type === 'item') {
        parent = this.closest('.fp-list').closest('.fp-item').closest('.fp-list');
        return this.pushStack(parent.get());
      }
      if (data.type === 'list') {
        parent = this.closest('.fp-item').closest('.fp-list');
        return this.pushStack(parent.get());
      }
      return this.pushStack(parent.get());
    },
    childLists: function () {
      var children = $();
      // Just return if this is zero length.
      if (this.length === 0) {
        return this.pushStack(children.get());
      }
      var data = this.data().flexiPanda;
      if (data.type === 'item') {
        children = this.children('.fp-list');
        return this.pushStack(children.get());
      }
      if (data.type === 'list') {
        children = this.children('.fp-item').children('.fp-list');
        return this.pushStack(children.get());
      }
      // Just return a null set if none of the cases match.
      return this.pushStack(children.get());
      
    },
    root : function () {
      return this.pushStack(this.closest('.fp-root').get());
    },
    wrapper : function () {
      return this.pushStack(this.closest('.fp-wrapper').get());
    }
  };

  // Add the plugin to the jQuery fn object.
  $.fn.flexiPanda = function (method) {
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.flexiPanda');
    }
  };
    
  // FlexiPanda plugin defaults.
  $.fn.flexiPanda.defaults = {
    dev: true,
    delays: {
      menu: 1000,
      item: 200
    },
    mode: 'hover',
    'hide-levels-after': 1,
    'position-levels-after': 2,
    orientation: 'horizontal',
    debug: false,
    edge: {
      tolerance: 10,
      buffer: 14
    },
    'menu-handles': {
      show: true,
      content: ''
    }
  };
}