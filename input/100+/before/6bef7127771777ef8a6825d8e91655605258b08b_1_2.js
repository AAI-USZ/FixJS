function(data)
{
	$('site.siteId')  .value = data['SITE_ID'];
	$('site.name')  .value = data['SITE_NAME'];
	$('site.organ') .value = data['SITE_ORGAN'];
    $('server.protocol').value = data['SERVER_PROTOCOL'];
	$('server.host').value = data['SERVER_HOST'];
	$('server.port').value = data['SERVER_PORT'];
	
	$('intranet.network').value = data['INTRANET_NETWORK'];
	$('intranet.netmask').value = data['INTRANET_NETMASK'];
	
	$('z3950.enable').checked = data['Z3950_ENABLE'] == 'true';
	$('z3950.port')  .value   = data['Z3950_PORT'];

	$('oai.mdmode').value = data['OAI_MDMODE'];
	$('oai.cachesize').value   = data['OAI_CACHESIZE'];
	$('oai.tokentimeout').value   = data['OAI_TOKENTIMEOUT'];
	
	$('xlinkResolver.enable').checked = data['XLINKRESOLVER_ENABLE'] == 'true';

    $('autodetect.enable').checked = data['AUTODETECT_ENABLE'] == 'true';
    $('requestedLanguage.only').checked = data['REQUESTED_LANGUAGE_ONLY'] == 'true';
    $('requestedLanguage.sorted').checked = data['REQUESTED_LANGUAGE_SORTED'] == 'true';
    $('requestedLanguage.ignored').checked = data['REQUESTED_LANGUAGE_IGNORED'] == 'true';

	$('searchStats.enable').checked = data['SEARCHSTATS_ENABLE'] == 'true';

	$('downloadservice.simple')        .checked = data['DOWNLOADSERVICE_SIMPLE'] == 'true';
	$('downloadservice.withdisclaimer').checked = data['DOWNLOADSERVICE_WITHDISCLAIMER'] == 'true';
	$('downloadservice.leave')         .checked = data['DOWNLOADSERVICE_LEAVE'] == 'true';

	$('selection.maxrecords')  .value   = data['SELECTION_MAXRECORDS'];

	$('threadedindexing.maxthreads')  .value   = data['THREADEDINDEXING_MAXTHREADS'];

	$('indexoptimizer.enable').checked = data['INDEXOPTIMIZER_ENABLE'] == 'true';
	$('indexoptimizer.at.hour').value = data['INDEXOPTIMIZER_AT_HOUR'];
	$('indexoptimizer.at.min').value  = data['INDEXOPTIMIZER_AT_MIN'];
	$('indexoptimizer.at.sec').value  = data['INDEXOPTIMIZER_AT_SEC'];
	$('indexoptimizer.interval.day').value  = data['INDEXOPTIMIZER_INTERVAL_DAY'];
	$('indexoptimizer.interval.hour').value = data['INDEXOPTIMIZER_INTERVAL_HOUR'];
	$('indexoptimizer.interval.min').value  = data['INDEXOPTIMIZER_INTERVAL_MIN'];
	
	$('clickablehyperlinks.enable').checked = data['CLICKABLE_HYPERLINKS'] == 'true';

	$('localrating.enable').checked = data['LOCAL_RATING'] == 'true';
	$('autofixing.enable').checked = data['AUTO_FIXING'] == 'true';

    $('inspire.enable').checked = data['INSPIRE'] == 'true';
    $('inspire.enableSearchPanel').checked = data['INSPIRE_SEARCH_PANEL'] == 'true';

    $('metadata.enableSimpleView').checked = data['METADATA_SIMPLE_VIEW'] == 'true';
    $('metadata.enableIsoView').checked = data['METADATA_ISO_VIEW'] == 'true';
    $('metadata.enableInspireView').checked = data['METADATA_INSPIRE_VIEW'] == 'true';
    $('metadata.enableXmlView').checked = data['METADATA_XML_VIEW'] == 'true';
    $('metadata.defaultView').value = data['METADATA_DEFAULT_VIEW'];
    
    $('metadata.usergrouponly').checked = data['METADATA_PRIVS_USERGROUPONLY'];
    
    $('harvester.enableEditing').checked = data['HARVESTER'] == 'true';

	$('proxy.use') .checked   = data['PROXY_USE'] == 'true';
	$('proxy.host').value     = data['PROXY_HOST'];
	$('proxy.port').value     = data['PROXY_PORT'];
	$('proxy.username').value = data['PROXY_USER'];
	$('proxy.password').value = data['PROXY_PASS'];
	
	$('feedback.email')    .value = data['FEEDBACK_EMAIL'];
	$('feedback.mail.host').value = data['FEEDBACK_MAIL_HOST'];
	$('feedback.mail.port').value = data['FEEDBACK_MAIL_PORT'];
	
	$('removedMd.dir').value = data['REMOVEDMD_DIR'];

	$('ldap.use')       .checked = data['LDAP_USE'] == 'true';
	$('ldap.host')        .value = data['LDAP_HOST'];
	$('ldap.port')        .value = data['LDAP_PORT'];
	$('ldap.defProfile')  .value = data['LDAP_DEF_PROFILE'];
    $('ldap.uidAttr')     .value = data['LDAP_ATTR_UID'];
	$('ldap.baseDN')      .value = data['LDAP_DN_BASE'];
	$('ldap.usersDN')     .value = data['LDAP_DN_USERS'];
	$('ldap.nameAttr')    .value = data['LDAP_ATTR_NAME'];
	$('ldap.profileAttr') .value = data['LDAP_ATTR_PROFILE'];
	$('ldap.groupAttr') .value = data['LDAP_ATTR_GROUP'];
    $('ldap.defGroup')  .value = data['LDAP_DEF_GROUP'];

	$('shib.use')           .checked = data['SHIB_USE'] == 'true';
	$('shib.path')            .value = data['SHIB_PATH'];
	$('shib.attrib.username') .value = data['SHIB_ATTRIB_USERNAME'];
	$('shib.attrib.surname')  .value = data['SHIB_ATTRIB_SURNAME'];
	$('shib.attrib.firstname').value = data['SHIB_ATTRIB_FIRSTNAME'];
	$('shib.attrib.profile')  .value = data['SHIB_ATTRIB_PROFILE'];
    $('shib.attrib.group')    .value = data['SHIB_ATTRIB_GROUP'];
    $('shib.defGroup')  .value = data['SHIB_DEF_GROUP'];

	$('geonetworkdb.use').checked = data['LDAP_USE'] != 'true';

	$('userSelfRegistration.enable').checked = data['USERSELFREGISTRATION_ENABLE'] == 'true' && data['LDAP_USE'] != 'true';

	this.z3950Shower.update();
	this.indexOptimizerShower.update();
	this.proxyShower.update();
	this.ldapShower.update();
	this.shibShower.update();
	this.geonetworkdbShower.update();
    this.inspireShower.update();

    if (!$('inspire.enable').checked) {
	    $('metadata.enableInspireView').checked = false;
		$('metadata.enableInspireView').disabled = true;
    }

    if (!$('metadata.enableSimpleView').checked) $("metadata.defaultView.Simple").hide();
    if (!$('metadata.enableIsoView').checked) $("metadata.defaultView.Iso").hide();
    if (!$('metadata.enableInspireView').checked) $("metadata.defaultView.Inspire").hide();
    if (!$('metadata.enableXmlView').checked) $("metadata.defaultView.Xml").hide();
}