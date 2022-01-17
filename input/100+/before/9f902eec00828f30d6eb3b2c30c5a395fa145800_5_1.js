function(Zipkin) {

  var bind = function(target, fn) {
    return function() {
      return fn.apply(target, arguments);
    };
  };

  var shallowCopy = function(arr) {
    var copied = [];
    for(var i = 0; i < arr.length; i++) { copied.push(arr[i]); }
    return copied;
  };

  /**
   * Add a key/value pair to a dictionary whose default value
   * is an empty array
   */
  var defaultDictPush = function(dict, key, value) {
    if (!dict.hasOwnProperty(key)) {
      dict[key] = [];
    }
    dict[key].push(value);
  };

  /**
   * Get the array associated with a key with default of an empty array
   */
  var defaultDictGet = function(dict, key) {
    if (dict.hasOwnProperty(key)) {
      return dict[key];
    } else {
      return [];
    }
  };

  /**
   * Parses the page query params and stuffs them into an object
   */
  var queryParams = function() {
    var arr = [];
    var str = location.search.substring(1);
    str = decodeURIComponent(str);
    $.each(str.split("&"), function(i, pair) {
      var index = pair.indexOf("=");
      if (index !== -1) {
        arr.push([pair.substring(0, index), pair.substring(index+1)]);
      }
    });
    return arr;
  };

  /**
   * Convenience method for using Hogan templates. If we have already
   * fetched the template, initiate the callback. Otherwise, fetch it
   * before invoking the callback.
   */
  var templates = {};
  var templatize = function(name, callback) {
    if(templates.hasOwnProperty(name)) {
      callback(templates[name]);
    } else {
      $.ajax({
        type: 'GET',
        url: root_url + 'public/templates/' + name + '.mustache',
        success: function(data){
          templates[name] = Hogan.compile(data);
          callback(templates[name]);
        }
      });
    }
  };

  var TEMPLATES = {
    GET_TRACE          : "get-trace",
    ONEBOX_LEFT        : "onebox-left",
    ONEBOX_RIGHT       : "onebox-right",
    QUERY              : "query",
    SERVICE_TAG        : "service-tag",
    SPAN_DETAILS       : "span-details"
  };

  return {
    bind: bind,
    shallowCopy: shallowCopy,
    defaultDictPush: defaultDictPush,
    defaultDictGet: defaultDictGet,
    queryParams: queryParams,
    templatize: templatize,
    TEMPLATES: TEMPLATES
  };
}