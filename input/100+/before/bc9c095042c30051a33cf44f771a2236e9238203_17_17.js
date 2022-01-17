function(){

            sakai.api.Util.hideOnClickOut("#topnavigation_user_messages_container .s3d-dropdown-menu", "", function(){
                hideMessageInlay();
            });

            // Navigation hover binding
            var closeMenu = function(e){
                if ($openMenu.length){
                    $openMenu.children("a").removeClass(topnavigationForceSubmenuDisplayTitle);
                    $openMenu.children(subnavtl).hide();
                    $openMenu.children(navLinkDropdown).children("ul").attr("aria-hidden", "true");
                    $openMenu.children(navLinkDropdown).hide();
                    $openMenu = false;
                }
            };
            // Navigation popover binding
            var closePopover = function(e){
                if ($openPopover.length){
                    $openPopover.prev().removeClass("selected");
                    $openPopover.attr("aria-hidden", "true");
                    $openPopover.hide();
                    $openPopover = false;
                }
            };
            var openMenu = function(){
                $("#topnavigation_search_results").hide();
                if ($("#navigation_anon_signup_link:focus").length){
                    $("#navigation_anon_signup_link:focus").blur();
                }

                // close another sub menu if ones open
                closeMenu();
                closePopover();

                $openMenu = $(this);
                $openMenu.removeClass("topnavigation_close_override");
                $openMenu.children(subnavtl).show();
                $openMenu.children(navLinkDropdown).children("ul").attr("aria-hidden", "false");
                var $subnav = $openMenu.children(navLinkDropdown);

                var pos = $openMenu.position();
                $subnav.css("left", pos.left - 2);
                $subnav.show();

                if ($openMenu.children(topnavigationExternalLogin).length){
                    // adjust margin of external login menu to position correctly according to padding and width of menu
                    var menuPadding = parseInt($openMenu.css("paddingRight").replace("px", ""), 10) +
                         $openMenu.width() -
                         parseInt($subnav.css("paddingRight").replace("px", ""), 10) -
                         parseInt($subnav.css("paddingLeft").replace("px", ""), 10);
                    var margin = ($subnav.width() - menuPadding) * -1;
                    $subnav.css("margin-left", margin + "px");
                }
            };


            var toggleInternalLogin = function() {
                $(topnavUserOptionsLoginForm).toggle();
            };

            $('#topnavigation_container').on(
                'click',
                '#topnavigation_toggle_internal_login',
                toggleInternalLogin);

            $(hasSubnav).hover(openMenu, function(){
                closePopover();
                closeMenu();
            });

            // remove focus of menu item if mouse is used
            $(hasSubnav + " div").find("a").hover(function(){
                if ($openMenu.length) {
                    $openMenu.find("a").blur();
                }
            });

            // bind down/left/right/letter keys for explore menu
            $("#topnavigation_container .topnavigation_explore .s3d-dropdown-menu,.topnavigation_counts_container button").keydown(function(e) {
                var $focusElement = $(this);
                if (e.which === $.ui.keyCode.DOWN && $focusElement.hasClass("hassubnav")) {
                    $focusElement.find("div a:first").focus();
                    return false; // prevent browser page from scrolling down
                } else if (e.which === $.ui.keyCode.LEFT || (e.which === $.ui.keyCode.TAB && e.shiftKey) && $focusElement.attr("id") !== "topnavigation_user_options_login_wrapper") {
                    closeMenu();
                    closePopover();
                    if($focusElement.parents(".topnavigation_counts_container").length){
                        $focusElement = $focusElement.parents(".topnavigation_counts_container");
                    }
                    if($focusElement.prev(".topnavigation_counts_container").length){
                        $focusElement.prev(".topnavigation_counts_container").children("button").focus();
                        return false;
                    } else if ($focusElement.prev("li:first").length){
                        $focusElement.prev("li:first").children("a").focus();
                        return false;
                    } else if (!(e.which === $.ui.keyCode.TAB && e.shiftKey)){
                        $focusElement.nextAll("li:last").children("a").focus();
                        return false;
                    }
                } else if ((e.which === $.ui.keyCode.RIGHT || e.which === $.ui.keyCode.TAB) && $focusElement.attr("id") !== "topnavigation_user_options_login_wrapper") {
                    closeMenu();
                    closePopover();
                    if($focusElement.parents(".topnavigation_counts_container").length){
                        $focusElement = $focusElement.parents(".topnavigation_counts_container");
                    }
                    if($focusElement.next(".topnavigation_counts_container").length){
                        $focusElement.next(".topnavigation_counts_container").children("button").focus();
                    } else if ($focusElement.next("li:first").length){
                        $focusElement.next("li:first").children("a").focus();
                    } else if ($focusElement.prevAll("li:last").length && e.which === $.ui.keyCode.RIGHT){
                        $focusElement.prevAll("li:last").children("a").focus();
                    } else {
                        $("#topnavigation_search_input").focus();
                    }
                    return false;
                } else if ($focusElement.hasClass("hassubnav") && $focusElement.children("a").is(":focus")) {
                    // if a letter was pressed, search for the first menu item that starts with the letter
                    var key = String.fromCharCode(e.which).toLowerCase();
                    $focusElement.find("ul:first").children().each(function(index, item){
                        var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                        if (key === firstChar){
                            $(item).find("a").focus();
                            return false;
                        }
                    });
                }
            });

            // bind keys for right menu
            $("#topnavigation_container .topnavigation_right .s3d-dropdown-menu").keydown(function(e) {
                var $focusElement = $(this);
                if (e.which === $.ui.keyCode.DOWN && $focusElement.hasClass("hassubnav")) {
                    $focusElement.find("div a:first").focus();
                    return false; // prevent browser page from scrolling down
                } else if (e.which === $.ui.keyCode.TAB && e.shiftKey) {
                    closeMenu();
                } else if ($focusElement.hasClass("hassubnav") && $focusElement.children("a").is(":focus")) {
                    // if a letter was pressed, search for the first menu item that starts with the letterletter
                    var key = String.fromCharCode(e.which).toLowerCase();
                    $focusElement.find("ul:first").children().each(function(index, item){
                        var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                        if (key === firstChar){
                            $(item).find("a").focus();
                            return false;
                        }
                    });
                }
            });

            $("#topnavigation_user_inbox_container").keydown(function(e) {
                if (e.which == $.ui.keyCode.LEFT) {
                    if ($("#topnavigation_search_input").length) {
                        // focus on search input
                        $("#topnavigation_search_input").focus();
                    }
                } else if (e.which == $.ui.keyCode.RIGHT) {
                    if ($("#topnavigation_user_options_name").length) {
                        // focus on user options menu
                        $("#topnavigation_user_options_name").focus();
                    }
                }
            });

            // bind up/down/escape keys in sub menu
            $(hasSubnav + " div a").keydown(function(e) {
                if (e.which === $.ui.keyCode.DOWN) {
                    if ($(this).parent().nextAll("li:first").length){
                        $(this).parent().nextAll("li:first").children("a").focus();
                    } else {
                        $(this).parent().prevAll("li:last").children("a").focus();
                    }
                    return false; // prevent browser page from scrolling down
                } else if (e.which === $.ui.keyCode.UP) {
                    if ($(this).parent().prevAll("li:first").length) {
                        $(this).parent().prevAll("li:first").children("a").focus();
                    } else {
                        $(this).parent().nextAll("li:last").children("a").focus();
                    }
                    return false;
                } else if (e.which === $.ui.keyCode.ESCAPE) {
                    $(this).parent().parents("li:first").find("a:first").focus();
                } else {
                    // if a letter was pressed, search for the next menu item that starts with the letter
                    var keyPressed = String.fromCharCode(e.which).toLowerCase();
                    var $activeItem = $(this).parents("li:first");
                    var $menuItems = $(this).parents("ul:first").children();
                    var activeIndex = $menuItems.index($activeItem);
                    var itemFound = false;
                    $menuItems.each(function(index, item){
                        var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                        if (keyPressed === firstChar && index > activeIndex){
                            $(item).find("a").focus();
                            itemFound = true;
                            return false;
                        }
                    });
                    if (!itemFound) {
                        $menuItems.each(function(index, item){
                            var firstChar = $.trim($(item).text()).toLowerCase().substr(0, 1);
                            if (keyPressed === firstChar) {
                                $(item).find("a").focus();
                                return false;
                            }
                        });
                    }
                }
            });

            $(hasSubnav + " a").bind("focus",function(){
                if ($(this).parent().hasClass("hassubnav")) {
                    $(this).trigger("mouseover");
                    $(this).parents(".s3d-dropdown-menu").children("a").addClass(topnavigationForceSubmenuDisplayTitle);
                }
            });

            $("#navigation_anon_signup_link").live("hover",function(evt){
                closeMenu();
                closePopover();
            });

            // hide the menu after an option has been clicked
            $(hasSubnav + " a").live("click", function(){
                // hide the menu if a menu item was clicked
                if ($(this).parents('.s3d-dropdown-container').length) {
                    var $parentMenu = $(this).parents(hasSubnav);
                    var $parent = $(this).parent(hasSubnav);
                    if ($parent.length) {
                        $parentMenu.addClass("topnavigation_close_override");
                    }
                    $parentMenu.children(subnavtl).hide();
                    $parentMenu.children(navLinkDropdown).hide();
                }
            });

            // Make sure that the results only disappear when you click outside
            // of the search box and outside of the results box
            sakai.api.Util.hideOnClickOut("#topnavigation_search_results", "#topnavigation_search_results_container,#topnavigation_search_results_bottom_container,#topnavigation_search_input");

            $("#topnavigation_search_input").keyup(function(evt){
                var val = $.trim($(this).val());
                if (val !== "" && evt.keyCode !== 16 && val !== lastSearchVal) {
                    if (searchTimeout) {
                        clearTimeout(searchTimeout);
                    }
                    searchTimeout = setTimeout(function() {
                        doSearch();
                        lastSearchVal = val;
                    }, 200);
                } else if (val === "") {
                    lastSearchVal = val;
                    $("#topnavigation_search_results").hide();
                }
            });

            $(".topnavigation_search .s3d-search-button").bind("click", handleEnterKeyInSearch);

            $("#topnavigation_search_input").keydown(function(evt){
                var val = $.trim($(this).val());
                // 40 is down, 38 is up, 13 is enter
                if (evt.keyCode === 40 || evt.keyCode === 38) {
                    handleArrowKeyInSearch(evt.keyCode === 38);
                    evt.preventDefault();
                } else if (evt.keyCode === 13) {
                    handleEnterKeyInSearch();
                    evt.preventDefault();
                }
            });

            $(".topnavigation_user_dropdown a, .topnavigation_external_login a").keydown(function(e) {
                // if user is signed in and tabs out of user menu, or the external auth menu, close the sub menu
                if (!e.shiftKey && e.which == $.ui.keyCode.TAB) {
                    closeMenu();
                    closePopover();
                }
            });

            $("#topnavigation_user_options_login_external").click(function(){return false;});

            $("#topnavigation_user_options_login_button_login").keydown(function(e) {
                // if user is not signed in we need to check when they tab out of the login form and close the login menu
                if (!e.shiftKey && e.which == $.ui.keyCode.TAB) {
                    mouseOverSignIn = false;
                    $(topnavUserLoginButton).trigger("mouseout");
                    $("html").trigger("click");
                }
            });

            $("#topnavigation_user_options_name, #topnavigation_user_options_login_external").keydown(function(e) {
                // hide signin or user options menu when tabbing out of the last menu option
                if (!e.shiftKey && e.which == $.ui.keyCode.TAB) {
                    closeMenu();
                    closePopover();
                }
            });

            $(topnavUserOptions).bind("click", decideShowLoginLogout);

            $(topnavUserLoginButton).on('hover focus', addUserLoginValidation);

            // Make sure that the sign in dropdown does not disappear after it has
            // been clicked
            var mouseOverSignIn = false;
            var mouseClickedSignIn = false;
            $(topnavUserOptionsLoginFields).live('mouseenter', function(){
                mouseOverSignIn = true; 
            }).live('mouseleave', function(){ 
                mouseOverSignIn = false; 
            });
            $(topnavUserOptionsLoginFields).click(function(){
                mouseClickedSignIn = true;
                $(topnavUserOptionsLoginFields).addClass(topnavigationForceSubmenuDisplay);
                $(topnavigationlogin).addClass(topnavigationForceSubmenuDisplayTitle);
            });
            $("html").click(function(){ 
                if (!mouseOverSignIn) {
                    mouseClickedSignIn = false;
                    $(topnavUserOptionsLoginFields).removeClass(topnavigationForceSubmenuDisplay);
                    $(topnavigationlogin).removeClass(topnavigationForceSubmenuDisplayTitle);
                }
                // hide the login menu if it is open
                if ($(topnavUserOptionsLoginFields).is(':visible')) {
                    closeMenu();
                }
            });

            $(topnavUserLoginButton).bind("focus",function(){
                $(this).trigger("mouseover");
                mouseOverSignIn = true;
                $(topnavUserOptionsLoginFields).trigger('click');
                $(topnavigationlogin).addClass(topnavigationForceSubmenuDisplayTitle);
            });

            $("#topnavigation_search_input,#navigation_anon_signup_link,#topnavigation_user_inbox_container,.topnavigation_search .s3d-search-button").bind("focus",function(evt){
                mouseOverSignIn = false;
                $(topnavUserLoginButton).trigger("mouseout");
                $("html").trigger("click");

                if ($(this).attr("id") === "topnavigation_search_input") {
                // Search binding (don't fire on following keyup codes: shift)
                    $(this).keyup();
                    if ($.trim($("#topnavigation_search_input").val())) {
                        $("#topnavigation_search_results").show();
                    }
                }
            });

            $(topnavigationlogin).hover(function(){
                if ($("#navigation_anon_signup_link:focus").length){
                    $("#navigation_anon_signup_link:focus").blur();
                }
                closeMenu();
                closePopover();
                $(topnavUserOptionsLoginFields).show();
            },
            function(){
                $(topnavUserOptionsLoginFields).hide();
                if ($(this).children(topnavigationExternalLogin).length) {
                    $(this).children(topnavigationExternalLogin).find("ul").attr("aria-hidden", "true");
                }
            });

            $("#topnavigation_message_showall").live("click", hideMessageInlay);
            $("#topnavigation_message_readfull").live("click", hideMessageInlay);
            $(".no_messages .s3d-no-results-container a").live("click", hideMessageInlay);
            $(".topnavigation_trigger_login").live("click", forceShowLogin);

            $(window).bind("updated.messageCount.sakai", setCountUnreadMessages);
            $(window).bind("displayName.profile.updated.sakai", setUserName);
        }