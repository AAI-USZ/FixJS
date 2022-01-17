function renderMainContent(node) {
        var content = node.prop['content'];
        if (content == null)
            content = '';
        
        var title;
        if (node.name == null)
            title = '';
        else if (node.name == '')
            title = '';
        else
            title = '<strong>' + node.name + '</strong><br/>';
        
        var line = '<div id="mainContent">' + title + content + '</div>';
        return line;
    }