function() {
                if ($(this).parent().hasClass('hassubnav')) {
                    $(this).trigger('mouseover');
                    $(this).parents('.s3d-dropdown-menu').children('a').addClass(topnavigationForceSubmenuDisplayTitle);
                }
            }