function (id /*, filename */) {
	var script = module.parent.filename
	var filename = path.join(
			path.dirname( script )
		, (arguments[1] || 'data') + '.json'
		)
	var data = path.existsSync(filename)
		? require(filename)
		: {}

	function done (results) {
		data[id] = results

		fstream.Writer({ path: filename })
			.on('close', function () {
				console.log('Data written out to %s', filename)
			})
			.end( JSON.stringify(data) )
	}

	// Overload bench's main function
	bench.runMain = function () {
		var exp = require.main.exports

		exp.done = exp.done || done

		return main.apply(this, arguments)
	}

	return bench
}