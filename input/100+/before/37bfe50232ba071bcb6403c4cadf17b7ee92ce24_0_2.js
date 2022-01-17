function(event,data){
        var $openedWidget = $('#ipWidget-'+data.instanceId);
        var $removingWidget = $openedWidget.prev();
        if (isTip3) {
            var $widgetBody = $openedWidget.find('.ipaBody');
            $widgetBody.tooltip({
                events : { def : ',', tooltip: 'mouseenter' },
                offset : [(-$removingWidget.outerHeight(true)-17),0], // touching by arrow
                position: 'top center',
                tip : '#ipAdminWizardTip-3'
            });
            var tip3Data = $widgetBody.data('tooltip');
            tip3Data.show();
            $openedWidget.bind('click',function(event){
                ipWizardTipDisable(3);
                isTip3 = false;
            });
        }
        if (isTip4) {
            var $widgetConfirm = $openedWidget.find('.ipActionWidgetSave');
            $widgetConfirm.tooltip({
                events : { def : ',', tooltip: 'mouseenter' },
                offset : [(-$removingWidget.outerHeight(true)+17),((-$widgetConfirm.outerWidth() / 2) - 10 - 17)],
                position: 'bottom right',
                tip : '#ipAdminWizardTip-4'
            });
            var tip4Data = $widgetConfirm.data('tooltip');
            tip4Data.show();
            $tip4.hide();
            if (isTip3) {
                $openedWidget.bind('click',function(event){
                    $tip4.show();
                });
            } else {
                $tip4.show();
            }
            $widgetConfirm.bind('click',function(event){
                ipWizardTipDisable(4);
                isTip4 = false;
            });
        }
        if (isTip5) {
            var $widgetConfirm = $openedWidget.find('.ipActionWidgetSave');
            $widgetConfirm.bind('click',function(event){
                $tip5.show();
            });
        }
    }