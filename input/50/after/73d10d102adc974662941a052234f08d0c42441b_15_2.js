function (i, choice) {
			$.each(choice.refs, function (i2, ref) {
				var define = defineProperties[ref];
				attributesMerge(choice.attributes, define.attributes);
			});
			//delete choice.refs;
		}