function () {
    //console.error(require('util').inspect(a, true, 10))
    // TODO: Handle 'variadic' arg functions (NSLog), will require
    //       a "function generator" to get a Function from the passed
    //       in args (and guess at the types that were passed in...)
    var isInline = node.attr('inline')
    if (isInline && isInline.value() === 'true') {
      debug('function declared as an inline function pointer:', name)
      assert.ok(fw.inline, name + ', ' + fw.name
        + ': declared inline but could not find inline dylib!')
    }
    node.args = []
    node.childNodes().forEach(function (n, i) {
      var type = n.name()
      //console.error(i, type, n.toString())
      switch (type) {
        case 'arg':
          node.args.push(flattenNode(n))
          break;
        case 'retval':
          node.retval = flattenNode(n)
          break;
        default:
          break;
      }
    })
    //console.error(node)
    debug('loading function pointer for:', name)
    var ptr = (isInline ? fw.inline : fw.lib).get(name)
      , unwrapper = IMP.createUnwrapperFunction(ptr, node)
    unwrapper.info = node
    delete _global[name]
    return _global[name] = unwrapper
  }