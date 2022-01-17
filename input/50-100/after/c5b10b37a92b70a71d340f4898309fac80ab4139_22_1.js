function sendData(res, data){
	_.assertBuffer(data)
	res.setHeader('Content-Encoding', 'gzip');
	res.setHeader('Content-Length', data.length);
    res.setHeader('Content-Type', 'application/json');
	res.setHeader('Cache-Control', 'max-age=2592000');
	res.send(data);
}