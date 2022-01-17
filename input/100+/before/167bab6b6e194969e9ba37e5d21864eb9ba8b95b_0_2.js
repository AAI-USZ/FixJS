function(oForm, iForm, iType)
{
  iLastTab = iForm;
  
  if (!saveDataTaskTemporal(iForm)) {
    return false;
  }
  
  oTaskData.TAS_UID = getField("TAS_UID").value;
  
  /*
  while (oTaskData.TAS_TITLE.charAt(0)==" "){
  oTaskData.TAS_TITLE = oTaskData.TAS_TITLE.substring(1,oTaskData.TAS_TITLE.length) ;
  }
  */
  
  oTaskData.TAS_TITLE = oTaskData.TAS_TITLE.trim();
  
  if (oTaskData.TAS_TITLE == "") {
    alert(G_STRINGS.ID_REQ_TITLE );
    
    return false;
  }
  
  //Panel processing //iForm = 6 //Case Labels
  var pnlProcessing;
  
  pnlProcessing = new leimnud.module.panel();
  
  pnlProcessing.options = {
    //title: "",
    //theme: this.options.theme,
    limit: true,
    size: {w: 250, h: 110},
    position: {x: 50, y: 50, center: true},
    control: {close: false, resize: false},
    statusBar: true,
    fx:{shadow: true, modal: true}
  };
  
  pnlProcessing.make();
  
  //pnlProcessing.loader.show();
  pnlProcessing.addContent("<div style=\"margin-left: 1em; padding: 0.80em 0 1em 4em; background: url(/images/classic/loader_B.gif) no-repeat left top;\">" + _("ID_PROCESSING") + "</div>");
  
  //Set AJAX
  var sParameters = "function=saveTaskData";
  
  var oRPC = new leimnud.module.rpc.xmlhttp({
    url: "../tasks/tasks_Ajax",
    method: "POST",
    args: sParameters + "&oData=" + oTaskData.toJSONString()
  });
  
  oRPC.callback = function (rpc) {
    //pnlProcessing.loader.hide();
    pnlProcessing.remove();
    
    if (oTaskData.TAS_TITLE) {
      Pm.data.db.task[getField("INDEX").value].label = Pm.data.db.task[getField("INDEX").value].object.elements.label.innerHTML = oTaskData.TAS_TITLE.replace(re2, "&amp;");
    }
    
    if (oTaskData.TAS_START) {
      oTaskData.TAS_START = ((oTaskData.TAS_START == "TRUE")? true : false);
      Pm.data.render.setTaskINI({task: oTaskData.TAS_UID, value: oTaskData.TAS_START});
    }
    
    try {
      new leimnud.module.app.info().make({
        label: changesSavedLabel
      });
    }
    catch (e) {
      //No show confirmation
    }
    
    Pm.tmp.propertiesPanel.remove();
  }.extend(this);
  
  oRPC.make();
}