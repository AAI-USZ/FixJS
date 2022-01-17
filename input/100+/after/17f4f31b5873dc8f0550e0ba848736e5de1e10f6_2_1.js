function () {
    if (arguments.length === 2) {
        this.loginfo("Sending email as with a transaction");
        return this.send_trans_email(arguments[0], arguments[1]);
    }

    var from = arguments[0],
        to   = arguments[1],
        contents = arguments[2],
        next = arguments[3];
    
    this.loginfo("Sending email via params");

    var transaction = trans.createTransaction();

    // set MAIL FROM address, and parse if it's not an Address object
    if (from instanceof Address) {
        transaction.mail_from = from;
    }
    else {
        try {
            from = new Address(from);
        }
        catch (err) {
            return next(DENY, "Malformed from: " + err);
        }
        transaction.mail_from = from;
    }

    // Make sure to is an array
    if (!(Array.isArray(to))) {
        // turn into an array
        to = [ to ];
    }

    if (to.length === 0) {
        return next(DENY, "No recipients for email");
    }

    // Set RCPT TO's, and parse each if it's not an Address object.
    for (var i=0,l=to.length; i < l; i++) {
        if (!(to[i] instanceof Address)) {
            try {
                to[i] = new Address(to[i]);
            }
            catch (err) {
                return next(DENY, "Malformed to address (" + to[i] + "): " + err);
            }
        }
    }

    transaction.rcpt_to = to;

    // Set data_lines to lines in contents
    var match;
    var re = /^([^\n]*\n?)/;
    while (match = re.exec(contents)) {
        var line = match[1];
        line = line.replace(/\n?$/, '\n'); // make sure it ends in \n
        transaction.add_data(line);
        contents = contents.substr(match[1].length);
        if (contents.length === 0) {
            break;
        }
    }

    this.send_trans_email(transaction, next);
}