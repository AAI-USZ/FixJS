function (e, ui){
        if ($(ui).data('role') === 'content' ||
            $(ui).data('role') === 'page') {
            setSelected(null);
        } else if (!$(ui).hasClass('ui-selected')) {
            setSelected(ui);
        } else if (e.ctrlKey) {
            setSelected(null);
        }
        e.stopPropagation();
        return false;  // Stop event bubbling
    }