function () {
        $("#options-menu-build").click(handleBuild);
        $("#options-menu-sign").click(handleBuild);
        $("#options-menu-launch").click(handleBuild);

        $("#options-menu-settings").click(function () {
            settings.show(); 
        });

        if (settings.value("remoteInspector")) {
            $("#options-menu-build-warning").show();
            tooltip.create("#options-menu-build-warning", "Remote Web Inspector should be disabled when packaging for App World release");
        }

        startServices();
    }