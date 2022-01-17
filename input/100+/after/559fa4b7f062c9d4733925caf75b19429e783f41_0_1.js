function() {
    $('.button').button();
    $('ul.menu li a').button();
    $('ul.breadcrumbs').buttonset();
    load_progress();
    $('.errorlist').addClass('ui-state-error ui-corner-all');
    $('.sug-accept').button({text: false, icons: { primary: "ui-icon-check" }});
    $('.sug-delete').button({text: false, icons: { primary: "ui-icon-close" }});
    $('.navi').buttonset();
    $('.button-first').button({text: false, icons: { primary: "ui-icon-seek-first" }});
    $('.button-next').button({text: false, icons: { primary: "ui-icon-seek-next" }});
    $('.button-pos').button({text: true});
    $('.button-prev').button({text: false, icons: { primary: "ui-icon-seek-prev" }});
    $('.button-end').button({text: false, icons: { primary: "ui-icon-seek-end" }});
    $('.navi .button-disabled').button('disable');
    $('textarea.translation').change(text_change).keypress(text_change).autogrow();
    $('textarea#id_target').focus();
    $('#copy-text').button({text: true, icons: { primary: "ui-icon-arrow-1-s" }}).click(function f() {
        get_source_string(function(data) {
            mt_set(data);
        });
        return false;
    });
    if (typeof(target_language) != 'undefined') {
        load_translate_apis();
    }
    $('.ignorecheck').button({text: false, icons: { primary: "ui-icon-close" }}).click(function () {
        var parent_id = $(this).parent()[0].id;
        var check_id = parent_id.substring(6);
        $.get('/js/ignore-check/' + check_id + '/', function() {
            $('#' + parent_id).remove();
        });
    });
    load_table_sorting();
    $("div.translate-tabs").tabs({
        ajaxOptions: {
            error: function(xhr, status, index, anchor) {
                $(anchor.hash).html(gettext("AJAX request to load this content has failed!"));
            }
        },
        cookie: {
            expires: 31,
            name: 'translate-tab',
            path: '/'
        },
        cache: true,
        load: function (e, ui) {
            $(ui.panel).find(".tab-loading").remove();
        },
        show: function (e, ui) {
            var $panel = $(ui.panel);

            if ($panel.is(":empty")) {
                $panel.append("<div class='tab-loading'>" + gettext("Loading...") + "</div>");
            }
        },
        load: function (e, ui) {
            $('a.mergebutton').button({text: true, icons: { primary: "ui-icon-check" }});
        }
    });
    $("div.tabs").tabs({
        ajaxOptions: {
            error: function(xhr, status, index, anchor) {
                $(anchor.hash).html(gettext("AJAX request to load this content has failed!"));
            }
        },
        cookie: {
            expires: 31,
            name: $(this).id,
            path: '/'
        },
        cache: true,
        load: function (e, ui) {
            $(ui.panel).find(".tab-loading").remove();
            load_table_sorting();
            load_progress();
            $('.buttons').buttonset();
            $('.buttons .disabled').button('disable');
            $('.details-accordion').accordion({collapsible: true, active: -1});
            $('.confirm-reset').click(function() {

                $('<div title="' + gettext('Confirm resetting repository') + '"><p>' + gettext('Resetting the repository will throw away all local changes!') + '</p></div>').dialog({
                    modal: true,
                    autoOpen: true,
                    buttons: [
                        {
                            text: gettext("Ok"),
                            click: function() {
                                window.location = $('.confirm-reset').attr('href');
                                $(this).dialog("close");
                            },
                        },
                        {
                            text: gettext("Cancel"),
                            click: function() {
                                $(this).dialog("close");
                            }
                        }
                    ]
                });
                return false;
            });
        },
        show: function (e, ui) {
            var $panel = $(ui.panel);

            if ($panel.is(":empty")) {
                $panel.append("<div class='tab-loading'>" + gettext("Loading...") + "</div>");
            }
        },
    });
    $("#id_date").datepicker();
    $("form.autosubmit select").change(function() {
        $("form.autosubmit").submit();
    });
    $('div#s_content').hide();
}