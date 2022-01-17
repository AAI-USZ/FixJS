function(oForm, sGridName){
  var oGrid = this;
  this.parent = G_Field;
  this.parent(oForm, '', sGridName);
  this.sGridName = sGridName;
  this.sAJAXPage = oForm.ajaxServer || '';
  this.oGrid = document.getElementById(this.sGridName);
  this.onaddrow = function(iRow){};
  this.ondeleterow = function(){};
  this.executeEvent = function (element,event) {
    if ( document.createEventObject ) {
      // IE
      var evt = document.createEventObject();
      return element.fireEvent('on'+event,evt)
    } else {
      // firefox + others
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true ); // event type,bubbling,cancelable
      return !element.dispatchEvent(evt);
    }
  };

  this.aFields = [];
  this.aElements = [];
  this.aFunctions = [];
  this.aFormulas = [];

  this.allDependentFields = ''; //Stores all dependent fields

  this.countRows = function(){
    return this.aElements.length / this.aFields.length;
  };

  this.getObjectName = function(Name){
    var arr = Name.split('][');
    var aux = arr.pop();
    aux = aux.replace(']','');
    return aux;
  };

  //Begin SetFields ---------------------------------------------------------------------
  this.setFields = function(aFields, iRow) {
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

              this.aElements[this.aElements.length - 1].validate = this.aFields[i].oProperties.validate;
              this.aElements[this.aElements.length - 1].mask     = this.aFields[i].oProperties.mask;
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

              this.aElements[this.aElements.length - 1].validate = this.aFields[i].oProperties.validate;
              this.aElements[this.aElements.length - 1].mask     = this.aFields[i].oProperties.mask;
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
  };
  //End Set Fields --------------------------------------------------------

  ///////////////////////////////////////////////////////////////////////

  this.setDependents = function(iRow, me, theDependentFields, sw) {
    //alert('Row:' + iRow + ' me: ' + me.name + ' DP: ' + theDependentFields);
    var i;
    var dependentFields = theDependentFields || '';
    dependentFields = dependentFields.split(',');
    for (i = 0; i < dependentFields.length; i++) {
      var oField = this.getElementByName(iRow, dependentFields[i]);
      if (oField) {
        me.dependentFields[i] = oField;
        me.dependentFields[i].addDependencie(me);
        if (sw){ //Gets all dependent field only first time
          if (this.allDependentFields != '') this.allDependentFields += ',';
          this.allDependentFields += dependentFields[i];
        }
      }
    }
  };

  //////////////////////////////////////////////////////////////////////

  this.unsetFields = function() {
    var i, j = 0, k, l = 0;
    k = this.aElements.length / this.aFields.length;
    for (i = 0; i < this.aFields.length; i++) {

      j += k;
      l++;
      this.aElements.splice(j - l, 1);
    }
  };

  ////////////////////////////////////////////////////////////////////
  this.getElementByName = function(iRow, sName) {
    var i;
    for (i = 0; i < this.aElements.length; i++) {
      if (this.aElements[i].name === this.sGridName + '][' + iRow + '][' + sName) {
        return this.aElements[i];
      }
    }
    return null;
  };

  /////////////////////////////////////////////////////////////////////

  this.getElementValueByName = function(iRow, sName) {
    var oAux = document.getElementById('form[' + this.sGridName + '][' + iRow + '][' + sName + ']');
    if (oAux) {
      return oAux.value;
    } else {
      return 'Object not found!';
    }
  };

  ////////////////////////////////////////////////////////////////////////

  this.getFunctionResult = function(sName) {
    var oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + this.sGridName + '_' + sName + ']');
    if (oAux) {
      return oAux.value;
    } else {
      return 'Object not found!';
    }
  };

  ////////////////////////////////////////////////////////////////////////

  this.cloneInput = function(oNewObject){
    var txt = oNewObject.parentNode.innerHTML;
    var xClass = 'module_app_input___gray';

    txt = txt.replace('input', '');
    txt = txt.replace('INPUT', '');
    txt = txt.replace('<', '');
    txt = txt.replace('/>', '');
    txt = txt.replace('>', '');

    var strAux = stringReplace(' ', '', txt);
    strAux = strAux.toLowerCase();

    var sw_display = (strAux.indexOf('display:none') > 0)? true : false;

    var arrayElemTxt = txt.split('="');
    var pos = 0;
    var strAux2 = '';
    var strAux3 = '';

    for (var i = 0; i <= arrayElemTxt.length - 1; i++) {
      strAux = arrayElemTxt[i];
      pos = strAux.indexOf('"');

      if (pos > 0) {
        strAux2 = strAux.substr(0, pos);
        strAux3 = stringReplace(' ', '__%SPACE__', strAux2)

        arrayElemTxt[i] = strAux.replace(strAux2, strAux3);
      }
    }

    txt = arrayElemTxt.join('="');

    arrayElemTxt = txt.split(' ');

    var arrayAttribute = [];
    var arrayAttributeValue = [];
    var strStyle = '';

    for (var i = 0; i <= arrayElemTxt.length - 1; i++) {
        if (arrayElemTxt[i].indexOf('=') > 0) {
            aVals    = arrayElemTxt[i].split('=');
            aVals[0] = aVals[0].toLowerCase();
            aVals[1] = stringReplace('"', '', aVals[1])
            aVals[1] = stringReplace('__%SPACE__', ' ', aVals[1])

            if (aVals[0] != 'id' && aVals[0] != 'name' && aVals[0] != 'class' && aVals[0] != 'style') {
                arrayAttribute.push(aVals[0]);
                arrayAttributeValue.push(aVals[1]);
            } else {
                if (aVals[0] == 'style') {
                    strStyle = aVals[1];
                }
            }
        }
    }

    strStyle = ((sw_display)? "display: none;" : "") + strStyle;

    var newField = document.createElement("input");

    newField.setAttribute("id", oNewObject.id);
    newField.setAttribute("name", oNewObject.id);
    newField.className = xClass;
    newField.style.cssText = strStyle;

    if (oNewObject.disabled) {
        newField.disabled = true;
    }

    if (oNewObject.readOnly) {
        newField.readOnly = true;
    }

    for (var i = 0; i <= arrayAttribute.length - 1; i++) {
        newField.setAttribute(arrayAttribute[i], arrayAttributeValue[i]);
    }

    return newField;
  };

  this.addGridRow = function() {
    var i, aObjects;
    var defaultValue = '';
    var n,a,x;
    var oRow = document.getElementById('firstRow_' + this.sGridName);
    var aCells = oRow.getElementsByTagName('td');
    var oNewRow = this.oGrid.insertRow(this.oGrid.rows.length - 1);
    var currentRow = this.oGrid.rows.length - 2;
    var newID, attributes, img2, gridType;

    oNewRow.onmouseover=function(){
      highlightRow(this, '#D9E8FF');
    };
    oNewRow.onmouseout=function(){
      highlightRow(this, '#fff');
    };

    // Clone Cells Loop
    for (i = 0; i < aCells.length; i++) {
      oNewRow.appendChild(aCells[i].cloneNode(true)); //Clone First Cell exactly.
      switch (i){
        case 0:
          oNewRow.getElementsByTagName('td')[i].innerHTML = currentRow;
          break;
        case aCells.length - 1:
          oNewRow.getElementsByTagName('td')[i].innerHTML = oNewRow.getElementsByTagName('td')[i].innerHTML.replace(/\[1\]/g, '\[' + currentRow + '\]');
          break;
        default:
          var eNodeName = aCells[i].innerHTML.substring(aCells[i].innerHTML.indexOf('<')+1, aCells[i].innerHTML.indexOf(' '));
          eNodeName = eNodeName.toLowerCase();
        switch(eNodeName){
          case 'input':
            aObjects = oNewRow.getElementsByTagName('td')[i].getElementsByTagName('input');
            if (aObjects){
              newID = aObjects[0].id.replace(/\[1\]/g, '\[' + currentRow + '\]');
              aObjects[0].id = newID;
              aObjects[0].name = newID;
              attributes = elementAttributesNS(aObjects[0], 'pm');
              if (attributes.defaultvalue != '' && typeof attributes.defaultvalue != 'undefined'){
                defaultValue = attributes.defaultvalue;
              }else{
                defaultValue = '';
              }
              for(n=0; n < aObjects.length; n++){
                switch(aObjects[n].type){
                  case 'text': //TEXTBOX, CURRENCY, PERCENTAGE, DATEPICKER
                    tags = oNewRow.getElementsByTagName('td')[i].getElementsByTagName('a');
                    if (tags.length == 2){ //DATEPICKER
                      //Copy Images
                      //img1 = tags[0].innerHTML;
                      img2 = tags[1].innerHTML;
                      //Create new trigger name
                      var datePickerTriggerId = tags[1].id.replace(/\[1\]/g, '\[' + currentRow + '\]');
                      //Remove 'a' tag for date picker trigger
                      oNewRow.getElementsByTagName('td')[i].removeChild(tags[1]);
                      //Capture Script and remove
                      var scriptTags = oNewRow.getElementsByTagName('td')[i].getElementsByTagName('script');
                      oNewRow.getElementsByTagName('td')[i].removeChild(scriptTags[0]);
                      //Create 'a' to remove Date
                      if (tags[0].onclick){
                        var onclickevn = new String(tags[0].onclick);
                        eval('tags[0].onclick = ' + onclickevn.replace(/\[1\]/g, '\[' + currentRow + '\]') + ';');
                      }
                      //Create new 'a' to trigger DatePicker
                      var a2 = document.createElement('a');

                        if( a2.style.setAttribute ) {
                          var styleText = "position:relative;top:0px;left:-19px;";
                          a2.style.setAttribute("cssText", styleText );
                        }
                        else {
                          var styleText = "position:relative;top:0px;left:-22px;";
                          a2.setAttribute("style", styleText );
                        }

                      a2.id = datePickerTriggerId;
                      a2.innerHTML = img2;
                      oNewRow.getElementsByTagName('td')[i].appendChild(a2);
                      //Load DatePicker Trigger
                      datePicker4("", newID, attributes.mask, attributes.start, attributes.end, attributes.time);
                      if(defaultValue=='today'){
                    	  attributesValue = elementAttributesNS(aObjects[0], '');
                    	  aObjects[n].value=attributesValue.value;
                      }else
                         aObjects[n].value = defaultValue;
                    }else{
                      if (_BROWSER.name == 'msie' && aObjects.length==1){ //Clone new input element if browser is IE
                        var oNewOBJ = this.cloneInput(aObjects[n]);
                        oNewOBJ.value = defaultValue;
                        var parentGG = aObjects[n].parentNode;
                        parentGG.removeChild(aObjects[n]);
                        parentGG.appendChild(oNewOBJ);
                      }else{
                        if ((attributes.gridtype) && (attributes.gridtype=='currency')) {
                          var attributesCurrency = elementAttributesNS(aObjects[0], '');
                          aObjects[n].value = attributesCurrency.value.replace(/[.,0-9\s]/g,'');;
                        }
                        else
                          aObjects[n].value = defaultValue;
                      }
                    }
                    break;
                  case 'checkbox': //CHECKBOX
                    if (_BROWSER.name != 'msie'){
                      attributesFalse = elementAttributesNS(aObjects[0], '');
                      if((defaultValue === attributesFalse.falsevalue) || (defaultValue===''))
                        aObjects[n].checked = false;
                      else
                        aObjects[n].checked = true;
                    }
                    break;
                  case 'hidden': //HIDDEN
                    if ((attributes.gridtype != 'yesno' && attributes.gridtype != 'dropdown') || typeof attributes.gridtype == 'undefined')
                      aObjects[n].value = defaultValue;
                    break;
                  case 'button':
                    if (aObjects[n].onclick){
                        var onclickevn = new String(aObjects[n].onclick);
                        eval('aObjects[n].onclick = ' + onclickevn.replace(/\[1\]/g, '\[' + currentRow + '\]') + ';');
                    }
                    break;
                }
              }
            }
            aObjects = null;
            break;
          case 'textarea': //TEXTAREA
            aObjects = oNewRow.getElementsByTagName('td')[i].getElementsByTagName('textarea');
            if (aObjects){
              newID = aObjects[0].id.replace(/\[1\]/g, '\[' + currentRow + '\]');
              aObjects[0].id = newID;
              aObjects[0].name = newID;
              attributes = elementAttributesNS(aObjects[0], 'pm');
              if (attributes.defaultvalue != '' && typeof attributes.defaultvalue != 'undefined'){
                defaultValue = attributes.defaultvalue;
              }else{
                defaultValue = '';
              }
              aObjects[0].innerHTML = defaultValue;
            }
            aObjects = null;
            break;
          case 'select': //DROPDOWN
            var oNewSelect;
            aObjects = oNewRow.getElementsByTagName('td')[i].getElementsByTagName('select');
            if (aObjects){
              newID = aObjects[0].id.replace(/\[1\]/g, '\[' + currentRow + '\]');
              aObjects[0].id = newID;
              aObjects[0].name = newID;

              oNewSelect = document.createElement(aObjects[0].tagName);
              oNewSelect.id = newID;
              oNewSelect.name = newID;
              oNewSelect.setAttribute('class','module_app_input___gray');

              aAttributes = aObjects[0].attributes;
              for (a=0; a < aAttributes.length; a++){
                if (aAttributes[a].name.indexOf('pm:') != -1){
                  oNewSelect.setAttribute(aAttributes[a].name,aAttributes[a].value);
                }
                if (aAttributes[a].name == 'disabled'){
                  if (_BROWSER.name == 'msie'){
                	if (aAttributes[a].value=='true'){
                	  oNewSelect.setAttribute(aAttributes[a].name,aAttributes[a].value);
                	}
                  }
                  else{
                    oNewSelect.setAttribute(aAttributes[a].name,aAttributes[a].value);
                  }
                }
              }

              attributes = elementAttributesNS(aObjects[0], 'pm');
              //var MyAtt = attributes;
              if (attributes.defaultvalue != '' && typeof attributes.defaultvalue != 'undefined'){
                defaultValue = attributes.defaultvalue;
                //Set '' for Default Value when dropdown has dependent fields.
                //if (attributes.dependent == '1') defaultValue = '';
              }else{
                defaultValue = '';
              }
              if (attributes.gridtype != '' && typeof attributes.gridtype != 'undefined'){
                gridType = attributes.gridtype;
              }else{
                gridType = '';
              }
              var aDependents = this.allDependentFields.split(',');
              sObject = this.getObjectName(newID);
              //Check if dropdow is dependent
              var sw = false;
              for (x=0; x < aDependents.length; x++){
                if (aDependents[x] == sObject) sw = true;
              }
              //Delete Options if dropdow is dependent
              //only remains empty value
              if (sw){
                var oAux = document.createElement(aObjects[0].tagName);
                for ( var j = 0; j < aObjects[0].options.length; j++) {
                  if (aObjects[0].options[j].value == ''){
                    var oOption = document.createElement('OPTION');
                    oOption.value = aObjects[0].options[j].value;
                    oOption.text = aObjects[0].options[j].text;
                    oAux.options.add(oOption);
                  }
                }
                oNewSelect.innerHTML = ''; //Delete options
                //aObjects[0].innerHTML = ''; //Delete options
                for (var r =0; r < oAux.options.length; r++){
                  var xOption = document.createElement('OPTION');
                  xOption.value = oAux.options[r].value;
                  xOption.text = oAux.options[r].text;
                  //aObjects[0].options.add(xOption);
                  oNewSelect.options.add(xOption);
                }
              }else{
                //Set Default Value if it's not a Dependent Field
                if (defaultValue != ''){
                  var oAux = document.createElement(aObjects[0].tagName);
                  for ( var j = 0; j < aObjects[0].options.length; j++) {
                    var oOption = document.createElement('OPTION');
                    oOption.value = aObjects[0].options[j].value;
                    oOption.text = aObjects[0].options[j].text;
                    if (aObjects[0].options[j].value === defaultValue){
                      oOption.setAttribute('selected','selected');
                    }
                    oAux.options.add(oOption);
                  }
                  //aObjects[0].innerHTML = ''; //Delete options
                  oNewSelect.innerHTML = ''; //Delete options
                  for (var r =0; r < oAux.options.length; r++){
                    var xOption = document.createElement('OPTION');
                    xOption.value = oAux.options[r].value;
                    xOption.text = oAux.options[r].text;
                    if (_BROWSER.name == 'msie'){
                      if (oAux.options[r].getAttribute('selected') != ''){
                        xOption.setAttribute('selected','selected');
                      }
                    }else{
                      if (oAux.options[r].getAttribute('selected') == 'selected'){
                        xOption.setAttribute('selected','selected');
                      }
                    }
                    //aObjects[0].options.add(xOption);
                    oNewSelect.options.add(xOption);
                  }
                }else{
                  //Copy all options
                  var oAux = document.createElement(aObjects[0].tagName);
                  for ( var j = 0; j < aObjects[0].options.length; j++) {
                    var oOption = document.createElement('OPTION');
                    oOption.value = aObjects[0].options[j].value;
                    oOption.text = aObjects[0].options[j].text;
                    oNewSelect.options.add(oOption);
                  }
                }
                //TODO: Implement Default Value and Dependent Fields Trigger for grid dropdowns
              }
              var parentSelect = aObjects[0].parentNode;
              parentSelect.removeChild(aObjects[0]);
              parentSelect.appendChild(oNewSelect);
            }
            aObjects = oNewRow.getElementsByTagName('td')[i].getElementsByTagName('input');
            if (aObjects.length > 0){
              newID = aObjects[0].id.replace(/\[1\]/g, '\[' + currentRow + '\]');
              aObjects[0].id = newID;
              aObjects[0].name = newID;
            }
            aObjects = null;
            break;
          case 'a': //LINKS
            aObjects = oNewRow.getElementsByTagName('td')[i].getElementsByTagName('a');
            if (aObjects){
              newID = aObjects[0].id.replace(/\[1\]/g, '\[' + currentRow + '\]');
              aObjects[0].id = newID;
              aObjects[0].name = newID;
            }
            aObjects = null;
            break;
        }
        break;
      }
    }

    if (this.aFields.length > 0) {
      this.setFields(this.aFields, currentRow);
    }
    if (this.aFunctions.length > 0) {
      this.assignFunctions(this.aFunctions, 'change', currentRow);
    }

    if (this.aFormulas.length > 0) {
      this.assignFormulas(this.aFormulas, 'change', currentRow);
    }

    //Recalculate functions if are declared
    var oAux;
    if (this.aFunctions.length > 0) {
      for (i = 0; i < this.aFunctions.length; i++) {
        oAux = document.getElementById('form[' + this.sGridName + '][' + currentRow + '][' + this.aFunctions[i].sFieldName + ']');
        if (oAux) {
          switch (this.aFunctions[i].sFunction) {
            case 'sum':
              this.sum(false, oAux);
              break;
            case 'avg':
              this.avg(false, oAux);
              break;
          }
        }
      }
    }
    //Fire Update Dependent Fields for any item with dependentfields and not included in dependencie
    var xIsDependentOf = [];
    var exist = false;
    var m;
    for (i=0; i < this.aFields.length; i++){
      var oAux = this.getElementByName(currentRow, this.aFields[i].sFieldName);
      if (typeof oAux !== 'undefined' && oAux != null)
        if (typeof oAux.dependentFields !== 'undefined'){
          if (oAux.dependentFields.length > 0){
            exist = false;
            for (m=0; m < xIsDependentOf.length; m++)
              if (xIsDependentOf[m] == oAux.name) exist = true;
            for (j=0; j < oAux.dependentFields.length; j++){
              xIsDependentOf.push(oAux.dependentFields[j].name);
            }
            if (!exist){
              oAux.updateDepententFields();
            }
          }
        }
    }
    //Fires OnAddRow Event
    if (this.onaddrow) {
      this.onaddrow(currentRow);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////
  this.deleteGridRow = function(sRow, bWithoutConfirm){
    if (typeof bWithoutConfirm == 'undefined') bWithoutConfirm = false;
    //var i, iRow, iRowAux, oAux, ooAux;
    if (this.oGrid.rows.length == 3) {
      new leimnud.module.app.alert().make( {
        label : G_STRINGS.ID_MSG_NODELETE_GRID_ITEM
      });
      return false;
    }
    if (bWithoutConfirm){
      this.deleteRowWC(this,sRow);
    }else{
      new leimnud.module.app.confirm().make( {
        label : G_STRINGS.ID_MSG_DELETE_GRID_ITEM,
        action : function() {
          this.deleteRowWC(this,sRow);
        }.extend(this)
      });
    }
  };

  this.deleteRowWC = function(oObj, aRow){
    sRow = new String(aRow);
    sRow = sRow.replace('[', '');
    sRow = sRow.replace(']', '');
    iRow = Number(sRow);

    deleteRowOnDynaform(oObj, iRow);
    var lastItem = oObj.oGrid.rows.length - 2;

    iRowAux = iRow + 1;
    while (iRowAux <= (lastItem)) {
      for (i = 1; i < oObj.oGrid.rows[iRowAux - 1].cells.length; i++) {
        var oCell1 = oObj.oGrid.rows[iRowAux - 1].cells[i];
        var oCell2 = oObj.oGrid.rows[iRowAux].cells[i];
        switch (oCell1.innerHTML.replace(/^\s+|\s+$/g, '').substr(0, 6).toLowerCase()){
          case '<input':
            aObjects1 = oCell1.getElementsByTagName('input');
            aObjects2 = oCell2.getElementsByTagName('input');
            if (aObjects1 && aObjects2) {
              if(aObjects1[0].type=='checkbox'){
                aObjects1[0].checked = aObjects2[0].checked;
              }
              aObjects1[0].value = aObjects2[0].value;
            }

            aObjects = oCell1.getElementsByTagName('div');

            if (aObjects.length > 0) {

              if (aObjects[0]) {
                aObjects[0].id = aObjects[0].id.replace('/\['+ (iRowAux -1 ) + '\]/g', '\[' + iRowAux + '\]');
                aObjects[0].name = aObjects[0].id.replace('/\['+ (iRowAux -1 ) + '\]/g', '\[' + iRowAux + '\]');
                if (aObjects[0].onclick) {
                  sAux = new String(aObjects[0].onclick);
                  eval('aObjects[0].onclick = ' + sAux.replace('/\['+ (iRowAux -1 ) + '\]/g', '\[' + iRowAux + '\]') + ';');
                }
              }
              aObjects = oCell1.getElementsByTagName('a');
              if (aObjects) {
                if (aObjects[0]) {
                  if (aObjects[0].onclick) {
                    sAux = new String(aObjects[0].onclick);
                    eval('aObjects[0].onclick = ' + sAux.replace('/\['+ (iRowAux -1 ) + '\]/g', '\[' + iRowAux + '\]') + ';');
                  }
                }
              }
            }

            break;
          case '<selec':
            aObjects1 = oCell1.getElementsByTagName('select');
            aObjects2 = oCell2.getElementsByTagName('select');
            if (aObjects1 && aObjects2) {
              var vValue = aObjects2[0].value;
              /*
               * for (var j = (aObjects1[0].options.length-1);
               * j >= 0; j--) { aObjects1[0].options[j] =
               * null; }
               */
              aObjects1[0].options.length = 0;
              for ( var j = 0; j < aObjects2[0].options.length; j++) {
                var optn = $dce("OPTION");
                optn.text = aObjects2[0].options[j].text;
                optn.value = aObjects2[0].options[j].value;
                aObjects1[0].options[j] = optn;
              }
              aObjects1[0].value = vValue;
            }
            break;
          case '<texta':
            aObjects1 = oCell1.getElementsByTagName('textarea');
            aObjects2 = oCell2.getElementsByTagName('textarea');
            if (aObjects1 && aObjects2) {
              aObjects1[0].value = aObjects2[0].value;
            }
            break;
          default:
            if (( oCell2.innerHTML.indexOf('changeValues')==111 || oCell2.innerHTML.indexOf('changeValues')==115 ) ) {
              break;
            }
          if (oCell2.innerHTML.toLowerCase().indexOf('deletegridrow') == -1) {
            oCell1.innerHTML = oCell2.innerHTML;
          }
          break;
        }
      }
      iRowAux++;
    }
    this.oGrid.deleteRow(lastItem);

    for (i=0; i < this.aFields.length; i++){
      this.aElements.pop();
    }

    if (oObj.aFunctions.length > 0) {
      for (i = 0; i < oObj.aFunctions.length; i++) {
        oAux = document.getElementById('form[' + oObj.sGridName + '][1][' + oObj.aFunctions[i].sFieldName + ']');
        if (oAux) {
          switch (oObj.aFunctions[i].sFunction) {
            case 'sum':
              oObj.sum(false, oAux);
              break;
            case 'avg':
              oObj.avg(false, oAux);
              break;
          }
        }
      }
    }

  //Fires OnAddRow Event
    if (oObj.ondeleterow) {
      oObj.ondeleterow(iRow);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////

  this.assignFunctions = function(aFields, sEvent, iRow) {
    iRow = iRow || 1;
    var i, j, oAux;
    for (i = 0; i < aFields.length; i++) {
      j = iRow;
      while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + aFields[i].sFieldName + ']')) {
        switch (aFields[i].sFunction) {
          case 'sum':
            leimnud.event.add(oAux, sEvent, {
              method : this.sum,
              instance : this,
              event : true
            });
            break;
          case 'avg':
            leimnud.event.add(oAux, sEvent, {
              method : this.avg,
              instance : this,
              event : true
            });
            break;
          default:
            leimnud.event.add(oAux, sEvent, {
              method : aFields[i].sFunction,
              instance : this,
              event : true
            });
          break;
        }
        j++;
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////

  this.setFunctions = function(aFunctions) {
    this.aFunctions = aFunctions;
    this.assignFunctions(this.aFunctions, 'change');
  };

  this.determineBrowser = function()
  {
    var nAgt = navigator.userAgent;
    var browserName = "";
    // In Opera, the true version is after "Opera" or after "Version"
    if ( nAgt.indexOf("Opera") != -1) {
      browserName = "Opera";
    } else {
      // In MSIE, the true version is after "MSIE" in userAgent - Microsoft Internet Explorer
      if ( nAgt.indexOf("MSIE") != -1) {
        browserName = "MSIE";
      } else {
        // In Chrome, the true version is after "Chrome"
        if ( nAgt.indexOf("Chrome") != -1) {
          browserName = "Chrome";
        } else {
          // In Safari, the true version is after "Safari" or after "Version"
          if ( nAgt.indexOf("Safari") != -1) {
            browserName = "Safari";
          } else {
            // In Firefox, the true version is after "Firefox"
            if ( nAgt.indexOf("Firefox") != -1) {
             browserName = "Firefox";
            }
          }
        }
      }
    }
    return browserName;
  };
  /////////////////////////////////////////////////////////////////////////////////

  this.sum = function(oEvent, oDOM) {
    oDOM = (oDOM ? oDOM : oEvent.target || window.event.srcElement);
    var i, aAux, oAux, fTotal, sMask, nnName;
    aAux = oDOM.name.split('][');
    i = 1;
    fTotal = 0;
    aAux[2] = aAux[2].replace(']', '');

    var j=1;
    for ( var k = 0; k < this.aElements.length; k++) {
      nnName= this.aElements[k].name.split('][');
      if (aAux[2] == nnName[2] && j <= (this.oGrid.rows.length-2)){
        oAux=this.getElementByName(j, nnName[2]);
        var oAux2 = oAux.value().replace(/[$|a-zA-Z\s]/g,'');
        if ( (oAux != null) && (oAux.value().trim() != '') && (oAux2)) {
          fTotal += parseFloat(G.getValue(oAux.value()));
        }
        j++;
      }
    }
    /*
    while (oAux = this.getElementByName(i, aAux[2])) {
      fTotal += parseFloat(G.cleanMask(oAux.value() || 0, oAux.mask).result.replace(/,/g, ''));
      sMask = oAux.mask;
      i++;
    }*/
    fTotal = fTotal.toFixed(2);
    oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '_' + aAux[2] + ']');
    oAux.value = fTotal;
    oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '__' + aAux[2] + ']');
    // oAux.innerHTML = G.toMask(fTotal, sMask).result;
    if ( this.determineBrowser() == "MSIE" ) {
      oAux.innerText = fTotal;
    } else {
      oAux.innerHTML = fTotal;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////
  this.avg = function(oEvent, oDOM) {
    oDOM = (oDOM ? oDOM : oEvent.target || window.event.srcElement);
    var i, aAux, oAux, fTotal, sMask;
    aAux = oDOM.name.split('][');
    i = 1;
    fTotal = 0;
    aAux[2] = aAux[2].replace(']', '');
    while (oAux = this.getElementByName(i, aAux[2])) {
      if ( oAux.value() != "" ) {
        fTotal += parseFloat(G.getValue(oAux.value().trim() ));
      }
      sMask = oAux.mask;
      i++;
    }
    i--;
    if (fTotal > 0) {
      fTotal = (fTotal / i).toFixed(2);
      oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '_' + aAux[2] + ']');
      oAux.value = fTotal;
      oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '__' + aAux[2] + ']');
      // oAux.innerHTML = G.toMask((fTotal / i), sMask).result;
    if ( this.determineBrowser() == "MSIE" ) {
        oAux.innerText = fTotal;
      } else {
        oAux.innerHTML = fTotal;
      }
    } else {
      oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '_' + aAux[2] + ']');
      oAux.value = 0;
      oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '__' + aAux[2] + ']');
      // oAux.innerHTML = G.toMask(0, sMask).result;
    if ( this.determineBrowser() == "MSIE" ) {
        oAux.innerText = 0;
      } else {
        oAux.innerHTML = 0;
      }
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  this.assignFormulas = function(aFields, sEvent, iRow) {
    iRow = iRow || 1;
    var i, j, oAux;
    for (i = 0; i < aFields.length; i++) {
      j = iRow;
      while (oAux = document.getElementById('form[' + this.sGridName + '][' + j + '][' + aFields[i].sDependentOf + ']')) {
        leimnud.event.add(oAux, sEvent, {
          method : this.evaluateFormula,
          instance : this,
          args : [ oAux, aFields[i] ],
          event : true
        });
        j++;
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  this.setFormulas = function(aFormulas) {
    this.aFormulas = aFormulas;
    this.assignFormulas(this.aFormulas, 'change');
  };

  /////////////////////////////////////////////////////////////////////////////////////////////
  this.evaluateFormula = function(oEvent, oDOM, oField) {
    oDOM = (oDOM ? oDOM : oEvent.target || window.event.srcElement);
    var aAux, sAux, i, oAux;
    var domId = oDOM.id;
    var oContinue = true;
    aAux = oDOM.name.split('][');
    sAux = oField.sFormula.replace(/\+|\-|\*|\/|\(|\)|\[|\]|\{|\}|\%|\$/g, ' ');
    sAux = sAux.replace(/^\s+|\s+$/g, '');
    sAux = sAux.replace(/      /g, ' ');
    sAux = sAux.replace(/     /g, ' ');
    sAux = sAux.replace(/    /g, ' ');
    sAux = sAux.replace(/   /g, ' ');
    sAux = sAux.replace(/  /g, ' ');
    aFields = sAux.split(' ');
    aFields = aFields.unique();
    sAux = oField.sFormula;
    for (i = 0; i < aFields.length; i++) {
      if (!isNumber(aFields[i])) {
        oAux = this.getElementByName(aAux[1], aFields[i]);
        sAux = sAux.replace(new RegExp(aFields[i], "g"), "parseFloat(G.cleanMask(this.getElementByName(" + aAux[1] + ", '" + aFields[i] + "').value().replace(/[$|a-zA-Z\s]/g,'') || 0, '" + (oAux.sMask ? oAux.sMask : '')
            + "').result.replace(/,/g, ''))");
        eval("if (!document.getElementById('" + aAux[0] + '][' + aAux[1] + '][' + aFields[i] + "]')) { oContinue = false; }");
      }
    }
    eval("if (!document.getElementById('" + aAux[0] + '][' + aAux[1] + '][' + oField.sFieldName + "]')) { oContinue = false; }");

    if (oContinue) {
      //we're selecting the mask to put in the field with the formula
      for (i = 0; i < this.aFields.length; i++) {
        if(oField.sFieldName==this.aFields[i].sFieldName) {
          maskformula =this.aFields[i].oProperties.mask;
        }
      }
      if(maskformula!=''){
        maskDecimal=maskformula.split(";");

        if(maskDecimal.length > 1) {
          maskDecimal=maskDecimal[1].split(".");
        } else {
          maskDecimal=maskformula.split(".");
        }

        if(typeof maskDecimal[1] != 'undefined') {
          maskToPut=maskDecimal[1].length;
        } else {
          maskToPut=0;
        }

      } else {
        maskToPut=0;
      }

      // clean the field and load mask execute event keypress
      document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']').value = '';
      this.executeEvent(document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']'), 'keypress');

      // execute formula and set decimal
      eval("document.getElementById('" + aAux[0] + '][' + aAux[1] + '][' + oField.sFieldName + "]').value = (" + sAux + ').toFixed('+maskToPut+');');

      // trim value
      document.getElementById(aAux[0] + '][' + aAux[1] + '][' + oField.sFieldName + ']').value = document.getElementById(aAux[0] + '][' + aAux[1] + '][' + oField.sFieldName + ']').value.replace(/^\s*|\s*$/g,"");

      // set '' to field if response is NaN
      if (document.getElementById(aAux[0] + '][' + aAux[1] + '][' + oField.sFieldName + ']').value =='NaN')
        document.getElementById(aAux[0] + '][' + aAux[1] + '][' + oField.sFieldName + ']').value = '';

      // save var symbol the response
      var symbol = document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']').value.replace(/[0-9.\s]/g,'');
      this.executeEvent(document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']'), 'keypress');

      // replace symbol - for ''
      document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']').value = document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']').value.replace('-','');

      // set var symbol
      document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']').value = symbol+''+document.getElementById(aAux[0]+']['+ aAux[1] + '][' + oField.sFieldName + ']').value;

      // return focus the field typed
      if (typeof document.getElementById(domId) != 'undefined') {
        document.getElementById(domId).focus();
      }

      if (this.aFunctions.length > 0) {
        for (i = 0; i < this.aFunctions.length; i++) {
          oAux = document.getElementById('form[' + this.sGridName + '][' + aAux[1] + '][' + this.aFunctions[i].sFieldName + ']');
          if (oAux) {
            if (oAux.name == aAux[0] + '][' + aAux[1] + '][' + oField.sFieldName + ']') {
              switch (this.aFunctions[i].sFunction) {
                case 'sum':
                  this.sum(false, oAux);
                  break;
                case 'avg':
                  this.avg(false, oAux);
                  break;
              }
              if (oAux.fireEvent) {
                oAux.fireEvent('onchange');
              } else {
                var evObj = document.createEvent('HTMLEvents');
                evObj.initEvent('change', true, true);
                oAux.dispatchEvent(evObj);
              }
            }
          }
        }
      }
    } else {
      new leimnud.module.app.alert().make( {
        label : "Check your formula!\n\n" + oField.sFormula
      });
    }
  };

  /*add*/
  this.deleteGridRownomsg = function(sRow) {
    var i, iRow, iRowAux, oAux, ooAux;


    //action : function() {
    //this.aElements = [];
    sRow = sRow.replace('[', '');
    sRow = sRow.replace(']', '');
    iRow = Number(sRow);

    /*
     * delete the respective session row grid variables from
     * Dynaform - by Nyeke <erik@colosa.com
     */

    deleteRowOnDybaform(this, iRow);

    iRowAux = iRow + 1;
    while (iRowAux <= (this.oGrid.rows.length - 2)) {
      for (i = 1; i < this.oGrid.rows[iRowAux - 1].cells.length; i++) {
        var oCell1 = this.oGrid.rows[iRowAux - 1].cells[i];
        var oCell2 = this.oGrid.rows[iRowAux].cells[i];
        switch (oCell1.innerHTML.replace(/^\s+|\s+$/g, '').substr(0, 6).toLowerCase()) {
          case '<input':
            aObjects1 = oCell1.getElementsByTagName('input');
            aObjects2 = oCell2.getElementsByTagName('input');
            if (aObjects1 && aObjects2) {
              if(aObjects1[0].type=='checkbox'){
                aObjects1[0].checked = aObjects2[0].checked;
              }
              aObjects1[0].value = aObjects2[0].value;
              //  if(oCell1.innerHTML.indexOf('<div id=')!=-1)
              //  oCell1.innerHTML = oCell2.innerHTML;
            }

            aObjects = oCell1.getElementsByTagName('div');

            if (aObjects.length > 0) {

              if (aObjects[0]) {
                aObjects[0].id = aObjects[0].id.replace(/\[1\]/g, '\[' + (this.oGrid.rows.length - 2) + '\]');
                aObjects[0].name = aObjects[0].id.replace(/\[1\]/g, '\[' + (this.oGrid.rows.length - 2) + '\]');
                if (aObjects[0].onclick) {
                  sAux = new String(aObjects[0].onclick);
                  eval('aObjects[0].onclick = ' + sAux.replace(/\[1\]/g, '\[' + (this.oGrid.rows.length - 2) + '\]') + ';');
                }
              }
              aObjects = oCell1.getElementsByTagName('a');
              if (aObjects) {
                if (aObjects[0]) {
                  if (aObjects[0].onclick) {
                    sAux = new String(aObjects[0].onclick);
                    eval('aObjects[0].onclick = ' + sAux.replace(/\[1\]/g, '\[' + (this.oGrid.rows.length - 2) + '\]') + ';');
                  }
                }
              }
            }
            //oCell1.innerHTML= aux.innerHTM;
            break;
          case '<selec':
            aObjects1 = oCell1.getElementsByTagName('select');
            aObjects2 = oCell2.getElementsByTagName('select');
            if (aObjects1 && aObjects2) {
              var vValue = aObjects2[0].value;
              /*
               * for (var j = (aObjects1[0].options.length-1);
               * j >= 0; j--) { aObjects1[0].options[j] =
               * null; }
               */
              aObjects1[0].options.length = 0;
              for ( var j = 0; j < aObjects2[0].options.length; j++) {
                var optn = $dce("OPTION");
                optn.text = aObjects2[0].options[j].text;
                optn.value = aObjects2[0].options[j].value;
                aObjects1[0].options[j] = optn;
              }
              aObjects1[0].value = vValue;
            }
            break;
          case '<texta':
            aObjects1 = oCell1.getElementsByTagName('textarea');
            aObjects2 = oCell2.getElementsByTagName('textarea');
            if (aObjects1 && aObjects2) {
              aObjects1[0].value = aObjects2[0].value;
            }
            break;
          default:
            if (( oCell2.innerHTML.indexOf('changeValues')==111 || oCell2.innerHTML.indexOf('changeValues')==115 ) ) {
              //alert('erik2');
              break;
            }
          if (oCell2.innerHTML.toLowerCase().indexOf('deletegridrow') == -1) {
            oCell1.innerHTML = oCell2.innerHTML;
            //alert('erik');
          }
          break;
        }
      }
      iRowAux++;
    }
    this.oGrid.deleteRow(this.oGrid.rows.length - 2);
    if (this.sAJAXPage != '') {
    }
    /* this slice of code was comented because it could be the problem to do that sum function is working wrong
        if (this.aFields.length > 0) {
          this.unsetFields();
        }*/
    //this slice of code was added to fill the grid after to delete some row
    this.aElements = [];
    for (var k=1;k<= this.oGrid.rows.length-2;k++){
      for (var i = 0; i < this.aFields.length; i++) {
        var j = k;
        switch (this.aFields[i].sType) {
          case 'text':
            this.aElements.push(new G_Text(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName));
            this.aElements[this.aElements.length - 1].validate = this.aFields[i].oProperties.validate;
            if(this.aFields[i].oProperties.strTo) {
              this.aElements[this.aElements.length - 1].strTo = this.aFields[i].oProperties.strTo;
            }
            break;
          case 'currency':
            this.aElements.push(new G_Currency(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j + ']['+ this.aFields[i].sFieldName));
            break;
          case 'percentage':
            this.aElements.push(new G_Percentage(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j+ '][' + this.aFields[i].sFieldName));
            break;
          case 'dropdown':
            this.aElements.push(new G_DropDown(oForm, document.getElementById('form[' + this.sGridName + '][' + j + '][' + this.aFields[i].sFieldName + ']'), this.sGridName + '][' + j + ']['+ this.aFields[i].sFieldName));
            break;
        }
        j++;
      }
    }

    if (this.aFunctions.length > 0) {

      for (i = 0; i < this.aFunctions.length; i++) {
        oAux = document.getElementById('form[' + this.sGridName + '][1][' + this.aFunctions[i].sFieldName + ']');
        if (oAux) {
          switch (this.aFunctions[i].sFunction) {
            case 'sum':
              this.sum(false, oAux);
              /*
              aaAux=oAux.name.split('][');
              sNamef=aaAux[2].replace(']', '');
              var sumaSol = 0;
              this.aElements.length;
              var j=1;k=0;
              for ( var i = 0; i < this.aElements.length; i++) {
                nnName= this.aElements[i].name.split('][');
                if (nnName[2] == sNamef && j <= (this.oGrid.rows.length-2)){
                  ooAux=this.getElementByName(j, nnName[2]);

                  if(ooAux!=null){

                  sumaSol += parseFloat(G.cleanMask(ooAux.value() || 0, ooAux.mask).result.replace(/,/g, ''))
                  }
                  j++;
                 }
              }
              sumaSol = sumaSol.toFixed(2);
              oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '_' + sNamef + ']');
              oAux.value = sumaSol;
              oAux = document.getElementById('form[SYS_GRID_AGGREGATE_' + oGrid.sGridName + '__' + sNamef + ']');
              oAux.innerHTML = sumaSol;//return;
               */
              break;
            case 'avg':
              this.avg(false, oAux);
              break;
          }
        }
      }
    }
    if (this.ondeleterow) {
      this.ondeleterow();
    }

    //}.extend(this)

  };
  /*add end*/
}