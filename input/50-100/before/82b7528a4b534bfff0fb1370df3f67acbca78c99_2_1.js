function(doc, req) {
    var d = doc;

    d.text_nobreaks = d.text.replace(/\r\n|\n|\r/gm, ' ');
    d.text_nobreaks = d.text_nobreaks.replace(/[\.,-\/#!$%\^&\*;:{}=\-`~()'"]/gm, ' ');

    return {
        title: 'Log Entry: ' + doc.title,
        content: templates.render('logbook_view.html', req, d)
    };
}