function getMiloPath () {
	var path = require('path');
	return __filename.replace(path.basename(__filename), '');
}