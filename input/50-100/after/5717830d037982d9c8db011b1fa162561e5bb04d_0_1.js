function replyToJSON(reply) {
    var replydoc = xml.parseXmlString(reply.toString());
    var entries = replydoc.find('//p:affiliation', {p: pubsub.ownerNS});

    var subscriptions = {};
    entries.forEach(function(entry) {
        var jid = entry.attr('jid').value();
        var affiliation = entry.attr('affiliation').value();
        subscriptions[jid] = affiliation;
    });

    return subscriptions;
}