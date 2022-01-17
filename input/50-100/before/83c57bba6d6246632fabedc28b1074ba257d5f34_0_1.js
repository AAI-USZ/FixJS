function(element, index) {
			switch (type) {
				case "equal":
					return element[attribute] === value;
				case "isnot":
					return element[attribute] !== value;
				case "greater":
					return element[attribute] > value;
				case "smaller":
					return element[attribute] < value;
				case "contains" :
					debugger;
					console.log(attribute, element[attribute]);
					return element[attribute].search(new RegExp(value, "i")) !== -1;
			}
		}