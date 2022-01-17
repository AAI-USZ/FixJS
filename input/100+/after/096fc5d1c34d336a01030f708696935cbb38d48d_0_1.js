function Fragment(data)
{
	/*
	 * Public Accessors
	 *
	 */
	this.getID = function() {return id;};
	this.getName = function() {return name;};
    this.getDesc = function() {return desc;};
	this.getLength = function() {return length;};

	//if the sequence has not already been fetched, it will be streamed, otherwise
	//complete_fn will be called immediately
	this.getSequence = function( update_fn, complete_fn)
	{
		if(sequence!=null)
		{
			complete_fn(sequence);
			return;
		}

		//stream the sequence from the server
		AJAX.stream({
			url: '/fragment/api/' + id + '/getSeq/',
			success: function(data)
			{
				sequence = new String();
				for(i in data)
				{
					if(data[i] != ' ')
						sequence = sequence + data[i];
				}
				complete_fn(sequence);
			},
			type: 'GET',
			error: function(error)
			{
				console.error('Error fetching sequence: ' + error);
			}
		},
		function(data)
		{
			sequence = new String();
			for(i in data)
				{
					if(data[i] != ' ')
						sequence = sequence + data[i];
				}
			update_fn(sequence);
		} );
	};

	//if the metadata has not already been fetched, it will be fetched otherwise
	//complete_fn will be called immediately
	this.getMeta = function(complete_fn)
	{
		if(metadata!=null)
		{
			complete_fn(metadata);
			return;
		}

		//fetch the metadata from the server
		AJAX.post({
			url: '/fragment/api/' + id + '/getMeta/',
			success: function(ret){
				meta = ret;
				complete_fn(ret);
			},
			error: function() {},
		});
	};

	this.setMeta = function(new_meta, success_cb, fail_cb)
	{
		metadata = new_meta;
		AJAX.post({
			url: '/fragment/api/' + id + '/setMeta/',
			success: success_cb,
			error: fail_cb,
			data: metadata,
		});
	};	

	this.getFeats = function(success_fn)
	{
		AJAX.post({
			url: '/fragment/api/' + id + '/getFeats/',
			success: success_fn,
			error: function(err)
			{
				console.error('Error getting features for ' + name);
			},
		});
	};

    this.toString = function()
    {
        return '[Fragment name="' + name + '"]';
    }

	/*
	 *
	 * Private data
	 *
	 */

	var id = data.id;
	var name = data.name;
	var desc = data.desc;
	var length = data.length;

	//Data which might get filled in by subsequent AJAX calls
	var sequence = null;
	var metadata = null;
}