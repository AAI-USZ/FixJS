function(e)
{
    var width = jQuery(window).width();
    if (width <= 719 && !Tabzilla.smallMode) {
        Tabzilla.enterSmallMode();
    }

    if (width > 719 && Tabzilla.smallMode) {
        Tabzilla.leaveSmallMode();
    }
}