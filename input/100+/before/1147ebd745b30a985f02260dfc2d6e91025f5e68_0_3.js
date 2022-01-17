function getSurfacesFromJmol(n){
    var surfaceListStr = jmolGetPropertyAsString("stateInfo", "modelState", n);
    var scriptArray=parseJmolStateInfoForSurfaces(surfaceListStr);
    var surfaceArray = makeJmolSurfaceArray2(scriptArray);
    var tdstr ='<td style="border-width:thin;border-style:solid;padding:4px;">';
    var dispStr='';
    if (scriptArray[0]==''||scriptArray[0]==null||scriptArray[0]=='null'||scriptArray[0]==undefined||scriptArray[0]=='undefined') {//no surfaces ?!
        dispStr = 'No surfaces recovered from Jmol.  Sorry.';
        }
    dispStr +='<table style="border-width:thin;border-style:solid;border-collapse:collapse;"><tr>'+tdstr+'Function</td>'+tdstr+'Color</td>'+tdstr+'On?</td>'+tdstr+'Translucency</td>'+tdstr+'Mesh Color</td>'+tdstr+'Mesh on?</td></tr>';
    for (i in surfaceArray){
        dispStr +='<tr>';
        dispStr +=''+tdstr+''+surfaceArray[i].ID+'</td>';
        var scriptStr = 'color $'+surfaceArray[i].ID+' $COLOR$';
        var boxIdStr = 'colorBox_'+n+'_'+i;
        dispStr +=''+tdstr+''+JmolColorPickerBoxStr(scriptStr,surfaceArray[i].color,boxIdStr,n)+'</td>';
        var checkedStr = 'checked = "true"';
        re_off = /off/i;
        if (surfaceArray[i].visibility.match(re_off)){
            checkedStr = '';
            }
        dispStr +=''+tdstr+'<input class="worksheet" type="checkbox" '+checkedStr+' onchange="jmol_show_element(this.checked,\''+surfaceArray[i].ID+'\',\''+surfaceArray[i].type+'\','+n+');" title="Show function"/></td>';
        dispStr +=''+tdstr+'<select class="jmol" title ="Select transparency" onchange="jmolSurfColor(this.value,\''+surfaceArray[i].ID+'\','+n+');">';
        dispStr +='<option selected="" value ="'+surfaceArray[i].fillState+'">'+surfaceArray[i].fillState+'</option>';
        var fillState='opaque';
        dispStr +='<option value = "'+ fillState +'">opaque</option>';
        fillState = 'translucent 32';
        dispStr +='<option value = "'+ fillState +'">translucent 32</option>';
        fillState ='translucent 64';
        dispStr +='<option value = "'+ fillState +'">translucent 64</option>';
        fillState = 'translucent 96';
        dispStr +='<option value = "'+ fillState +'">translucent 96</option>';
        fillState ='translucent 128';
        dispStr +='<option value = "'+ fillState +'">translucent 128</option>';
        dispStr +='</';
        dispStr += 'select></td>';
        if (surfaceArray[i].mesh_ID ==''){//we don't have a mesh so  need to make one
            scriptStr = surfaceArray[i].type+' '+surfaceArray[i].ID+'_mesh '+surfaceArray[i].sourceType+' '+surfaceArray[i].source+'noFill mesh;';
            scriptStr += surfaceArray[i].type+' fullylit off;';
            scriptStr += 'color '+surfaceArray[i].type+' opaque [x000000];';
            result = jmolScriptWait(scriptStr, n);
            surfaceArray[i].mesh_ID=surfaceArray[i].ID+'_mesh';
            surfaceArray[i].meshColor = '[x000000]';
            surfaceArray[i].mesh_visibility = 'off';
            //we've changed the state, so save
            jmolUpdateState(n);
            }
        scriptStr = 'color $'+surfaceArray[i].mesh_ID+' $COLOR$';
        boxIdStr = 'colorBox_'+n+'_'+i+'_mesh';
        dispStr +=''+tdstr+''+JmolColorPickerBoxStr(scriptStr,surfaceArray[i].meshColor,boxIdStr,n)+'</td>';
        checkedStr = 'checked = "true"';
        if (surfaceArray[i].mesh_visibility.match(re_off)){
            checkedStr = '';
            }
        dispStr +=''+tdstr+'<input class="worksheet" type="checkbox" '+checkedStr+' onchange="jmol_show_element(this.checked,\''+surfaceArray[i].mesh_ID+'\',\''+surfaceArray[i].type+'\','+n+');" title="Show mesh"/></td>';
         dispStr +='</tr>';
        }
    dispStr +='</table>';
    displayID = 'disp_jmol'+n;
    get_element(displayID).innerHTML= dispStr;
    }