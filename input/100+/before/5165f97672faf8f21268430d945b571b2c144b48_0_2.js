function ($, sakai) {
    // Sakai edit to remove the dependency of jquery.pager in the i18n API
    // described at https://jira.sakaiproject.org/browse/SAKIII-5700
    $.fn.pager.defaults.htmlparts = {
        'first': sakai.api.i18n.getValueForKey('FIRST'),
        'last': sakai.api.i18n.getValueForKey('LAST'),
        'prev': '<span><div class="sakai_pager_prev"></div> <a href="javascript:;" class="t" title="' + sakai.api.i18n.getValueForKey('PREVIOUS_PAGE') + '">' + sakai.api.i18n.getValueForKey('PREV') + '</span></a>',
        'next': '<span><a href="javascript:;" class="t" title="' + sakai.api.i18n.getValueForKey('NEXT_PAGE') + '">' + sakai.api.i18n.getValueForKey('NEXT') + '</a><div class="sakai_pager_next"></div></span>',
        'current': '<li class="page-number"><a href="javascript:;" title="' + sakai.api.i18n.getValueForKey('PAGE') + ' ${page}">${page}</a></li>'
    };
}