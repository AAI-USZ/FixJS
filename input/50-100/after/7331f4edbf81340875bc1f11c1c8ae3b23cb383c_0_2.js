function(callback){

		if (this.keys.key) return callback();
		// this.log("Reading TLS public/private keys...");

		try {

			this.keys.key = fs.readFileSync(common.private_key_path).toString();
			this.keys.cert = fs.readFileSync(common.certificate_path).toString();
			callback();

		} catch(e) {

			callback(e);

		}

	}