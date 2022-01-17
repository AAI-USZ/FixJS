function(e){
                if ($openMenu.length){
                    $openMenu.children("a").removeClass(topnavigationForceSubmenuDisplayTitle);
                    $openMenu.children(subnavtl).hide();
                    $openMenu.children(navLinkDropdown).children("ul").attr("aria-hidden", "true");
                    $openMenu.children(navLinkDropdown).hide();
                    $openMenu = false;
                }
            }