function getAsset (file) {
	var miloPath = getMiloPath();
	return require('fs').readFileSync(miloPath + 'libraries/milo/assets/' + file, 'utf-8');

}