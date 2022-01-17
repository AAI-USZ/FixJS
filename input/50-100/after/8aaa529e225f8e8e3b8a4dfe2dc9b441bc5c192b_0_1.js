function(m, header, id, inner, close_header) {
        var title = inner.replace(/<[^>]+>/g, '').trim();

        if (title !== 'Table of Contents') {
            result.toc.push({
                title: title,
                id: id
            });
        }

        return '<' + header + ' id="' + id + '">' + inner + ' <a href="#' + id + '" class="deep-link">#</a></' + header + '>';
    }