function (body, file) {
            var name =  Math.floor(Math.random() * Math.pow(2,32)).toString(16);
			return 'var dust = require("dust"); ' + dust.compile(body, name) + ';module.exports = function(c, cb){dust.render("' + name + '", c, cb)}';
		}