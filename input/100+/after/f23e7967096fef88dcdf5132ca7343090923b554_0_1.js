function env(options) {
  var ctx = {
    extras:  {},
    helpers: {},
    origin: {
      http:     options.http,
      realtime: options.realtime
    },
    skip: (options.skip || []).slice(),
    // FIXME: should be filled by session middleware
    session: options.session || {
      theme:  'desktop',
      locale: nodeca.config.locales['default']
    },
    request: {
      // FIXME: should be deprecated in flavour of env.origin
      origin:     !!options.realtime ? 'RT' : 'HTTP',
      method:     options.method,
      namespace:  options.method.split('.').shift()
    },
    data: {},
    response: {
      data: {
        head: {
          title: null, // should be filled with default value
          route: options.method,
          // list of assets for yepnope/inclusion,
          // each element is an object with properties:
          //
          //    type:   css|js
          //    link:   (for yepnope)
          //    text:   (for inclusion)
          //    media:  (for css only)
          //
          // example: assets.push({type: 'js', link: '//example.com/foo.js'});
          assets: []
        },
        menus: {},
        widgets: {}
      },
      headers: {},
      layout: options.layout || 'default',
      view:   options.method
    }
  };

  //
  // env-dependent helper needs to be bounded to env
  //

  ctx.helpers.t = function (phrase, params) {
    return nodeca.runtime.i18n.t(this.session.locale, phrase, params);
  }.bind(ctx);

  //
  // deprecated helpers should go soon
  //

  ctx.t = function () {
    try {
      throw new Error('env.t is deprecated. Use env.heplers.t instead');
    } catch (err) {
      nodeca.logger.warn(err.stack);
      return ctx.helpers.t.apply(null, arguments);
    }
  };

  return ctx;
}