function(from, to)
	{
		if(this._semantics == null)
			throw("Exception: You have to provide semantics for the path finding");

		var path = [];
		var start = this._newNode(from, null, -1,-1,-1);
		var open = new PriorityQueue();
		open.push(start, 0);
		while(open.size() > 0)
		{
			var currentNode = open.pop();
			if(this._semantics.ReachedDestination(currentNode.point, to))
			{
				while(currentNode != null)
				{
					path.unshift(currentNode.point);
					currentNode = currentNode.parent;
				}
				break;
			}

			if (currentNode.closed)
				continue;

			currentNode.closed = true;

			var neighbours = this._semantics.GetNeighbours(currentNode.point);
			for (var i = 0; i < neighbours.length; i++)
			{
				var nextPoint = neighbours[i];
				var id = this._semantics.GetKey(nextPoint);
				var nextNode = this._nodes[id] || this._newNode(nextPoint, currentNode, -1, -1, -1);

				if (nextNode.closed)
					continue;

				var g = this._semantics.GetMovementCost(currentNode.point, nextPoint);
				if (nextNode.g >= 0 && nextNode.g <= g)
					continue;

				nextNode.parent = currentNode;
				nextNode.g = g;
				nextNode.h = this._semantics.GetHeuristicCost(nextPoint, to);
				nextNode.f = nextNode.g + nextNode.h;
				open.push(nextNode, nextNode.f);
			}
		}

		this._nodes = {};
		return path;
	}