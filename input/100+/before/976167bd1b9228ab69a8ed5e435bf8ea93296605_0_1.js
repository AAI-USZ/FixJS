function(err, details) {
                if (err) {
                    ac.error(new Error("YQL Error"));
                    return;
                }
                //Y.log(details);
                details.intl = {
                    DATE_POSTED:    ac.intl.lang('DATE_POSTED'),
                    TITLE:          ac.intl.lang('TITLE'),
                    TITLE_NONE:     ac.intl.lang('TITLE_NONE'),
                    DESCRIPTION:    ac.intl.lang('DESCRIPTION'),
                    DESCRIPTION_NONE: ac.intl.lang('DESCRIPTION_NONE'),
                    OWNER_USERNAME: ac.intl.lang('OWNER_USERNAME'),
                    TAGS:           ac.intl.lang('TAGS'),
                    TAGS_NONE:      ac.intl.lang('TAGS_NONE'),
                    URLS:           ac.intl.lang('URLS'),
                    URL_PHOTO_PAGE: ac.intl.lang('URL_PHOTO_PAGE'),
                    URL_IMAGE:      ac.intl.lang('URL_IMAGE')
                };
                details.intl.posted = ac.intl.formatDate(new Date(1000 * Number(details.dates.posted)));

                // The mustache library we're using is a little finicky.
                details.title = details.title || false;
                if (details.title) {
                    details.have_title = true;
                }
                details.description = details.description || false;
                if (details.description) {
                    details.have_description = true;
                }
                details.tags = details.tags || false;

                ac.assets.addCss('./index.css');
                ac.done(details);
            }