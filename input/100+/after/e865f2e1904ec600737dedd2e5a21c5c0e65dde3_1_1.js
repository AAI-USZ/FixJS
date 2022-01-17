function () {
        var sinopseEditor = $('textarea.sinopse-content-editor');

        var sinopseView = $('.sinopse-content-view');

        var baseURL = SinopseMaker.slug.href();
        var slugs = SinopseMaker.slug.href;

        $.ajax({
            url: '/sinopses/json/' + slugs('last'),
            dataType: 'json',
            success: function ( data ) {
                    var holderData = SinopseMaker.content.toHtml( data );
                    
                    sinopseView.html( holderData );    
            }
        });

        var sinopseContainer = sinopseEditor.ckeditor(function () {
            var self = this;

            var EditorContent = $.ajax({
                url: '/sinopses/json/' + slugs('last'),
                dataType: 'json',
                success: function ( data ) {
                    var renderData = SinopseMaker.content.toHtml( data );
                    var holderData = document.createElement('div');
                        holderData.appendChild( renderData );

                    self.insertHtml( holderData.innerHTML );
                }
            });

            EditorContent.done(function () {
                console.log( SinopseMaker.content.toJson( self.getData() ) );
            });
        }, {
            height: 600
        });
    }