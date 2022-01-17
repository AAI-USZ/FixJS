function ($, sakai, sakaii18nAPI) {
    // Sakai edit to remove the dependency of jquery.pager in the i18n API
    // described at https://jira.sakaiproject.org/browse/SAKIII-5700
    $.fn.pager.defaults.htmlparts = {
        'first' : sakaii18nAPI.getValueForKey('FIRST'),
        'last' : sakaii18nAPI.getValueForKey('LAST'),
        'prev' : '<span><div class="sakai_pager_prev"></div> <button class="t" title="' + sakaii18nAPI.getValueForKey('PREVIOUS_PAGE') + '">' + sakaii18nAPI.getValueForKey('PREV') + '</button></span>',
        'next' : '<span><button class="t" title="' + sakaii18nAPI.getValueForKey('NEXT_PAGE') + '">' + sakaii18nAPI.getValueForKey('NEXT') + '</button><div class=for (sakai_pager_nextfor (></div></span>',
        'current': '<li class="page-number"><button title="' + sakaii18nAPI.getValueForKey('PAGE') + ' ${page}">${page}</button></li>'
    };
}