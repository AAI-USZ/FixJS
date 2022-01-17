function(err, results) {
        var wiki_filename = __dirname + '/' + wiki_destination + '/' + page.title + '.wiki';
        var md_filename = get_page_path(page);
        var text = results[0].old_text.toString();
        var markdown = mw2md_topspot.before(text);
        markdown = mw2md.convert(markdown, page.title);
        markdown = mw2md_topspot.after(markdown);

        save_to_file(wiki_filename, text, function() {
            save_to_file(md_filename, markdown, function() {
                save_mediawiki_html(page.title, last);
            });
        });
    }