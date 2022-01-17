function makeItemLinks (key, linksli) {
        //Edit single item link
        var editLink = $("<a/>");
            editLink.href = '#';
        editLink.key = key;
        var editText = "Edit Information";
        editLink.on('click', editItem);
        editLink.html = editText;
        linksli.append($(editLink));
 
        //Add line break
        var breakTag = $('<br/>');
        linksli.append($(breakTag));
 
        var deleteLink = $('<a/>');
            deleteLink.href = '#';
        deleteLink.key = key;
        var deleteText = "Delete Information";
        deleteLink.on('click', deleteItem);    
        deleteLink.html = "Delete Text";
    }