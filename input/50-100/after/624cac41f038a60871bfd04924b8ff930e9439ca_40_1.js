function() {
            var params = {
                'state': 'ACCEPTED',
                'items': '1'
            };
            $.ajax({
                url: sakai.config.URL.CONTACTS_FIND_STATE,
                data: params,
                success: function(data) {
                    handleRecentContactsData(data.results);
                },
                error: function() {
                    handleRecentContactsData(false);
                }
            });
        }