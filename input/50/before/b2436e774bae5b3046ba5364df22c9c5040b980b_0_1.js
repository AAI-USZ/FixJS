function(opt, params) {
	opt.headers['Authorization'] = 'QBox ' + conf.ACCESS_KEY + ':' + checksum(opt, params)
}