function loadResponseDataCallback()
{
    formResponseMngr.callback = null;// initial callback is for setup, subsequent reloads must set desired callback
    var dropdownLabel, dropdownLink, dropDownContainer, dropDownCaret, dropDownCaretLink, idx;

    // get geoJSON data to setup points - relies on questions having been parsed
    var geoJSON = formResponseMngr.getAsGeoJSON();

    _rebuildMarkerLayer(geoJSON);

    // just to make sure the nav container exists
    var navContainer = $(navContainerSelector);
    if(navContainer.length == 1)
    {
        // add language selector
        if(formJSONMngr.supportedLanguages.length > 1)
        {
            $('<li />').html(
                $('<a />', { text: "Language", href: '#'}).addClass("language-label")
            ).appendTo(navContainer);

            dropDownContainer = _createElementAndSetAttrs('li', {"class":"dropdown language-picker"});
            dropdownCaretLink = _createElementAndSetAttrs('a', {"href":"#", "class":"dropdown-toggle",
                "data-toggle":"dropdown"});
            dropdownCaret = _createElementAndSetAttrs('b', {"class":"caret"});
            dropdownCaretLink.appendChild(dropdownCaret);
            dropDownContainer.appendChild(dropdownCaretLink);

            var languageUlContainer = _createElementAndSetAttrs("ul", {"class":"dropdown-menu"});

            // create links for select one questions
            selectOneQuestions = formJSONMngr.getSelectOneQuestions();
            for(idx in formJSONMngr.supportedLanguages)
            {
                var language = getLanguageAt(idx);
                var languageAnchor = _createElementAndSetAttrs('a', {"class":"language", "data":idx.toString()}, language);
                var languageLi = _createElementAndSetAttrs('li');
                languageLi.appendChild(languageAnchor);
                languageUlContainer.appendChild(languageLi);
            }
            dropDownContainer.appendChild(languageUlContainer);

            navContainer.append(dropDownContainer);

            // attach callbacks
            $('.language-picker a.language').click(function(){
                var languageIdx = parseInt($(this).attr('data'), 10);
                setLanguage(languageIdx);
            });

            // set default language
            setLanguage(0);
        } else {
            currentLanguageIdx = 0;// needed for non-multilingual forms
        }

        // check if we have select one questions
        if(formJSONMngr.getNumSelectOneQuestions() > 0)
        {
            $('<li />').html(
                $('<a />', { text: "View By", href: '#'})
            ).appendTo(navContainer);

            dropDownContainer = _createElementAndSetAttrs('li', {"class":"dropdown"});
            dropdownCaretLink = _createElementAndSetAttrs('a', {"href":"#", "class":"dropdown-toggle",
                "data-toggle":"dropdown"});
            dropdownCaret = _createElementAndSetAttrs('b', {"class":"caret"});
            dropdownCaretLink.appendChild(dropdownCaret);
            dropDownContainer.appendChild(dropdownCaretLink);

            var questionUlContainer = _createElementAndSetAttrs("ul", {"class":"dropdown-menu"});

            // create an "All" link to reset the map
            var questionLi = _createSelectOneLi({"name":"", "label":"None"});
            questionUlContainer.appendChild(questionLi);

            // create links for select one questions
            selectOneQuestions = formJSONMngr.getSelectOneQuestions();
            for(idx in selectOneQuestions)
            {
                var question = selectOneQuestions[idx];
                questionLi = _createSelectOneLi(question);
                questionUlContainer.appendChild(questionLi);
            }
            dropDownContainer.appendChild(questionUlContainer);

            navContainer.append(dropDownContainer);
            /*$('.select-one-anchor').click(function(){
             // rel contains the question's unique name
             var questionName = $(this).attr("rel");
             viewByChanged(questionName);
             })*/
        }
    }
    else
        throw "Container '" + navContainerSelector + "' not found";

    // Bind a callback that executes when document.location.hash changes.
    $(window).bind( "hashchange", function(e) {
        var hash = e.fragment;
        viewByChanged(hash);
    });

    // Since the event is only triggered when the hash changes, we need
    // to trigger the event now, to handle the hash the page may have
    // loaded with.
    $(window).trigger( "hashchange" );
}