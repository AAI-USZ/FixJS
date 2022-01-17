function(event,data){
        //data.widgetButton
        if (isTip1 || isTip2) {
            $.mask.close();
            $block.removeClass('ipWizardExposeContent');
        }
        if (isTip1) { $tip1.show(); }
        if (isTip2) { $tip2.hide(); }
    }