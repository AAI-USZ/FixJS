function(ed, url) {

            var plugin         = this;

            var id             = ed.id;

            var idLengbth      = id.length;

            var blogId         = $('#blog-id').val() || 0;

            var proxies        = {};

            var hiddenControls = [];

            var $container     = null;

            var savedBookmark  = null;



            var supportedButtonsCache = {};

            var buttonRows            = this._initButtonSettings(ed);

            var sourceButtons         = {};







            ed.mtProxies = proxies;

            ed.mtEditorStatus = {

                mode: 'wysiwyg',

                format: 'richtext'

            };





            function supportedButtons(mode, format) {

                var k = mode + '-' + format;

                if (! supportedButtonsCache[k]) {

                    supportedButtonsCache[k] = {};

                    $.each(ed.mtButtons, function(name, button) {

                        if (button.isSupported(mode, format)) {

                            supportedButtonsCache[k][name] = button;

                        }

                    });

                }



                return supportedButtonsCache[k];

            };



            function updateButtonVisibility() {

                var s = ed.mtEditorStatus;

                $.each(hiddenControls, function(i, k) {

                    $container

                        .find('.mce_' + k)

                        .css({

                            display: ''

                        })

                        .removeClass('mce_mt_button_hidden');

                    ed.controlManager.setDisabled(this, false);

                });

                hiddenControls = [];



                var supporteds = supportedButtons(s.mode, s.format);



                function update(key) {

                    if (! supporteds[key]) {

                        $container.find('.mce_' + key)

                            .css({

                                display: 'none'

                            })

                            .addClass('mce_mt_button_hidden');

                        hiddenControls.push(key);

                    }

                }



                if (s.mode == 'source') {

                    proxies.source.setFormat(s.format);

                    $.each(ed.controlManager.controls, function(k, c) {

                        if (! c.classPrefix) {

                            return;

                        }

                        update(k.substr(idLengbth+1));

                    });

                }

                else {

                    $.each(ed.mtButtons, function(name, button) {

                        update(name);

                    });

                }

                $('#' + id + '_toolbargroup > span > table').each(function(i) {

                    if (buttonRows[s.mode][i]) {

                        $(this).show();

                    }

                    else {

                        $(this).hide();

                    }

                });

            }



            function openDialog(mode, param) {

                $.fn.mtDialog.open(

                    ScriptURI + '?' + '__mode=' + mode + '&amp;' + param

                );

            }



            function setPopupWindowLoadedHook(callback) {

                $.each(ed.windowManager.windows, function(k, w) {

                    var iframe  = w.iframeElement;

                    $('#' + iframe.id).load(function() {

                        var win = this.contentWindow;

                        var context = {

                            '$contents': $(this).contents(),

                            'window': win

                        };

                        callback(context, function() {

                            win.tinyMCEPopup.close();



                            //Move focus if webkit so that navigation back will read the item.

                            if (tinymce.isWebKit) {

                                $('#convert_breaks').focus();

                            }

                            proxies.source.focus();

                        });

                    });

                });

            }



            function mtSourceLinkDialog(c, close) {

                function onSubmit() {

                    var $form = $(this);

                    proxies

                        .source

                        .execCommand(

                            'createLink',

                            null,

                            $form.find('#href').val(),

                            {

                                'target': $form.find('#target_list').val(),

                                'title': $form.find('#linktitle').val()

                            }

                        );

                    close();

                };



                c['$contents']

                    .find('form')

                    .attr('onsubmit', '')

                    .submit(onSubmit);



                if (! proxies.source.isSupported('createLink', ed.mtEditorStatus['format'], 'target')) {

                    c['$contents']

                        .find('#targetlistlabel')

                        .closest('tr')

                        .hide();

                }

            }



            function initSourceButtons(mode, format) {

                $.each(ed.mtButtons, function(name, button) {

                    var command;

                    if (

                        button['onclickFunctions'] &&

                        (command = button['onclickFunctions']['source']) &&

                        (typeof(command) == 'string') &&

                        (plugin.buttonSettings.indexOf(name) != -1)

                       ) {

                        sourceButtons[name] = command;

                    }

                });

            }



            function updateSourceButtonState(ed, cm) {

                $.each(sourceButtons, function(k, command) {

                    cm.setActive(k, ed.mtProxies['source'].isStateActive(command));

                });

            }





            ed.onInit.add(function() {

                $container = $(ed.getContainer());

                updateButtonVisibility();

                initSourceButtons();

                ed.theme.resizeBy(0, 0);

            });



            this._setupExplicitButtonActivation(ed);



            ed.addCommand('mtGetStatus', function() {

                return ed.mtEditorStatus;

            });



            ed.addCommand('mtSetStatus', function(status) {

                $.extend(ed.mtEditorStatus, status);

                updateButtonVisibility();

            });



            ed.addCommand('mtGetProxies', function() {

                return proxies;

            });



            ed.addCommand('mtSetProxies', function(_proxies) {

                $.extend(proxies, _proxies);

            });



            ed.addCommand('mtRestoreBookmark', function(bookmark) {

                if (! bookmark) {

                    bookmark = savedBookmark;

                }

                if (bookmark) {

                    ed.selection.moveToBookmark(savedBookmark);

                }

            });



            ed.addCommand('mtSaveBookmark', function() {

                return savedBookmark = ed.selection.getBookmark();

            });





            $(window).bind('dialogDisposed', function() {

                savedBookmark = null;

            });



            // Register buttons

            ed.addButton('mt_insert_html', {

                title : 'mt.insert_html',

                onclick : function() {

                    ed.windowManager.open({

                        file : url + '/insert_html.html',

                        width : 430,

                        height : 335,

                        inline : 1

                    }, {

                        plugin_url : url

                    });

                }

            });



            ed.addMTButton('mt_insert_image', {

                title : 'mt.insert_image',

                onclick : function() {

                    ed.execCommand('mtSaveBookmark');

                    openDialog(

                        'dialog_list_asset',

                        '_type=asset&amp;edit_field=' + id + '&amp;blog_id=' + blogId + '&amp;dialog_view=1&amp;filter=class&amp;filter_val=image'

                    );

                }

            });



            ed.addMTButton('mt_insert_file', {

                title : 'mt.insert_file',

                onclick : function() {

                    ed.execCommand('mtSaveBookmark');

                    openDialog(

                        'dialog_list_asset',

                        '_type=asset&amp;edit_field=' + id + '&amp;blog_id=' + blogId + '&amp;dialog_view=1'

                    );

                }

            });



            ed.addMTButton('mt_source_bold', {

                title : 'mt.source_bold',

                text : 'strong',

                mtButtonClass: 'text',

                onclickFunctions : {

                    source: 'bold'

                }

            });



            ed.addMTButton('mt_source_italic', {

                title : 'mt.source_italic',

                text : 'em',

                mtButtonClass: 'text',

                onclickFunctions : {

                    source: 'italic'

                }

            });



            ed.addMTButton('mt_source_blockquote', {

                title : 'mt.source_blockquote',

                text : 'blockquote',

                mtButtonClass: 'text',

                onclickFunctions : {

                    source: 'blockquote'

                }

            });



            ed.addMTButton('mt_source_unordered_list', {

                title : 'mt.source_unordered_list',

                text : 'ul',

                mtButtonClass: 'text',

                onclickFunctions : {

                    source: 'insertUnorderedList'

                }

            });



            ed.addMTButton('mt_source_ordered_list', {

                title : 'mt.source_ordered_list',

                text : 'ol',

                mtButtonClass: 'text',

                onclickFunctions : {

                    source: 'insertOrderedList'

                }

            });



            ed.addMTButton('mt_source_list_item', {

                title : 'mt.source_list_item',

                text : 'li',

                mtButtonClass: 'text',

                onclickFunctions : {

                    source: 'insertListItem'

                }

            });



            ed.addMTButton('mt_source_link', {

                title : 'mt.insert_link',

                onclickFunctions : {

                    source: function(cmd, ui, val) {

                        tinymce._setActive(ed);

                        this.theme['_mceLink'].apply(this.theme);

                        setPopupWindowLoadedHook(mtSourceLinkDialog);

                    }

                }

            });



            ed.addMTButton('mt_source_mode', {

                title : 'mt.source_mode',

                onclickFunctions : {

                    wysiwyg: function() {

                        ed.execCommand('mtSetFormat', 'none.tinymce_temp');

                    },

                    source: function() {

                        ed.execCommand('mtSetFormat', 'richtext');

                    }

                }

            });





            if (! ed.onMTSourceButtonClick) {

                ed.onMTSourceButtonClick = new tinymce.util.Dispatcher(ed);

            }

            ed.onMTSourceButtonClick.add(updateSourceButtonState);



            ed.onNodeChange.add(function(ed, cm, n, co, ob) {

                var s = ed.mtEditorStatus;



                if (ed.mtEditorStatus['mode'] == 'source' &&

                    ed.mtEditorStatus['format'] != 'none.tinymce_temp'

                ) {

                    $('#' + id + '_mt_source_mode').css('display', 'none');

                }

                else {

                    $('#' + id + '_mt_source_mode').css('display', '');

                }



                var active =

                    ed.mtEditorStatus['mode'] == 'source' &&

                    ed.mtEditorStatus['format'] == 'none.tinymce_temp';

                cm.setActive('mt_source_mode', active);



                if (! ed.mtProxies['source']) {

                    return;

                }



                updateSourceButtonState(ed, ed.controlManager);

            });

        }