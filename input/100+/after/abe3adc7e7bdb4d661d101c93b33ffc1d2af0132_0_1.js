function init() {
        var $body = $('body');

        $('select.enable-if-js').removeAttr('disabled');

        initPrepopulatedSlugs();
        initDetailsTags();

        if ($body.is('.document')) {  // Document page


            // Put last search query into search box
            $('#support-search input[name=q]')
                .val(k.unquote($.cookie('last_search')));

            ShowFor.initForTags();
            addReferrerAndQueryToVoteForm();
            new k.AjaxVote('.document-vote form', {
                positionMessage: true
            });
            initAOABanner();
        } else if ($body.is('.review')) { // Review pages
            ShowFor.initForTags();
            initNeedsChange();

            $('img.lazy').loadnow();

            // We can enable the buttons now.
            $('#actions input').removeAttr('disabled');
        }

        if ($body.is('.edit, .new, .translate')) { // Document form page
            // Submit form
            $('#id_comment').keypress(function(e) {
                if(e.which == 13) {
                    $(this).blur();
                    $(this).closest('form').find('input[type=submit]').focus().click();
                    return false;
                }
            });

            initArticlePreview();
            initTitleAndSlugCheck();
            initPreValidation();
            initNeedsChange();
            initSummaryCount();

            $('img.lazy').loadnow();

            // We can enable the buttons now.
            $('.submit input').removeAttr('disabled');
        }

        initEditingTools();

        initL10nTest();
        initDiffPicker();
        initDiffToggle();

        Marky.createFullToolbar('.editor-tools', '#id_content');

        initReadyForL10n();

        $('img.lazy').lazyload();
    }