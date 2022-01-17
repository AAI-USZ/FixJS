function client(request) {
		return when({ request: request, status: { code: 200 }, headers: { 'Content-Type': 'application/json' }, entity: '{"foo":"bar"}' });
	}