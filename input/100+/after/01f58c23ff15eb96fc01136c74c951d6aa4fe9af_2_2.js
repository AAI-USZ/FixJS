function startApp(opts) {
    con.debug('Create HTTP server');
    var app = express.createServer({
        ca: [ fs.readFileSync(caCertFile) ],
        key: fs.readFileSync(serverKeyFile),
        cert: fs.readFileSync(serverCertFile),
        requestCert: true,
    });

    app.get(/\/register\/([0-9a-f-]+)$/, register);
    app.post('/newtoken', newtoken);
    app.post(/\/users\/([a-z0-9_-]+)$/, newuser);
    app.del(/\/users\/([a-z0-9_-]+)$/, deluser);
    app.get('/store', listfiles);
    app.put(/\/store\/([0-9a-z_.-]+)$/, putfile);
    app.get(/\/store\/([0-9a-z_.-]+)$/, getfile);
    app.get(/\/extra\/([0-9a-z_.-]+)$/, getExtraFile);
    app.get(/\/pkg/, getPkg);
    app.listen(opts.port);
    con.info('Server listening on port ' + opts.port);
}