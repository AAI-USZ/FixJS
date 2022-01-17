function(event,data){
        var $openedWidget = $('#ipWidget-'+data.instanceId);
        var $widgetBody = $openedWidget.find('.ipaBody');
        var $removingWidget = $openedWidget.prev();
        if (isTip3) {
            $widgetBody.tooltip({
                events : { def : ',', tooltip: 'mouseenter' },
                offset : [(-$removingWidget.outerHeight(true)-17),0], // touching by arrow
                position: 'top center',
                tip : '#ipAdminWizardTip-3'
            });
            var tip3Data = $widgetBody.data('tooltip');
            tip3Data.show();
            $widgetBody.bind('click',function(event){
                ipWizardTipDisable(3);
                isTip3 = false;
            });
        }
        if (isTip4) {
            var $widgetConfirm = $openedWidget.find('.ipActionWidgetSave');
            $openedWidget.find('.ipaFooter').css('position','relative'); // adding position relative for tip possitioning
            $widgetConfirm.after($tip4); // moving tip next to confirm button
            $widgetConfirm.tooltip({
                events : { def : ',', tooltip: 'mouseenter' },
                offset : [17,((-$widgetConfirm.outerWidth() / 2) - 10 - 17)],
                position: 'bottom right',
                tip : '#ipAdminWizardTip-4',
                relative : true
            });
            var tip4Data = $widgetConfirm.data('tooltip');
            tip4Data.show();
            $tip4.hide();
            if (isTip3) {
                $widgetBody.bind('click',function(event){
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