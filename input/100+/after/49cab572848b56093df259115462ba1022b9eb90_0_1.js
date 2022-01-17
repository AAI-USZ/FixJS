function(id, entity, oldentity, fn, errFn) {
    // adjust arguments if 'oldentry' is not specified
    if (Arguments.isNonNull(oldentity) && $.isFunction(oldentity)) {
      if (Arguments.isNonNull(fn) && $.isFunction(fn)) {
        errFn = fn;
      }
      fn = oldentity;
      oldentity = undefined;
    }

    Arguments.assertNonNull(id, conf.name + ".update: expect argument 'entryId'.");
    Arguments.assertNonNull(entity, conf.name + ".update: expect argument 'newentry'.");

    fn = CRUDs.getCheckedFn(fn);
    errFn = CRUDs.getCheckedErrorFn(errFn);

    var url = myconf.url + '/' + encodeURIComponent(id) + '/';
    var json = myconf.baredata? entity: {entity: entity, oldentity: oldentity};
    var data = JSON.stringify(json);
    var ajaxFn = function(data) {
      var id = conf.getId(data);
      fn(id, data);
    };
    var options = {
      type: 'PUT', method: "update", url: url, data: data, entity: entity,        
    };
    ajaxcommon(options, ajaxFn, errFn);
  }