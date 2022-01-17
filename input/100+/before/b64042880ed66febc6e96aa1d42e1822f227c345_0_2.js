function(fieldId, value) {
		if (fieldId == 'synonyms') {
			//            console.log('synonyms');
			this.addSynonyms(value);
		} else if (fieldId == 'keywords') {
			//            console.log('keywords');
			this.addKeywords(value);
		} else if (fieldId == 'organism') {
			//            console.log('organism');
			this.addOrganism(value);
		} else if (fieldId == 'pdbIdPage') {
			this.addPDBImage(value);
		} else {
console.log('standard field: '+fieldId+' -> '+value);
			var field = this.down('#' + fieldId);
			if (field != null) {
        field.setValue(value);
        field.show();
      }

		}
	}