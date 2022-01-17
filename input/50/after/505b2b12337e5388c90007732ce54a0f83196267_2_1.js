function (path) {
			ASSERT(typeof path === "string");

			return path.length === 0 ? [] : path.split("/").reverse();
		}