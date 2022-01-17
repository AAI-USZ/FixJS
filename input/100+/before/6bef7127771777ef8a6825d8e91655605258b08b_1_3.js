function()
{
	var data =
	{
		SITE_ID   : $('site.siteId')  .value,
		SITE_NAME   : $('site.name')  .value,	
		SITE_ORGAN  : $('site.organ') .value,
        SERVER_PROTOCOL : $('server.protocol').value,
		SERVER_HOST : $('server.host').value,
		SERVER_PORT : $('server.port').value,
		
		INTRANET_NETWORK : $('intranet.network').value,
		INTRANET_NETMASK : $('intranet.netmask').value,
	
		Z3950_ENABLE : $('z3950.enable').checked,
		Z3950_PORT   : $('z3950.port')  .value,

		OAI_MDMODE				: $('oai.mdmode').value,
		OAI_TOKENTIMEOUT	: $('oai.tokentimeout')  .value,
		OAI_CACHESIZE			: $('oai.cachesize')  .value,

		XLINKRESOLVER_ENABLE : $('xlinkResolver.enable').checked,

        AUTODETECT_ENABLE : $('autodetect.enable').checked,
        REQUESTED_LANGUAGE_ONLY: $('requestedLanguage.only').checked,
        REQUESTED_LANGUAGE_SORTED : $('requestedLanguage.sorted').checked,
        REQUESTED_LANGUAGE_IGNORED : $('requestedLanguage.ignored').checked,

		SEARCHSTATS_ENABLE : $('searchStats.enable').checked,
	
		DOWNLOADSERVICE_SIMPLE : $('downloadservice.simple').checked,
		DOWNLOADSERVICE_WITHDISCLAIMER : $('downloadservice.withdisclaimer').checked,
		DOWNLOADSERVICE_LEAVE : $('downloadservice.leave').checked,

		SELECTION_MAXRECORDS   : $('selection.maxrecords')  .value,

		THREADEDINDEXING_MAXTHREADS   : $('threadedindexing.maxthreads')  .value,

		INDEXOPTIMIZER_ENABLE: $('indexoptimizer.enable')  .checked,
		INDEXOPTIMIZER_AT_HOUR: $('indexoptimizer.at.hour').value,
		INDEXOPTIMIZER_AT_MIN:  $('indexoptimizer.at.min') .value,
		INDEXOPTIMIZER_AT_SEC:  $('indexoptimizer.at.sec') .value,
		INDEXOPTIMIZER_INTERVAL_DAY:  $('indexoptimizer.interval.day') .value,
		INDEXOPTIMIZER_INTERVAL_HOUR: $('indexoptimizer.interval.hour').value,
		INDEXOPTIMIZER_INTERVAL_MIN:  $('indexoptimizer.interval.min') .value,

		CLICKABLE_HYPERLINKS : $('clickablehyperlinks.enable').checked,
		
		LOCAL_RATING : $('localrating.enable').checked,
		AUTO_FIXING : $('autofixing.enable').checked,

        INSPIRE : $('inspire.enable').checked,
        INSPIRE_SEARCH_PANEL : $('inspire.enableSearchPanel').checked && $('inspire.enable').checked,

        METADATA_SIMPLE_VIEW : $('metadata.enableSimpleView').checked,
        METADATA_ISO_VIEW : $('metadata.enableIsoView').checked,
        METADATA_INSPIRE_VIEW : $('metadata.enableInspireView').checked,
        METADATA_XML_VIEW : $('metadata.enableXmlView').checked,
        METADATA_DEFAULT_VIEW: $('metadata.defaultView').value,

        METADATA_PRIVS_USERGROUPONLY : $('metadata.usergrouponly').checked,
        
        HARVESTER : $('harvester.enableEditing').checked,

		PROXY_USE  : $('proxy.use') .checked,
		PROXY_HOST : $('proxy.host').value,
		PROXY_PORT : $('proxy.port').value,
		PROXY_USER : $('proxy.username').value,
		PROXY_PASS : $('proxy.password').value,
		
		FEEDBACK_EMAIL     : $('feedback.email')    .value,
		FEEDBACK_MAIL_HOST : $('feedback.mail.host').value,
		FEEDBACK_MAIL_PORT : $('feedback.mail.port').value,		

		REMOVEDMD_DIR : $('removedMd.dir').value,
		
		LDAP_USE           : $('ldap.use').checked,
		LDAP_HOST          : $F('ldap.host'),
		LDAP_PORT          : $F('ldap.port'),
		LDAP_DEF_PROFILE   : $F('ldap.defProfile'),
        LDAP_ATTR_UID      : $F('ldap.uidAttr'),                
		LDAP_DN_BASE       : $F('ldap.baseDN'),
		LDAP_DN_USERS      : $F('ldap.usersDN'),
		LDAP_ATTR_NAME     : $F('ldap.nameAttr'),
		LDAP_ATTR_PROFILE  : $F('ldap.profileAttr'),
        LDAP_ATTR_GROUP    : $F('ldap.groupAttr'),
        LDAP_DEF_GROUP    : $F('ldap.defGroup'),

		SHIB_USE              : $('shib.use').checked,
		SHIB_PATH             : $('shib.path').value,
		SHIB_ATTRIB_USERNAME  : $('shib.attrib.username').value,
		SHIB_ATTRIB_SURNAME   : $('shib.attrib.surname').value,
		SHIB_ATTRIB_FIRSTNAME : $('shib.attrib.firstname').value,
		SHIB_ATTRIB_PROFILE   : $('shib.attrib.profile').value,
        SHIB_ATTRIB_GROUP     : $('shib.attrib.group').value,
        SHIB_DEF_GROUP    : $F('shib.defGroup'),

		USERSELFREGISTRATION_ENABLE : $('userSelfRegistration.enable').checked && $('geonetworkdb.use').checked

	}
	
	return data;
}