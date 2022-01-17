function(target,lang) {
switch ( lang ) {
    case 'de':
        switch ( target ) {
            case 'lang_issue': return 'Problem'; break;
            case 'lang_CreateTopic': return 'Thema anlegen'; break;
            case 'lang_CreateIssue': return 'Problem anlegen'; break;
            case 'lang_CreateSolution': return 'L&ouml;sung anlegen'; break;
            case 'lang_CreateArgument': return 'Argument anlegen'; break;
            case 'lang_CreateComment': return 'Kommentar anlegen'; break;
            case 'lang_Topic': return 'Thema'; break;
            case 'lang_Solution': return 'L&ouml;sung'; break;
            case 'lang_Author': return 'Autor'; break;
            case 'lang_Description': return 'Beschreibung'; break;
            case 'lang_Title': return 'Titel'; break;
            case 'lang_Cancel': return 'Abbrechen'; break;
            case 'lang_Back': return 'zur&uuml;ck'; break;
            case 'lang_Pro': return 'Pro'; break;
            case 'lang_Contra': return 'Contra'; break;
            case 'lang_Neutral': return 'Neutral'; break;
        }; break;
    }
}