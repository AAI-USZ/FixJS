function (conn, response, options) {
        console.log("xhr request failed");

        if(response.status == 503) {
            // show wait info
            if(!pimcore.maintenanceWindow) {
                pimcore.maintenanceWindow = new Ext.Window({
                    closable: false,
                    title: t("please_wait"),
                    bodyStyle: "padding: 20px;",
                    html: t("the_system_is_in_maintenance_mode_please_wait"),
                    closeAction: "close",
                    modal: true
                });
                pimcore.viewport.add(pimcore.maintenanceWindow);
                pimcore.maintenanceWindow.show();
            }

        } else {
            //do not remove notification, otherwise user is never informed about server exception (e.g. element cannot be saved due to HTTP 500 Response)
            pimcore.helpers.showNotification(t("error"), t("error_general"), "error","");
        }
        
        xhrActive--;
        if(xhrActive < 1) {
            Ext.get("pimcore_logo").dom.innerHTML = '<img class="logo" src="/pimcore/static/img/logo.png"/>';
        }
    }