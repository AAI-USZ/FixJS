function (elem) {
					// e.g., function(data){ AlgorithmX(data).perform(); }
					data = elem.callback.call(data);
				}