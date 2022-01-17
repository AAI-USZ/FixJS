function(element) {
        // Apply our styling
        var root = element || document.body;

        bb.screen.apply(root.querySelectorAll('[data-bb-type=screen]'));
        bb.textInput.apply(root.querySelectorAll('input[type=text], [type=password], [type=tel], [type=url], [type=email], [type=number], [type=date], [type=time], [type=datetime], [type=month], [type=datetime-local], [type=color]'));
		bb.dropdown.apply(root.querySelectorAll('select'));
        bb.roundPanel.apply(root.querySelectorAll('[data-bb-type=round-panel]'));
        bb.textArrowList.apply(root.querySelectorAll('[data-bb-type=text-arrow-list]'));
        bb.imageList.apply(root.querySelectorAll('[data-bb-type=image-list]'));
		bb.grid.apply(root.querySelectorAll('[data-bb-type=grid-layout]'));
        bb.bbmBubble.apply(root.querySelectorAll('[data-bb-type=bbm-bubble]'));
        bb.pillButtons.apply(root.querySelectorAll('[data-bb-type=pill-buttons]'));
        bb.labelControlContainers.apply(root.querySelectorAll('[data-bb-type=label-control-container]'));
        bb.button.apply(root.querySelectorAll('[data-bb-type=button]'));
		bb.fileInput.apply(root.querySelectorAll('input[type=file]'));
		bb.slider.apply(root.querySelectorAll('input[type=range]'));
		bb.progress.apply(root.querySelectorAll('progress'));
		bb.radio.apply(root.querySelectorAll('input[type=radio]'));
		bb.activityIndicator.apply(root.querySelectorAll('[data-bb-type=activity-indicator]'));
		bb.checkbox.apply(root.querySelectorAll('input[type=checkbox]'));
        // perform device specific formatting
        bb.screen.reAdjustHeight();
    }