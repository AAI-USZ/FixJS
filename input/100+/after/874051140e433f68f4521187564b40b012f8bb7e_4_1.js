function () {
			var key, value, index, enabled;
			index = $(this).attr("id").replace(/^nodeAttributeLabel/, "");
			key = $(this).html();

			if ($("#nodeAttribute" + index).length > 0) {
				value = $("#nodeAttribute" + index).val();
			} else {
				assert(index in multiInputs);
				value = multiInputs[index].val();
			}

			// TODO: check choice attributes here too
			if (schemaAttributes.hasOwnProperty(key) &&
					schemaAttributes[key].alwaysOutput === true) {
				enabled = true;
			} else if (schemaAttributes.hasOwnProperty(key) &&
					schemaAttributes[key].hasOwnProperty("defaultValue")) {
				enabled = (value !== schemaAttributes[key].defaultValue);
			} else {
				enabled = nodeData.attributes[index].enabled;
			}

			nodeData.attributes[index] = {
				key : key,
				value : value,
				enabled : enabled
			};
		}