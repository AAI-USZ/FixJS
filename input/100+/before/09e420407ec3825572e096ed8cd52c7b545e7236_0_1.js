function(aFields, iRow) {
    this.aFields = aFields;
    var i, j, k, aAux, oAux, sDependentFields;
    for (i = 0; i < this.aFields.length; i++) {
      j = iRow || 1;
      switch (this.aFields[i].sType) {
        case 'text':
          while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']')){
            this.aElements.push(
                new G_Text(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j + ']['
                    + this.aFields[i].sFieldName));
            this.aElements[this.aElements.length - 1].validate = this.aFields[i].oProperties.validate;
            if(this.aFields[i].oProperties.strTo) {
              this.aElements[this.aElements.length - 1].strTo = this.aFields[i].oProperties.strTo;
            }
            if (aFields[i].oProperties) {
              this.aElements[this.aElements.length - 1].mask = aFields[i].oProperties.mask;
            }
            j++;
          }
          break;
        
        case 'currency':
          while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']')) {
            this.aElements.push(new G_Currency(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j + ']['
                + this.aFields[i].sFieldName));
            
            if (this.aFields[i].oProperties) {
              if (this.aFields[i].oProperties.comma_separator) {
                this.aElements[this.aElements.length - 1].comma_separator = this.aFields[i].oProperties.comma_separator;
              }
              
              this.aElements[this.aElements.length - 1].mask = this.aFields[i].oProperties.mask;
            }
            
            j++;
          }
          break;
        
        case 'percentage':
          while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']')) {
            this.aElements.push(new G_Percentage(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j
                + '][' + this.aFields[i].sFieldName));
            
            if (this.aFields[i].oProperties) {
              if (this.aFields[i].oProperties.comma_separator) {
                this.aElements[this.aElements.length - 1].comma_separator = this.aFields[i].oProperties.comma_separator;
              }
              
              this.aElements[this.aElements.length - 1].mask = this.aFields[i].oProperties.mask;
            }
            
            j++;
          }
          break;
        
        case 'dropdown':
          while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']')) {
            this.aElements.push(new G_DropDown(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j + ']['
                + this.aFields[i].sFieldName));
            if (aFields[i].oProperties) {
              this.aElements[this.aElements.length - 1].mask = aFields[i].oProperties.sMask;
            }
            j++;
          }
          break;
        
        default:
          while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']')) {
            this.aElements.push(new G_Field(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j + ']['
                + this.aFields[i].sFieldName));
            if (aFields[i].oProperties) {
              this.aElements[this.aElements.length - 1].mask = aFields[i].oProperties.sMask;
            }
            j++;
          }
          break;
      }
    }
    // Set dependent fields
    sw1 = false;
    if (this.allDependentFields == '') sw1 = true; //Check if dependent fields are setted.
    for (i = 0; i < this.aFields.length; i++) {
      j = iRow || 1;
      while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']')) {
        if (aFields[i].oProperties.dependentFields != '') {
          this.setDependents(j, this.getElementByName(j, this.aFields[i].sFieldName), aFields[i].oProperties.dependentFields, sw1);
        }
        j++;
      }
    }
  }