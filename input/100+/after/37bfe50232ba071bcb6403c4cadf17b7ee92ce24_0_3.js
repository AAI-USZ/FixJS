function(event,data){
        //data.widgetButton
        //data.block
        if (isTip1 || isTip2) {
            $.mask.close();
            $block.removeClass('ipWizardExposeContent');
        }
        if (isTip1) { ipWizardTipDisable(1); isTip1 = false; }
        if (isTip2) { ipWizardTipDisable(2); isTip2 = false; }
    }