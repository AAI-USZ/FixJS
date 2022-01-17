function() {
		this.groupMap = {};

		var store 		= this.getStore(),
				prevGroup	= '',
				sc				= store.getCount(),
				i;

    if (! sc)
      return;

		// build temporary map of group string to store index from store records
		for (i = 0; i < sc; i++ )
		{
			var groupId = store.getGroupString(store.getAt(i)).toUpperCase();
			if ( this.groupMap[groupId] === undefined )
			{
				this.groupMap[groupId] = { index: i, closest: groupId, prev: prevGroup } ;
				prevGroup = groupId;
			}
		}

		// now make sure our saved map has entries for every index string
		// in our index bar, if we have a bar.
		if (!!this.getIndexBar())
		{
			this.groupIndexMap = {};

			var l				= 0,
					letters	= this.getIndexBar().getLetters(),
					bc			= letters.length,
          key;

			for (i = 0; i < sc; i++ )
			{
				var groupstring = store.getGroupString(store.getAt(i));

				// groupstring can be empty
				if (groupstring.length)
					key = groupstring[0].toUpperCase();
				else
					key = '';

				if (letters.indexOf(key) === -1)
				{
					key = letters[0];
				}

				if (this.groupIndexMap[key] === undefined)
				{
					var prevIdx = Math.max(i - 1, 0);

					for (;letters[l] !== key; l++)
					{
						if (this.groupIndexMap[letters[l]] === undefined)
						{
								this.groupIndexMap[letters[l]] = prevIdx;
						}
					}
					l++;

					this.groupIndexMap[key] = i;
				}
			}
			for (;l < bc; l++)
			{
				this.groupIndexMap[letters[l]] = sc - 1;
			}
		}
		else
		{
			this.groupIndexMap = this.groupMap;
		}
	}