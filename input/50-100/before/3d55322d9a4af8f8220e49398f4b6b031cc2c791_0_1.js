function(attributesLong, id, rowData) {
			s = '<select '+attributesLong+' multiple>';
			for (x in rowData.options) {
				s += '<option value="'+x+'"'+( rowData.value != null && $.inArray(x, rowData.value.split(',')) != -1 ? ' selected' : '' )+'>'+rowData.options[x]+'</option>';
			};
			s+= '</select>';
			return s;
		}