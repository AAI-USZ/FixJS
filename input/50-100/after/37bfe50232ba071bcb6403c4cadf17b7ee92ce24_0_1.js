function(event,ui){
        if (isTip1) { $tip1.hide(); }
        if (isTip2) { $tip2.show(); }
        if (isTip1 || isTip2) {
            $block
            .addClass('ipWizardExposeContent')
            .expose({
                zIndex: 998,
                color: '#000'
            });
        }
    }