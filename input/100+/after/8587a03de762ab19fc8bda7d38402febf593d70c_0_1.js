function() {
    $('.button').button();
    $('ul.menu li a').button();
    $('ul.breadcrumbs').buttonset();
    $('div.progress').each(function f(i, e) {e = $(e); e.progressbar({ value: parseInt(e.attr('id')) })});
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
    $('table.sort').each(function() {
        var table = $(this);
        $(this).find('thead th')
            .each(function(){

            var th = $(this),
                thIndex = th.index(),
                inverse = 1,
                tbody = th.parents('table').find('tbody'),
                thead = th.parents('table').find('thead');
            if (th.text() == '') {
                return;
            }
            // Second column contains percent with colspan
            if (thIndex >= 1 && !table.hasClass('simple')) {
                thIndex += 1;
            }
            th.attr('title', gettext("Sort this column")).addClass('sort').append('<span class="sort ui-icon ui-icon-carat-2-n-s" />');

            th.click(function(){

                tbody.find('td,th').filter(function(){
                    return $(this).index() === thIndex;
                }).sortElements(function(a, b){
                    return inverse * cell_cmp($.text([a]), $.text([b]));
                }, function(){

                    // parentNode is the element we want to move
                    return this.parentNode;

                });
                thead.find('span.sort').removeClass('ui-icon-carat-1-n ui-icon-carat-1-s').addClass('ui-icon-carat-2-n-s');
                if (inverse == 1) {
                    $(this).find('span.sort').addClass('ui-icon-carat-1-n').removeClass('ui-icon-carat-2-n-s');
                } else {
                    $(this).find('span.sort').addClass('ui-icon-carat-1-s').removeClass('ui-icon-carat-2-n-s');
                }

                inverse = inverse * -1;

            });
        });

    });
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
}