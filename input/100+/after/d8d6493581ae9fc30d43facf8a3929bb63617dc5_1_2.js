function(oNewObject){
    var txt = oNewObject.parentNode.innerHTML;
    var xClass = 'module_app_input___gray';

    txt = txt.replace('input', '');
    txt = txt.replace('INPUT', '');
    txt = txt.replace('<', '');
    txt = txt.replace('/>', '');
    txt = txt.replace('>', '');

    var strAux = strReplace(' ', '', txt);
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
        strAux3 = strReplace(' ', '__%SPACE__', strAux2)

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
            aVals[1] = strReplace('"', '', aVals[1])
            aVals[1] = strReplace('__%SPACE__', ' ', aVals[1])

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
  }