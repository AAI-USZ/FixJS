function getAsset (file) {

	return require('fs').readFileSync(process.env.NODE_PATH + 'milo/libraries/milo/assets/' + file, 'utf-8');

}