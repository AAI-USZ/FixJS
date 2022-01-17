function (path) {
			ASSERT(path && typeof path === "string");

			return path.length === 0 ? [] : path.split("/").reverse();
		}