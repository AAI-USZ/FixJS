function (e, ui) {
            $(ui.panel).find(".tab-loading").remove();
            $('.buttons').buttonset();
            $('.buttons .disabled').button('disable');
            $('.details-accordion').accordion({collapsible: true, active: -1});
        }