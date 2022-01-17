function(){
             var newVisibilityVal = $.trim($("#areapermissions_see_container input[type=radio]:checked").val());
             if (visibility === newVisibilityVal || visibilityindex[newVisibilityVal] > visibilityindex[visibility] || newVisibilityVal === "selected"){
                 applyPermissions();
             } else {
                 $("#areapermissions_warning_container_text").html(sakai.api.Util.TemplateRenderer("areapermissions_warning_container_text_template", {
                     "visibility": newVisibilityVal,
                     "area": currentArea._title
                 }));
                 $("#areapermissions_proceedandapply").removeAttr("disabled");
                 $("#areapermissions_apply_permissions").removeAttr("disabled");
                 sakai.api.Util.Modal.open('#areapermissions_warning_container');
             }
         }