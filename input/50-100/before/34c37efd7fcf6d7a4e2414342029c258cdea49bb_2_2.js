function (node) {
			ASSERT(isValid(node));

			return Object.keys(node.data);
		}