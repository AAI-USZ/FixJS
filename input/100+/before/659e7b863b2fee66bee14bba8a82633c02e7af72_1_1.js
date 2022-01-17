function _addFilter(id, category, name, options) {

    var
    zoomEvent  = options.zoomEvent  || null,
    clickEvent = options.clickEvent || null,
    disabled   = options.disabled   || false;
    source     = options.source     || null;

    if (category === null || !category) {
      category = 'Protected Areas';
    }

    var
    cat  = category.replace(/ /g, "_").toLowerCase(),
    slug = name.replace(/ /g, "_").replace("-", "_").toLowerCase();

    if (!_.include(categories, cat)) {
      var
      template = _.template($("#filter-template").html()),
      $filter  = $(template({ name: category, category: cat, data: cat }));

      $filters.find("ul").append($filter);
      categories.push(cat);
    }

    var
    layerItemTemplate = null,
    $layerItem        = null;

    // Select the kind of input (radio or checkbox) depending on the category
    if (cat === 'forest_clearing') {

      layerItemTemplate = _.template($("#layer-item-radio-template").html());
      $layerItem = $(layerItemTemplate({ name: name, id: id, category: cat, disabled: disabled, source: source }));

      if (!disabled) { // click binding
        $layerItem.find("a:not(.source)").on("click", function() {
          if (!$(this).find(".radio").hasClass("checked")) {
            clickEvent();
            zoomEvent();
          }
        });
      }

    } else {
      layerItemTemplate = _.template($("#layer-item-checkbox-template").html());
      $layerItem = $(layerItemTemplate({ name: name, id: id, category: cat, disabled: disabled, source: source }));

      if (!disabled) { // click binding
        $layerItem.find("a:not(.source)").on("click", function() {
          console.log($(this));
          clickEvent();
          zoomEvent();
        });
      }

    }

    $layer.find(".links").append($layerItem);
    $layerItem.find(".checkbox").addClass(cat);

    // We select the FORMA layer by default
    if ( slug == "semi_monthly" ) {
      $layerItem.find(".radio").addClass('checked');
    }
  }