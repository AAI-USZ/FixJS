function(img){
        $('#logo-cat-thumbs-list').append(
            '<div class="file-entry logo-entry" org-category="' + img.id + '">' +
                '<img src="/static/' + img.filename + '" alt="img" class="logo-thumb">' +
            '</div>'
        );
    }