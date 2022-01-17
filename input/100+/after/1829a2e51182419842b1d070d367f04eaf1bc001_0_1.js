function() {
            var toBlog = false;
            var toWhere = "dash";
            if (/www\.tumblr\.com\/blog\/[^\/]+\/new/.test(location.href)) {
               toBlog = true;
            }
            var state = $('#post_state').val();
            if (state === "0") {
               toWhere = "dash";
            }
            else if (state === "2" || state === "on.2") {
               toWhere = "queue";
            }
            else if (state === "1") {
               toWhere = "drafts";
            }
            else if (state === "private") {
               toWhere = "blog";
            }

            var chan = $('#channel_id');
            var blog = "0";
            if (chan.length > 0) {
               blog = chan.val();
            }
            if (blog === "0" && (toBlog || toWhere !== "dash")) {
               var list = $('#user_channels li');
               if (list.length > 0) {
                  list.each(function() {
                     var acct = this.id.match(/tab-(.*)/);
                     if (!acct) { return; }
                     acct = acct[1];
                     if ($('#channel_id option[value="' + acct + '"]').
                           length === 0) {
                        blog = acct;
                        return false;
                     }
                  });
               }
            }
            if (blog === "0") { return; }

            var redirect = "/dashboard";
            if ((toWhere === "dash" && toBlog) || toWhere === "blog") {
               redirect = "/blog/" + blog;
            }
            else if (toWhere === "queue") {
               redirect = "/blog/" + blog + "/queue";
            }
            else if (toWhere === "drafts") {
               redirect = "/blog/" + blog + "/drafts";
            }

            var redirecter = $('input[name="redirect_to"]');
            if (redirecter.length === 0) {
               redirecter = $('<input />', {type: "hidden", name: "redirect_to"}).appendTo('#edit_post');
            }
            redirecter.val(redirect);
         }