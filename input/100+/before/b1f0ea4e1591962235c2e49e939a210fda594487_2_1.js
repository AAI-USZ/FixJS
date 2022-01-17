function(id, options) {
        this.id = id;
        var opt = this.options = $.extend({
            format: 'richtext',
            wrap: false,
            wrapTag: this.constructor.defaultWrapTag,
            wrapClass: this.constructor.defaultWrapClass
        }, options);
        this.editors = {};

        this.parentElement = null;
        if (this.options['wrap']) {
            this.parentElement = $('#' + id)
                .wrap('<'+opt['wrapTag']+' class="'+opt['wrapClass']+'" />')
                .parent();
        }
        this.currentEditor = this.editorInstance(this.options['format']);
        this.currentEditor.initOrShow(this.options['format']);

        $('#' + id).data('mt-editor', this);
    }