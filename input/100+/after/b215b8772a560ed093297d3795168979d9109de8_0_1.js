function(message, type, author, ts, is_history) {

        ts = this._stringify_timestamp(ts);
        if (_.isUndefined(type)) type = 'msg';
        if (_.isUndefined(author)) author = '-';

        // Replace all special shortcuts
        message = TextReplacer.parse(message);

        // Suuport for me
        if (message.substr(0, 4) === '/me ') {
            message = author + message.substr(3);
            author = '*';
        }

        var authorColor = ownerColor(author);
        // Append to the end and scroll
        var history_class = is_history ? 'history' : '';
        var entry = $("<tr><td class='nick' style='color: " + authorColor + "'>" + author + "</td><td class='message'>" + message + "</td><td class='time'>" + ts + "</td></tr>");

        entry.addClass('chat-' + type);
        if (is_history) entry.addClass('history');
        if (!chatShowInfo && type === 'info') entry.addClass('hidden');

        var atEnd = this.isAtEnd();
        this.chatEl().append(entry);
        if (atEnd) {
            ScrollDown();
        }
    }