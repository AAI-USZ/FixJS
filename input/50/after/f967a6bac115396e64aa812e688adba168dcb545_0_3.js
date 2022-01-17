function (e, root) {
				if (e instanceof Object)
					throw e;
				fn(e, root);
				if (e instanceof Object)
					throw e;
			}