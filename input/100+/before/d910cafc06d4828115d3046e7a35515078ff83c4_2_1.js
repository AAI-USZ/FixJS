function(n)
		{
			for (var i = SERVICES.length - 1; i >= 0; i--) {
				if (n == SERVICES[i]['name']) {
					catSchema = SERVICES[i]; break;
				}
			}
			category = null;
			for (var i = ORG_DATA.inv.length - 1; i >= 0; i--){
				if (n == ORG_DATA.inv[i]['name']) {
					category = ORG_DATA.inv[i]; break;
				}
			};
			$('.modal-inventory fieldset').empty();
			$('.modal-inventory h3').text(capitalize(catSchema.name));
			for (var i=0; i < catSchema.fields.length; i++) {
				var fld = catSchema.fields[i];
				var val = getOrgFieldData(fld);
				var opt = '<label>' + fld;
					opt+= '<input class="input.input-xlarge", type="text", value="'+(val ? val.total : 0)+'", onkeydown="restrictInputFieldToNumbers(event)" />';
					opt+="</label>";
				$('.modal-inventory fieldset').append(opt);
			};
			editor.modal('show');
    	}