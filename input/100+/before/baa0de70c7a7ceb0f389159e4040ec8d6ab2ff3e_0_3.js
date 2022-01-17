function (event) {
    if (typeof MegaFormsDetectAllFormChanges != undefined && MegaFormsDetectAllFormChanges === true
        && !MvcMegaFormsLeavingPageDueToSubmit) {
        var doNoLeaveMessage = '';
        $("form").each(function () {
            doNoLeaveMessage = MvcMegaForms.AlertFormChanged($(this));
            if (doNoLeaveMessage !== '') {
                return;
            }
        });
        if (doNoLeaveMessage !== '') {
            return doNoLeaveMessage;
        }
    }
}