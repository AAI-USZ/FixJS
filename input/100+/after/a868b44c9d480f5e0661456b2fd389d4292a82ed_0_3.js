function(element, options) {
    var e, obj, template;
    e = element;
    template = '<ul class="typeahead dropdown-menu"><li>xxx</li></ul>';
    obj = {};
    obj.show = function() {
      return console.log("obj", e);
    };
    return obj;
  }