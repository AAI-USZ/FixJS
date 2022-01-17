function() {
            if (window['tinyMCE']) {
                tinyMCE.init({
                    language: sakai.api.i18n.getEditorLanguage(),
                    mode: 'textareas',
                    theme: 'advanced',
                    skin: 'sakai',
                    formats: {
                          'caption': {
                              'inline': 'span',
                              'classes': 'caption'
                          }
                    },
                    // CSS Files to load in the editor
                    content_css: '/dev/css/sakai/main.css',
                    // Plugins and toolbar buttons to show
                    plugins: 'table,advlink,contextmenu,paste,directionality',
                    theme_advanced_blockformats: 'h1,h2,h3,h4,h5,h6,p,blockquote,caption',
                    theme_advanced_buttons1: 'bold,italic,underline,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontsizeselect,|,bullist,numlist,|,forecolor,|,link,table,code',
                    theme_advanced_buttons2: '',
                    theme_advanced_buttons3: '',
                    // Styles to be shown for tables
                    table_styles: 'Default=default',
                    table_cell_styles: 'Default=default',
                    table_row_styles: 'Default=default',
                    // Specify a toolbar that is not attached to the editor
                    theme_advanced_toolbar_location: 'external',
                    theme_advanced_toolbar_align: 'left',
                    theme_advanced_statusbar_location: 'none',
                    theme_advanced_resizing: false,
                    // Constrain the editor loading to the current widget
                    editor_selector: tuid,
                    // Resize the editor when a significant change is made
                    handle_event_callback: tinyMCEEvent,
                    onchange_callback: tinyMCEEvent,
                    init_instance_callback: initTinyMCE,
                    remove_instance_callback: stopAutoSave,
                    // Additional event handlers
                    setup : editorSetup
                });
                // Hide the widget controls
                var $containingCell = $('.htmlblock_widget', $rootel).parents('.contentauthoring_cell_element');
                $('.contentauthoring_cell_element_actions', $containingCell).addClass('s3d-force-hidden');
            }
        }