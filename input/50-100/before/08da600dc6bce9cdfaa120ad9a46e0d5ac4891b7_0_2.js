function()
{
    NavMain.relinkMainMenuLinks();

    $('#nav-main-menu').removeAttr('aria-hidden');

    $(document).unbind('click', NavMain.handleDocumentClick);
    $('a, input, textarea, button, :focus')
        .unbind('focus', NavMain.handleDocumentFocus);

    NavMain.smallMode = false;
    NavMain.smallMenuOpen = false;
}