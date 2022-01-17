function (e, root) {
				fn(e, root);
				if (e instanceof Object)
					throw e;
			}