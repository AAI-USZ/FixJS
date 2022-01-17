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
    // Trigger debugging.
    .trigger('debug', {enable: options.debug});
    
    $li
    // Establish item data.
    .trigger('refresh')
    // Trigger debugging.
    .trigger('debug', {enable: options.debug});
  }