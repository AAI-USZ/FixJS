function () {
    MvcMegaForms.AttachEvents();

    if (typeof MegaFormsDetectAllFormChanges != undefined && MegaFormsDetectAllFormChanges === true) {
        //wire up submit buttons
        $("input:submit").each(function () {
            var $me = $(this);
            $me.click(function () {
                MvcMegaFormsLeavingPageDueToSubmit = true;
            });
        });

        //ensure all selects that have options have a selected option (otherwise it will always say they changed)
        $("select").each(function () {
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
    }
}