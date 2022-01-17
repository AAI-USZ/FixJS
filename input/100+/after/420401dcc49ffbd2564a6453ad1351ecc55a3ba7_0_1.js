function(data) {
	    /* Helper functions to process data. */
	    var procurement = function(d) {
		var row = [];
		row.push({
		    text: d.product.name,
		    hash: 'product:'+d.product.id
		});
		row.push({
		    text: d.country.name,
		});
		var ingredients = [];
		d.product.medicine.ingredients.forEach(function(i) {
		    ingredients.push(i.inn+' '+i.strength);
		});
		row.push({
		    text: ingredients.join(', '),
		    hash: 'medicine:'+d.product.medicine.id
		});
		return row;
	    }
	    /* Populate supplier heading section. */
	    d3.select(fragment)
		.select('#meddb_supplier_heading')
		.text(data.name);
	    /* Populate the supplier detail page. */
	    var details = function() {
		var row = [];
		row.push(data.website || 'None');
		row.push(data.contact || 'None');
		row.push(data.email || 'None');
		row.push(data.altemail || 'None');
		row.push(data.phone || 'None');
		row.push(data.altphone || 'None');
		row.push(data.fax || 'None');
		row.push(data.address || 'None');
		return row;
	    }
	    d3.select(fragment)
		.select('table#meddb_supplier_details')
		.selectAll('td')
		.data(details())
		.text(function(d) { return d; });
	    d3.select(fragment)
		.select('table#meddb_supplier_details')
		.select('td')
	        .data([data.website])
		.style('cursor', 'pointer')
		.on('click', function(d) { if (d) { location = d; } });
	    /* Populate the product registrations table. */
	    var rows = d3.select(fragment)
		.select('table#meddb_supplier_registration')
		.select('tbody')
		.selectAll('tr')
		.data(data.procurements)
		.enter()
		.append('tr');
	    rows.selectAll('td')
		.data(procurement)
		.enter()
		.append('td')
		.text(function(d) { return d.text; })
		.style('cursor', function(d) { if (d.hash) { return 'pointer' } })
		.on('click', function(d) { location.hash = d.hash; });
	    meddb.history.add(location.hash, data.name);
	    meddb.template.show(fragment);
	}