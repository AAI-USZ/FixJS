function(path, options) {
  // If no path is provided, treat path param as options.
  if (path && path.data && path.data.isRenderData) {
    options = path;
    path = undefined;
    ember_assert("You cannot pass more than one argument to the collection helper", arguments.length === 1);
  } else {
    ember_assert("You cannot pass more than one argument to the collection helper", arguments.length === 2);
  }

  var fn = options.fn;
  var data = options.data;
  var inverse = options.inverse;

  // If passed a path string, convert that into an object.
  // Otherwise, just default to the standard class.
  var collectionClass;
  collectionClass = path ? getPath(this, path) : Ember.CollectionView;
  ember_assert(fmt("%@ #collection: Could not find %@", data.view, path), !!collectionClass);

  var hash = options.hash, itemHash = {}, match;

  // Extract item view class if provided else default to the standard class
  var itemViewClass, itemViewPath = hash.itemViewClass;
  var collectionPrototype = get(collectionClass, 'proto');
  delete hash.itemViewClass;
  itemViewClass = itemViewPath ? getPath(collectionPrototype, itemViewPath) : collectionPrototype.itemViewClass;
  ember_assert(fmt("%@ #collection: Could not find %@", data.view, itemViewPath), !!itemViewClass);

  // Go through options passed to the {{collection}} helper and extract options
  // that configure item views instead of the collection itself.
  for (var prop in hash) {
    if (hash.hasOwnProperty(prop)) {
      match = prop.match(/^item(.)(.*)$/);

      if(match) {
        // Convert itemShouldFoo -> shouldFoo
        itemHash[match[1].toLowerCase() + match[2]] = hash[prop];
        // Delete from hash as this will end up getting passed to the
        // {{view}} helper method.
        delete hash[prop];
      }
    }
  }

  var tagName = hash.tagName || collectionPrototype.tagName;

  if (fn) {
    itemHash.template = fn;
    delete options.fn;
  }

  if (inverse && inverse !== Handlebars.VM.noop) {
    var emptyViewClass = Ember.View;

    if (hash.emptyViewClass) {
      emptyViewClass = Ember.View.detect(hash.emptyViewClass) ?
                          hash.emptyViewClass : getPath(this, hash.emptyViewClass);
    }

    hash.emptyView = emptyViewClass.extend({
      template: inverse,
      tagName: itemHash.tagName
    });
  }

  if (hash.preserveContext) {
    itemHash.templateContext = Ember.computed(function() {
      return get(this, 'content');
    }).property('content');
    delete hash.preserveContext;
  }

  hash.itemViewClass = Ember.Handlebars.ViewHelper.viewClassFromHTMLOptions(itemViewClass, itemHash, this);

  return Ember.Handlebars.helpers.view.call(this, collectionClass, options);
}