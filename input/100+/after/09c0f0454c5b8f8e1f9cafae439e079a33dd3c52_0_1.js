function(element) {
        // Apply our styling
        var root = element || document.body;

        bb.screen.apply(root.querySelectorAll('[data-bb-type=screen]'));
        bb.textInput.apply(root.querySelectorAll('input[type=text], [type=password]'));
        bb.dropdown.apply(root.querySelectorAll('select'));
        bb.roundPanel.apply(root.querySelectorAll('[data-bb-type=round-panel]'));
        bb.textArrowList.apply(root.querySelectorAll('[data-bb-type=text-arrow-list]'));
        bb.imageList.apply(root.querySelectorAll('[data-bb-type=image-list]'));
        bb.grid.apply(root.querySelectorAll('[data-bb-type=grid-layout]'));
        bb.bbmBubble.apply(root.querySelectorAll('[data-bb-type=bbm-bubble]'));
        bb.pillButtons.apply(root.querySelectorAll('[data-bb-type=pill-buttons]'));
        bb.labelControlContainers.apply(root.querySelectorAll('[data-bb-type=label-control-container]'));
        bb.button.apply(root.querySelectorAll('[data-bb-type=button]'));

        // perform device specific formatting
        bb.screen.reAdjustHeight();
    }