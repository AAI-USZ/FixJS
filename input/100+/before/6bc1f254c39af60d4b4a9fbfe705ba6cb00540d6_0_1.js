function()
{
	var data =
	{
		SITE_NAME   : $('site.name')  .value,	
		SITE_ORGAN  : $('site.organ') .value,		
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
	
		SEARCHSTATS_ENABLE : $('searchStats.enable').checked,
	
		DOWNLOADSERVICE_SIMPLE : $('downloadservice.simple').checked,
		DOWNLOADSERVICE_WITHDISCLAIMER : $('downloadservice.withdisclaimer').checked,
		DOWNLOADSERVICE_LEAVE : $('downloadservice.leave').checked,

		SELECTION_MAXRECORDS   : $('selection.maxrecords')  .value,

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
		LDAP_ANON_BIND     : $F('ldap.anonBind').checked,
		LDAP_DN_BIND       : $F('ldap.bindDN'),
		LDAP_PW_BIND       : $F('ldap.bindPW'),
		LDAP_ATTR_NAME     : $F('ldap.nameAttr'),
		LDAP_ATTR_PROFILE  : $F('ldap.profileAttr'),
		
		SHIB_USE              : $('shib.use').checked,
		SHIB_PATH             : $('shib.path').value,
		SHIB_ATTRIB_USERNAME  : $('shib.attrib.username').value,
		SHIB_ATTRIB_SURNAME   : $('shib.attrib.surname').value,
		SHIB_ATTRIB_FIRSTNAME : $('shib.attrib.firstname').value,
		SHIB_ATTRIB_PROFILE   : $('shib.attrib.profile').value,

		USERSELFREGISTRATION_ENABLE : $('userSelfRegistration.enable').checked && $('geonetworkdb.use').checked

	}
	
	return data;
}