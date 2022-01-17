function(entity, from, to)
	{
		if(this.Semantics === null)
			throw("Exception: You have to provide semantics for the path finding");

		var path = [];
		var open = new PriorityQueue();
		var starts = this.Semantics.PrePath(entity, from, to);
		if (!starts)
			throw ("PrePath must return a list of starting points");

		for (var i = 0; i < starts.length; i++)
		{
			var start = starts[i];
			var g = start.cost;
			var h = this.Semantics.GetHeuristicCost(start.point, to)
			var f = g + h;
			var startNode = this._newNode(start.point, null, g, h, f);

			if (start.closed)
				startNode.closed = true;
			else
				open.push(startNode, f);
		}

		while(open.size() > 0)
		{
			var currentNode = open.pop();
			if(this.Semantics.ReachedDestination(entity, currentNode.point, to))
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

			var neighbours = this.Semantics.GetNeighbours(currentNode.point);
			for (var i = 0; i < neighbours.length; i++)
			{
				var nextPoint = neighbours[i];
				var id = this.Semantics.GetKey(nextPoint);
				var nextNode = this._nodes[id] || this._newNode(nextPoint, currentNode, -1, -1, -1);

				if (nextNode.closed)
					continue;

				var g = this.Semantics.GetMovementCost(currentNode.point, nextPoint) + currentNode.g;
				if (nextNode.g >= 0 && nextNode.g <= g)
					continue;

				nextNode.parent = currentNode;
				nextNode.g = g;
				nextNode.h = this.Semantics.GetHeuristicCost(nextPoint, to);
				nextNode.f = nextNode.g + nextNode.h;
				open.push(nextNode, nextNode.f);
			}
		}

		this.Semantics.PostPath(from, to, path);
		this._nodes = {};
		return path;
	}