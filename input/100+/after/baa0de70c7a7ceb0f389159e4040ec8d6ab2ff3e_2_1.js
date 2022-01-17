function (event) {
    if (!MvcMegaFormsLeavingPageDueToSubmitOrIgnore) {
        var formSearch = "form";
        var hasPossibleFormsDetecting = true;
        if (typeof MegaFormsDetectAllFormChanges === undefined || MegaFormsDetectAllFormChanges === false) {
            if (typeof MegaFormsDetectChangesFormClass === undefined || MegaFormsDetectChangesFormClass === '') {
                //there is no detect changes option available
                hasPossibleFormsDetecting = false;
            }
            formSearch += "." + MegaFormsDetectChangesFormClass;
        }

        if (hasPossibleFormsDetecting) {
            var doNoLeaveMessage = '';
            $(formSearch).each(function () {
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


}