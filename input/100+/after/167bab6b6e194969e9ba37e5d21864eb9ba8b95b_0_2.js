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

  //Set AJAX
  var sParameters = "function=saveTaskData";

  var oRPC = new leimnud.module.rpc.xmlhttp({
    url: "../tasks/tasks_Ajax",
    method: "POST",
    args: sParameters + "&oData=" + oTaskData.toJSONString()
  });

  oRPC.callback = function (rpc) {
    var res = rpc.xmlhttp.responseText.parseJSON();

    if (oTaskData.TAS_TITLE) {
      Pm.data.db.task[getField("INDEX").value].label = Pm.data.db.task[getField("INDEX").value].object.elements.label.innerHTML = oTaskData.TAS_TITLE.replace(re2, "&amp;");
    }

    if (oTaskData.TAS_START) {
      oTaskData.TAS_START = ((oTaskData.TAS_START == "TRUE")? true : false);
      Pm.data.render.setTaskINI({task: oTaskData.TAS_UID, value: oTaskData.TAS_START});
    }

    try {
      var option = {
        label: changesSavedLabel
      }

      switch (res.status) {
          case "CRONCL":
              option = {
                label: changesSavedLabel + "<br /><br />" + _("APP_TITLE_CASE_LABEL_UPDATE"),
                width: 350,
                height: 175
              }
              break;
      }

      new leimnud.module.app.info().make(option);
    }
    catch (e) {
      //No show confirmation
    }

    Pm.tmp.propertiesPanel.remove();
  }.extend(this);

  oRPC.make();
}