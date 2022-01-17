function(data) {
                $error.show().html((data && data.message) || "There was a problem fetching the feed from this URL.");
                $loading.removeClass('NB-active');
                $submit.removeClass('NB-disabled').attr('value', 'Fetch Feed from Website');
            }