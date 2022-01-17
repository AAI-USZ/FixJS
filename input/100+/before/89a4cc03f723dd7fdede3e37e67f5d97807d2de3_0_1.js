function() {
  app.use( express.logger( CONFIG.logger ) )
    .use( express.static( WWW_ROOT, JSON.parse( JSON.stringify( CONFIG.staticMiddleware ) ) ) )
    .use( express.static( PUBLISH_DIR, JSON.parse( JSON.stringify( CONFIG.staticMiddleware ) ) ) )
    .use( express.bodyParser() )
    .use( express.cookieParser() )
    .use( express.session( CONFIG.session ) )
    .use( stylus.middleware({
      src: WWW_ROOT
    }))
    /* Show Zeus who's boss
     * This only affects requests under /api and /browserid, not static files
     * because the static file writes the response header before we hit this middleware
     */
    .use( function( req, res, next ) {
      res.header( 'Cache-Control', 'no-store' );
      return next();
    })
    .set('view options', {layout: false});
}