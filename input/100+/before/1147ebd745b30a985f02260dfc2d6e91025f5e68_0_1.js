function makeCntrlPanels(url, n, functionnames){
    var panels = new Array();
    //Applet options: size, background color, spinning etc...
    panelID = 'size_jmol'+n;
    tabID = 'tab_'+panelID;
    //size control
    if(_jmol.os=="mac" && _jmol.browser=="mozilla"){
        panelHTML ='';
        }else{
        panelHTML ='3-D display size: <select title ="Select a size" onchange="jmol_pulldown(this);">';
        panelHTML += '<option value = "jmolNewAppletSize('+miniature+','+n+');"> Miniature ('+miniature+'px)</option>';
        panelHTML += '<option  value = "jmolNewAppletSize('+small+','+n+');"> Small ('+small+'px)</option>';
        panelHTML += '<option selected = "" value = "jmolNewAppletSize('+medium+','+n+');"> Medium ('+medium+'px)</option>';
        panelHTML += '<option value = "jmolNewAppletSize('+large+','+n+');"> Large ('+large+'px)</option>';
        panelHTML += '</';
        panelHTML += 'select><hr/>';
        }
    panelHTML +='<button title="Move to own window" onClick="javascript:void(jmol_popup(\''+n+'\'))">Move to own window</button> arbitrarily resizable.<hr/>';
    //static image to save
    panelHTML +='<button onClick="sleepJmol('+n+',jmolStatus)"> Get Static Image to Save (Sleep) </button> Right-click or Cmd-click on image to get download options.<hr/>';
    //save file to local disk
    panelHTML += '<button title="Download View" onClick="javascript:void(jmolFileDownload('+n+'))">Download this view</button> will require loading signed applet if not already done.';
    panelHTML +='<hr/>';
    //spin on
    panelHTML +='<input class="worksheet" type="checkbox" value="spin on" onchange="jmol_spin(this.checked,'+n+');" title="Enable/disable spin"/>Spin on';
    //antialaisdisplay (smoothing of objects)
    panelHTML +='<br/><input class="worksheet" type="checkbox" value="hi quality" onchange="jmol_antialias(this.checked,'+n+');" title="Enable/disable smoothing"/>High quality';
    //background color
    panelHTML += '';
    panels[0] = new jmolCntrlPanel(0, panelID, tabID, "Display",panelHTML);
    //Function Display Options
    panelID = 'disp_jmol'+n;
    tabID = 'tab_'+panelID;
    if(functionnames ==''||functionnames==undefined){//no names for the functions so cannot build list, will have to get after Jmol launched
	    panelHTML = '<p><a class="link" href="javascript:void(getSurfacesFromJmol('+n+'))">Click to request functions from Jmol</a> so that you can adjust function color and mesh.</p>';
        }else{//step through functionnames and make list of functions.
        panelHTML ='<table style="border-width:medium;border-style:solid;"><tr><td>Function Name</td><td>On</td><td>Color</td><td>Translucent</td><td>Mesh</td><td>Mesh Color</td></tr>';
        var funcs=functionnames.split(',');
        for(i in funcs){
	    }
        str+='</table>';
        }
    panels[1] = new jmolCntrlPanel(1, panelID, tabID, "Color & Mesh",panelHTML);
    //Axes to be done
    //State will be hidden long term
    panelID = 'jmolStateDiv'+n;
    tabID = 'tab_'+panelID;
    panelHTML ='# Blank script';
    panels[2] = new jmolCntrlPanel(2, panelID, tabID,"State", panelHTML);
    return (new jmolCntrlPanels(0, panels)); //this will then be plugged into jmolStatus.cntrls[n]
    }