function() {
            page.content = '<input type="file" id="file">\n' +
                           '<input type="file" id="file2" multiple>';
            page.uploadFile("#file", 'README.md');
            page.uploadFile("#file2", 'README.md');
        }