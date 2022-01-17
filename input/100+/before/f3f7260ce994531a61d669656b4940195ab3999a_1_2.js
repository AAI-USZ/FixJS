function(oNewObject){
    var newField;
    var txt = oNewObject.parentNode.innerHTML;
    var xClass = 'module_app_input___gray';
    
    txt = txt.replace('input', '');
    txt = txt.replace('INPUT', '');
    txt = txt.replace('<', '');
    txt = txt.replace('/>', '');
    txt = txt.replace('>', '');
    
    aux4 = txt.toLowerCase();
    aux4 = aux4.replace(' ','');
    sw_display = false;
    if ((aux4.indexOf ('display:none') > 0) || (aux4.indexOf('display: none')>0)){
      sw_display = true;
    }
    pTxt = txt.split('="');
    for (v=1; v < pTxt.length; v++){
      aux = pTxt[v];
      if (pos = aux.indexOf('"')){
        aux2 = aux.substr(0,pos);
        aux3 = aux2.replace(' ','[%space$]');
        pTxt[v] = aux.replace(aux2, aux3);
      }
    }
    txt = pTxt.join('="');
    
    aTxt = txt.split(' ');
    
    var strStyle    = (sw_display)? " style=\"display: none;\"" : "";
    var strDisabled = (oNewObject.disabled)? " disabled=\"disabled\"" : "";
    var strReadOnly = (oNewObject.readOnly)? " readonly=\"readonly\"" : "";
    
    var xElement = "<input id=\"" + oNewObject.id + "\" name=\"" + oNewObject.id + "\" class=\"" + xClass + "\"" + strStyle + strDisabled + strReadOnly + " />";
    
    newField = document.createElement(xElement);
    
    for (var a=0; a < aTxt.length; a++){
      if (aTxt[a].indexOf('=')>0){
        aVals = aTxt[a].split('=');
        
        if (aVals[0] != 'id' && aVals[0] != 'name' && aVals[0] != 'class' && aVals[0] != 'style'){
          newField.setAttribute(aVals[0], aVals[1].replace('"','').replace('"','').replace('[%space$]',' '));
        }
      }
    }
    
    return newField;
  }