function()
{
    if (NavMain.smallMenuOpen) {
        return;
    }

    $('#nav-main-menu')
        .slideDown(150)
        .removeAttr('aria-hidden');

    $('#nav-main .toggle').addClass('open');

    // add click handler and set submenu class on submenus
    NavMain.mainMenuLinks
        .addClass('submenu-item')
        .click(NavMain.handleSubmenuClick);

    // focus first item
    $('#nav-main-menu [tabindex=0]').get(0).focus();

    NavMain.smallMenuOpen = true;
}