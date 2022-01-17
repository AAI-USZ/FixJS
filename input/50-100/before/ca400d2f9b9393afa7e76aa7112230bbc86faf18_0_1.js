function renderMainContent(node) {
        var content = node.prop['content'];
        if (content == null)
            content = '';
        
        var line = '<div id="mainContent"><strong>' + node.name +  '</strong><br/>' + content + '</div>';
        return line;
    }