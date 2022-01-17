function () {

    var formSearch = "form";
    if (typeof MegaFormsDetectAllFormChanges === undefined || MegaFormsDetectAllFormChanges === false) {
        if (typeof MegaFormsDetectChangesFormClass === undefined || MegaFormsDetectChangesFormClass === '') {
            //there is no detect changes option available
            return;
        }
        formSearch += "." + MegaFormsDetectChangesFormClass;
    }

    $(formSearch).each(function () {
        var $form = $(this);

        //wire up submit buttons
        $form.find("input:submit").each(function () {
            var $me = $(this);
            $me.click(function () {
                MvcMegaFormsLeavingPageDueToSubmitOrIgnore = true;
            });
        });

        //ensure all selects that have options have a selected option (otherwise it will always say they changed)
        $form.find("select").each(function () {
            var $me = $(this);
            if ($me.attr('multiple') === undefined && $me.find('option').length > 0) {
                var foundDefaultSelected = false;
                $me.find('option').each(function () {
                    if (this.defaultSelected) {
                        foundDefaultSelected = true;
                        return;
                    }
                });
                if (!foundDefaultSelected) {
                    var $firstOption = $me.find("option:first-child");
                    $firstOption.attr("selected", true);
                    $firstOption.attr("defaultSelected", true);
                }
            }
        });
    });

    if (typeof MegaFormsIgnoreDetectChangesClass != undefined && MegaFormsIgnoreDetectChangesClass != null && MegaFormsIgnoreDetectChangesClass != '') {
        //wire up any other items to ignore which could be anywhere on the screen, not within a form
        $("." + MegaFormsIgnoreDetectChangesClass).each(function () {
            var $me = $(this);
            $me.click(function () {
                MvcMegaFormsLeavingPageDueToSubmitOrIgnore = true;
            });
        });
    }
}