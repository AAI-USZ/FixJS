f      if (!/http[s]?/.test(router[path])) {
        router[path] = (self.target.https ? 'https://' : 'http://')
          + router[path];
      }

      var target = url.parse(router[path]),
          defaultPort = self.target.https ? 443 : 80;

      //
      // Setup a robust lookup table for the route:
      //
      //    {
      //      source: {
      //        regexp: /^foo.com/i,
      //        sref: 'foo.com',
      //        url: {
      //          protocol: 'http:',
      //          slashes: true,
      //          host: 'foo.com',
      //          hostname: 'foo.com',
      //          href: 'http://foo.com/',
      //          pathname: '/',
      //          path: '/'
      //        }
      //    },
      //    {
      //      target: {
      //        sref: '127.0.0.1:8000/',
      //        url: {
      //          protocol: 'http:',
      //          slashes: true,
      //          host: '127.0.0.1:8000',
      //          hostname: '127.0.0.1',
      //          href: 'http://127.0.0.1:8000/',
      //          pathname: '/',
      //          path: '/'
      //        }
      //    },
      //
      self.routes.push({
        source: {
          regexp: new RegExp('^' + path, 'i'),
          sref: path,
          url: url.parse('http://' + path)
        },
        target: {
          sref: target.hostname + ':' + (target.port || defaultPort) + target.path,
          url: target
        }
      });
    });
