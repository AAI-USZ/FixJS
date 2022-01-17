function addToUnseen(item)
	{
		if(last_unseen.length == MAX_UNSEEN)
		{
			last_unseen.shift();
		}

		last_unseen.push(item);
	}