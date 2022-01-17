function (i, choiceRef) {
			var define = defineProperties[choiceRef];
			$.each(define.attributes, function () {
				node.choices.push(define.attributes);
				return false;
			});
		}