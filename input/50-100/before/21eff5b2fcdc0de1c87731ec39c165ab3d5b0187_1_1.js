function PMA_ajaxRemoveMessage($this_msgbox)
{
    if ($this_msgbox != undefined && $this_msgbox instanceof jQuery) {
        $this_msgbox
        .stop(true, true)
        .fadeOut('medium');
        if ($this_msgbox.is('.dismissable')) {
            // Here we should destroy the qtip instance, but
            // due to a bug in qtip's implementation we can
            // only hide it without throwing JS errors.
            $this_msgbox.qtip('hide');
        } else {
            $this_msgbox.remove();
        }
    }
}