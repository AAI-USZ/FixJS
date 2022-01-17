function(e, ui) {
                var index = parseInt(e.target.id.replace(rssSendToFriendNoDot, ""), 10);
                // retrieve the title and body of the entry
                var subject = resultJSON.entries[((pageClicked - 1) * 3) + index].title;
                var body = resultJSON.entries[((pageClicked - 1) * 3) + index].description + "\n";
                body += "read more: " + resultJSON.entries[((pageClicked - 1) * 3) + index].link;
                // initialize the sendmessage-widget
                $(document).trigger('initialize.sendmessage.sakai', [null, null, null, subject, body]);
            }