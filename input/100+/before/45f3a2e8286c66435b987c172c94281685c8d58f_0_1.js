function(done){
            app = connect()
                .use(connect.bodyParser())
                  .use(connect.cookieParser('barley Waterloo Napoleon Mareschal Foch'))
                  .use(connect.session({ store: new RedisStore }))

            app.use('/username',cas_validate.username)

            // note that ssoff has to go first, because otherwise the
            // CAS server itself doesn't have a valid session!
            app.use(cas_validate.ssoff())
            app.use(cas_validate.ticket({'cas_host':chost
                                         ,'service':'http://lysithia.its.uci.edu:'+testport}))
            app.use(cas_validate.check_or_redirect({'cas_host':chost
                                         ,'service':'http://lysithia.its.uci.edu:'+testport}))

            app.use('/',function(req, res, next){
                      res.end('hello world')
            });
            server=app.listen(testport
                       ,done)
        }