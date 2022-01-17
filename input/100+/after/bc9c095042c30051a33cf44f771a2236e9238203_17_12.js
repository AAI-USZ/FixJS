function() {
                $('#topnavigation_search_results').hide();
                if ($('#navigation_anon_signup_link:focus').length) {
                    $('#navigation_anon_signup_link:focus').blur();
                }

                // close another sub menu if ones open
                closeMenu();
                closePopover();

                $openMenu = $(this);
                $openMenu.removeClass('topnavigation_close_override');
                $openMenu.children(subnavtl).show();
                $openMenu.children(navLinkDropdown).children('ul').attr('aria-hidden', 'false');
                var $subnav = $openMenu.children(navLinkDropdown);

                var pos = $openMenu.position();
                $subnav.css('left', pos.left - 2);
                $subnav.show();

                if ($openMenu.children(topnavigationExternalLogin).length) {
                    // adjust margin of external login menu to position correctly according to padding and width of menu
                    var menuPadding = parseInt($openMenu.css('paddingRight').replace('px', ''), 10) +
                         $openMenu.width() -
                         parseInt($subnav.css('paddingRight').replace('px', ''), 10) -
                         parseInt($subnav.css('paddingLeft').replace('px', ''), 10);
                    var margin = ($subnav.width() - menuPadding) * -1;
                    $subnav.css('margin-left', margin + 'px');
                }
            }