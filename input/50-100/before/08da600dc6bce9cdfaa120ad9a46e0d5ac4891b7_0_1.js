function()
{
    NavMain.unlinkMainMenuItems();

    $('#nav-main-menu').attr('aria-hidden', 'true');

    $(document).click(NavMain.handleDocumentClick);
    $('a, input, textarea, button, :focus')
        .focus(NavMain.handleDocumentFocus);

    NavMain.smallMode = true;
}