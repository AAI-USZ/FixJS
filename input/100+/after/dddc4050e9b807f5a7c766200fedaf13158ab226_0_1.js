function initServer()
{
	var filespath;

	klServer = mod_restify.createServer({
	    'name': klName,
	    'log': klLog
	});

	klServer.use(mod_restify.authorizationParser());
	klServer.use(mod_restify.acceptParser(klServer.acceptable));
	klServer.use(mod_restify.queryParser());
	klServer.use(mod_restify.urlEncodedBodyParser());

	klServer.get('/kang/.*', mod_kang.knRestifyHandler({
	    'uri_base': '/kang',
	    'service_name': 'kartlytics',
	    'version': '0.0.1',
	    'ident': mod_os.hostname(),
	    'list_types': kangListTypes,
	    'list_objects': kangListObjects,
	    'get': kangGetObject
	}));

	filespath = mod_path.normalize(mod_path.join(__dirname, '..', 'www'));

	klServer.get('/', fileServer.bind(
	    null, mod_path.join(filespath, 'index.htm')));
	klServer.get('/resources/.*', dirServer.bind(null, '/resources/',
	    mod_path.join(filespath, 'resources')));
	klServer.post('/kart/video', auth, upload);
	klServer.get('/api/videos', apiVideosGet);
	klServer.get('/api/files/:id/.*\.mov', apiFilesGetVideo);
	klServer.get('/api/files/:id/pngs/.*', apiFilesGetFrame);
	klServer.put('/api/videos/:id', auth,
	    mod_restify.bodyParser({ 'mapParams': false }), apiVideosPut);
	klServer.put('/api/videos/:id/rerun', auth, apiVideosRerun);

	// klServer.on('after', mod_restify.auditLogger({ 'log': klLog }));

	klServer.listen(klPort, function () {
		klLog.info('%s server listening at %s',
		    klServer.name, klServer.url);
	});
}