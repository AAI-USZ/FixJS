function updateRealInnerWidth(components, options) {
    // find out the real inner width of the root
    //    (real inner width = total width of all children put on the same row)
    components.containerWidth = 0;
    components.container
      .children()
      .each(function() {
        components.containerWidth += $(this).outerWidth(true);
        console.log( $(this).outerWidth(), $(this).outerWidth(true) );
      });
    components.container.css({
      position: 'relative',
      left: 0,
      width: components.containerWidth
    });
  }