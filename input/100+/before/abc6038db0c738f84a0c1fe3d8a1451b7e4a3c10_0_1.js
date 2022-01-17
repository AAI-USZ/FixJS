function(format) {
        var adapter = this;

        adapter.$editorTextarea = $('#' + adapter.id).css({
            width: '100%',
            background: 'white',
            'white-space': 'pre',
            resize: 'none'
        });
        adapter.$editorTextareaParent = adapter.$editorTextarea.parent();
        adapter.$editorElement = adapter.$editorTextarea;

        var config = $.extend({}, this.constructor.config);
        var init_instance_callback = config['init_instance_callback'];
        config['init_instance_callback'] = function(ed) {
            init_instance_callback.apply(this, arguments);
            adapter._init_instance_callback.apply(adapter, arguments);
        };
        config['elements'] = adapter.id;

        config['content_css'] =
            (config['content_css'] + ',' + adapter.commonOptions['content_css_list'].join(','))
            .replace(/^,+/, '');
        config['body_class'] =
            config['body_class'] + ' ' + adapter.commonOptions['body_class_list'].join(' ')
        if (! config['body_id']) {
            config['body_id'] = adapter.id;
        }

        tinyMCE.init(config);
            
        adapter.setFormat(format, true);
    }