function init_view(view) {
    ui.PeopleView.update_trans();

    var vcard = view._header.find('.people_vcard');
    vcard.find('.mochi_button_group_item').click(function () {
        var pagename = '.' + $(this).attr('href').substring(1);
        vcard.find('.vcard_tabs_page').hide();
        vcard.find(pagename).show();

        var a = $(this).attr("name");
        $(".mochi_button_group_item[name=" + a + "]").not(this).removeClass("selected");
        $(this).addClass("selected");
        return false;
    });
    var toggle = view._header.find('.people_view_toggle');
    var sub_view_btns = toggle.find('.mochi_button_group_item');
    sub_view_btns.click(function (event) {
        var pagename = $(this).attr('href').substring(1);
        if (pagename == 'list') {
            toggle.find('.lists_memu').toggle();
        } else {
            var a = $(this).attr("name");
            sub_view_btns.not(this).removeClass('selected');
            $(this).addClass('selected');
            ui.PeopleView.switch_sub_view(view, pagename);
        }
        return false;
    });

    vcard.find('.vcard_follow').click('click',
    function (event) {
        var _this = this;
        if ($(this).hasClass('unfo')) {
            toast.set(_("unfollow_at") + view.screen_name + " ...").show();
            globals.twitterClient.destroy_friendships(view.screen_name,
            function () {
                toast.set(
                    _("unfollow_at")+ view.screen_name+" Successfully!").show();
                $(_this).text(_("follow")).removeClass('unfo').removeClass('red').addClass('blue');
            });
        } else {
            toast.set(_("follow_at") + view.screen_name + " ...").show();
            globals.twitterClient.create_friendships(view.screen_name,
            function () {
                toast.set(
                    _("follow_at")+ view.screen_name+" Successfully!").show();
                $(_this).text(_("unfollow")).addClass('unfo').removeClass('blue').addClass('red');
            });
        }
    });

    vcard.find('.vcard_edit').click(
    function (event) { 
        ui.ProfileDlg.request_profile();    
        globals.profile_dialog.open();
    });

    var people_action_more_memu = vcard.find('.people_action_more_memu');
    vcard.find('.people_action_more_trigger').mouseleave(function () {
        people_action_more_memu.hide();
    });

    vcard.find('.vcard_more').click(function () {
        people_action_more_memu.toggle();
    });

    vcard.find('.mention_menu_item').click(
    function (event) {
        ui.StatusBox.set_status_text('@' + view.screen_name+' ');
        ui.StatusBox.open(
        function() {
            ui.StatusBox.move_cursor(ui.StatusBox.POS_END);
            ui.StatusBox.change_mode(ui.StatusBox.MODE_TWEET);
        });
        people_action_more_memu.hide();
        return false;
    });

    vcard.find('.message_menu_item').click(
    function (event) {
        ui.StatusBox.set_dm_target(view.screen_name);
        ui.StatusBox.set_status_text('');
        ui.StatusBox.open(
        function () {
            ui.StatusBox.change_mode(ui.StatusBox.MODE_DM);
            ui.StatusBox.move_cursor(ui.StatusBox.POS_END);
        });
        people_action_more_memu.hide();
        return false;
    });

    vcard.find('.add_to_list_menu_item').click(
    function (event) {
        ui.AddToListDlg.load(view.screen_name);
        globals.add_to_list_dialog.open(); 
    });

    vcard.find('.block_menu_item').click(
    function (event) {
        if (!confirm("Are you sure you want to block @"+view.screen_name+"?!\n"))
            return;
        toast.set("Block @" + view.screen_name + " ...").show();
        globals.twitterClient.create_blocks(view.screen_name,
        function (result) {
            toast.set(
                "Block @"+ result.screen_name+" Successfully!").show();
            globals.blocking_ids.push(result.id_str);
        });
        people_action_more_memu.hide();
    });

    vcard.find('.unblock_menu_item').click(
    function (event) {
        toast.set("Unblock @" + view.screen_name + " ...").show();
        globals.twitterClient.destroy_blocks(view.screen_name,
        function (result) {
            toast.set(
                "Unblock @"+ result.screen_name+" Successfully").show();
            var pos = globals.blocking_ids.indexOf(result.id_str);
            if (pos !== -1) {
                globals.blocking_ids.splice(pos, 1);
            }
        });
        people_action_more_memu.hide();
    });

    vcard.find('.report_spam_menu_item').click(
    function (event) {
        if(!confirm('Are you sure you want to BLOCK them and REPORT for SPAM?')) 
            return;
        toast.set("Report @" + view.screen_name + " for spam...").show();
        globals.twitterClient.create_blocks(view.screen_name,
        function () {
            toast.set(
                "Report @"+ view.screen_name+" for Spam Successfully").show();
        });
        people_action_more_memu.hide();
    });

    var lists_memu = toggle.find('.lists_memu');
    toggle.find('.people_view_list_trigger').mouseleave(function () {
        lists_memu.hide();
    });

    lists_memu.find('.user_lists_menu_item').click(function () {
        view.is_trim = false;
        view.item_type = 'cursor';
        view.cursor = '';
        view.former = ui.Template.form_list;
        view._load = ui.PeopleView.load_lists;
        view._loadmore = ui.PeopleView.loadmore_lists;
        view._load_success = ui.Main.load_list_success;
        view._loadmore_success = ui.Main.loadmore_list_success;
        lists_memu.hide();
        sub_view_btns.removeClass('selected');
        $('.people_view_list_btn').addClass('selected');
        view.clear();
        view.load();
        return false;
    });

    lists_memu.find('.listed_lists_menu_item').click(function () {
        view.is_trim = false;
        view.item_type = 'cursor';
        view.cursor = '';
        view.former = ui.Template.form_list;
        view._load = ui.PeopleView.load_listed_lists;
        view._loadmore = ui.PeopleView.loadmore_listed_lists;
        view._load_success = ui.Main.load_list_success;
        view._loadmore_success = ui.Main.loadmore_list_success;
        lists_memu.hide();
        sub_view_btns.removeClass('selected');
        $('.people_view_list_btn').addClass('selected');
        view.clear();
        view.load();
        return false;
    });
    
    lists_memu.find('.create_list_menu_item').click(function () {
        ui.ListAttrDlg.load(globals.myself.screen_name,'');
        globals.list_attr_dialog.open(); 
        lists_memu.hide();
        return false;
    });

    view._header.find('.expand').click(function () {
        if (vcard.is(':hidden')) {
            vcard.slideDown('fast');
        } else {
            vcard.slideUp('fast');
        }
    });
}