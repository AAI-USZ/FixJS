function (page, sortBy) {
		
			var fieldsValues = new Array ();

			fieldsValues[fieldsValues.length] = "languageId";
			
			if(this.languageId == '')
				fieldsValues[fieldsValues.length] = this.htmlPageLanguage.value;
			else
				fieldsValues[fieldsValues.length] = this.languageId;
		
			for (var h = 0; h < this.currentStructureFields.length; h++) {
				
				var field = this.currentStructureFields[h];
				var fieldId = this.structureVelVar + "." + field["fieldVelocityVarName"] + "Field";
				var formField = document.getElementById(fieldId);
				if(formField == null) {
					fieldId=fieldId+this.dialogCounter;
					formField = document.getElementById(fieldId);
				}
				var fieldValue = "";
			
				if(formField != null){
					if(field["fieldFieldType"] == 'select'){

						var tempDijitObj = dijit.byId(formField.id);
						fieldsValues[fieldsValues.length] = this.structureVelVar+"."+field["fieldVelocityVarName"];
						fieldsValues[fieldsValues.length] = tempDijitObj.get('value');

					}else if(formField.type=='select-one' || formField.type=='select-multiple') {
						
					     var values = "";
					     for (var i=0; i<formField.options.length; i++) {
						    if (formField.options[i].selected) {
						      fieldsValues[fieldsValues.length] = this.structureVelVar+"."+field["fieldVelocityVarName"];
		  			  	      fieldsValues[fieldsValues.length] = formField.options[i].value;						      
						    }
						  }						  				  	
					}else {
						fieldsValues[fieldsValues.length] = this.structureVelVar+"."+field["fieldVelocityVarName"];
						fieldsValues[fieldsValues.length] = formField.value;						
					}
				}				
			}

			if (this.hasHostFolderField) {
				var fieldId='FolderHostSelector'+this.dialogCounter;
				if(!isInodeSet(dijit.byId(fieldId).attr('value'))){
				    this.hostField.value = "";
				    this.folderField.value = "";
				  }else{
				    var data = dijit.byId(fieldId).attr('selectedItem');
					if(data["type"]== "host"){
						this.hostField.value =  dijit.byId(fieldId).attr('value');
						this.folderField.value = "";
					}else if(data["type"]== "folder"){
						this.hostField.value = "";
					    this.folderField.value =  dijit.byId(fieldId).attr('value');
				    }		    
				  }
				
				var hostValue = this.hostField.value;
				var folderValue = this.folderField.value;
				if (isInodeSet(hostValue)) {
					fieldsValues[fieldsValues.length] = "conHost";
					fieldsValues[fieldsValues.length] = hostValue;
				}
				if (isInodeSet(folderValue)) {
					fieldsValues[fieldsValues.length] = "conFolder";
					fieldsValues[fieldsValues.length] = folderValue;
				}				
			}
			
			if(this.radiobuttonsIds[this.dialogCounter]) {
		        for(var i=0;i < this.radiobuttonsIds[this.dialogCounter].length ;i++ ){
					var formField = document.getElementById(this.radiobuttonsIds[this.dialogCounter][i]);
					if(formField != null && formField.type=='radio') {
					    var values = "";
						if (formField.checked) {
							values = formField.value;
							fieldsValues[fieldsValues.length] = formField.name;
							fieldsValues[fieldsValues.length] = values;
						}
					}
				}
			}
			
			if(this.checkboxesIds[this.dialogCounter]) {
				for(var i=0;i < this.checkboxesIds[this.dialogCounter].length ;i++ ){
					var formField = document.getElementById(this.checkboxesIds[this.dialogCounter][i]);
					if(formField != null && formField.type=='checkbox') {
					    var values = "";
						if (formField.checked) {
							values = formField.value;
							name = formField.name.substring(0,formField.name.length-1);
							fieldsValues[fieldsValues.length] = name;
							fieldsValues[fieldsValues.length] = values;
						}
					}
				}
			}
			
			var categoriesValues = new Array ();
			var form = this.search_form; 
			var categories = form.categories;
			if (categories != null) {
				if (categories.options != null) {
					var opts = categories.options;
					for (var j = 0; j < opts.length; j++) {
						var option = opts[j];
						if (option.selected) {
							categoriesValues[categoriesValues.length] = option.value;
						}
					}
				} else {
					for (var i = 0; i < categories.length; i++) {
						var catSelect = categories[i];
						var opts = catSelect.options;
						for (var j = 0; j < opts.length; j++) {
							var option = opts[j];
							if (option.selected) {
								categoriesValues[categoriesValues.length] = option.value;
							}
						}
					}
				}
			}

			if (page == null)
				this.currentPage = 1;
			else 
				this.currentPage = page;

			if (sortBy != null) {
				if (sortBy == this.currentSortBy)
					sortBy = sortBy + " desc";
				this.currentSortBy = sortBy;
			}
			
			ContentletAjax.searchContentlets (this.structureInode, fieldsValues, categoriesValues, false, false, this.currentPage, this.currentSortBy, null, null, false, dojo.hitch(this, this._fillResults));

			this.searchCounter++; // this is used to eliminate the widget already registered exception upon repeated searchs.
		}