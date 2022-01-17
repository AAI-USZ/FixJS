function setup() {

    // Simulate a broken package.json
    useAppFixture('{ "name": "example-app", "subdomain": "example-app", }');

    jitsu.prompt.override.answer = 'yes';
    jitsu.prompt.override.name = 'example-app';
    jitsu.prompt.override.subdomain = 'example-app';
    jitsu.prompt.override.version = '0.0.0-1';
    jitsu.prompt.override['scripts.start'] = 'server.js';
    jitsu.prompt.override['engines.node'] = '0.6.x';

    nock('http://api.mockjitsu.com')
      .filteringRequestBody(function (route) {
        return '*';
      })
      .post('/apps/tester/example-app/snapshots/0.0.0-2', '*')
        .reply(200, {
          app: { state: 'stopped' }
        }, { 'x-powered-by': 'Nodejitsu' })

    nock('http://api.mockjitsu.com')
      .post('/apps/tester/example-app/available', {
        name: 'example-app',
        subdomain: 'example-app',
        scripts: {
          start: 'server.js'
        },
        version: '0.0.0-1',
        engines: {
          node: '0.6.x'
        }
      })
        .reply(200, {
          available: true,
        }, { 'x-powered-by': 'Nodejitsu' })
      .get('/apps/tester/example-app')
        .reply(200, {
          app: {
            name: 'example-app', 
            state: 'stopped', 
            subdomain:'example-app', 
            scripts: { start: './server.js' }, 
            snapshots: [{ filename: 'FILENAME' }] 
          }
        }, { 'x-powered-by': 'Nodejitsu' })
      .put('/apps/tester/example-app', {
          name: 'example-app',
          subdomain: 'example-app',
          scripts: {
            start: 'server.js'
          },
          version: '0.0.0-2',
          engines: { node: '0.6.x' }
        })
        .reply(200, {
          app: { state: 'stopped' }
        }, { 'x-powered-by': 'Nodejitsu' })
      .post('/apps/tester/example-app/snapshots/0.0.0-2/activate', {})
        .reply(200, {
          app: {
            name: 'example-app',
            subdomain: 'example-app',
            scripts: { start: 'server.js' },
            version: '0.0.0-2'
          }
        }, { 'x-powered-by': 'Nodejitsu' })
      .post('/apps/tester/example-app/stop', {})
        .reply(200, {
          app: {
            name: 'example-app',
            subdomain: 'example-app',
            scripts: { start: 'server.js' },
            version: '0.0.0-2'
          }
        }, { 'x-powered-by': 'Nodejitsu' })
      .post('/apps/tester/example-app/start', {})
        .reply(200, {
          app: {
            name: 'example-app',
            subdomain: 'example-app',
            scripts: { start: 'server.js' },
            version: '0.0.0-2'
          }
        }, { 'x-powered-by': 'Nodejitsu' })
      .get('/apps/tester/example-app')
        .reply(200, {
          app: {
            name: 'example-app',
            subdomain: 'example-app',
            scripts: { start: 'server.js' },
            version: '0.0.0-1'
          }
        }, { 'x-powered-by': 'Nodejitsu' });

  }