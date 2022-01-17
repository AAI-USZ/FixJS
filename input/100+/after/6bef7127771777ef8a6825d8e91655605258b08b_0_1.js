function(node)
{
	if (node.nodeName == 'error')
		ker.showError(this.strLoader.getText('cannotGet'), node);
	else
	{
		var data =
		{
			SITE_ID           : xml.evalXPath(node, 'site/siteId'),
			SITE_NAME         : xml.evalXPath(node, 'site/name'),
			SITE_ORGAN        : xml.evalXPath(node, 'site/organization'),
            SERVER_PROTOCOL   : xml.evalXPath(node, 'server/protocol'),
			SERVER_HOST       : xml.evalXPath(node, 'server/host'),
			SERVER_PORT       : xml.evalXPath(node, 'server/port'),
			INTRANET_NETWORK  : xml.evalXPath(node, 'intranet/network'),
			INTRANET_NETMASK  : xml.evalXPath(node, 'intranet/netmask'),

			SELECTION_MAXRECORDS : xml.evalXPath(node, 'selectionmanager/maxrecords'),

			THREADEDINDEXING_MAXTHREADS : xml.evalXPath(node, 'threadedindexing/maxthreads'),

			INDEXOPTIMIZER_ENABLE	  : xml.evalXPath(node, 'indexoptimizer/enable'),
			INDEXOPTIMIZER_AT_HOUR  : xml.evalXPath(node, 'indexoptimizer/at/hour'),
			INDEXOPTIMIZER_AT_MIN   : xml.evalXPath(node, 'indexoptimizer/at/min'),
			INDEXOPTIMIZER_AT_SEC   : xml.evalXPath(node, 'indexoptimizer/at/sec'),
			INDEXOPTIMIZER_INTERVAL_DAY  : xml.evalXPath(node, 'indexoptimizer/interval/day'),
			INDEXOPTIMIZER_INTERVAL_HOUR : xml.evalXPath(node, 'indexoptimizer/interval/hour'),
			INDEXOPTIMIZER_INTERVAL_MIN  : xml.evalXPath(node, 'indexoptimizer/interval/min'),

			Z3950_ENABLE      : xml.evalXPath(node, 'z3950/enable'),
			Z3950_PORT        : xml.evalXPath(node, 'z3950/port'),

			OAI_MDMODE        : xml.evalXPath(node, 'oai/mdmode'),
			OAI_CACHESIZE     : xml.evalXPath(node, 'oai/cachesize'),
			OAI_TOKENTIMEOUT  : xml.evalXPath(node, 'oai/tokentimeout'),

			XLINKRESOLVER_ENABLE      : xml.evalXPath(node, 'xlinkResolver/enable'),

			SEARCHSTATS_ENABLE        : xml.evalXPath(node, 'searchStats/enable'),

            AUTODETECT_ENABLE : xml.evalXPath(node, 'autodetect/enable'),
            REQUESTED_LANGUAGE_ONLY : xml.evalXPath(node, 'requestedLanguage/only'),
            REQUESTED_LANGUAGE_SORTED : xml.evalXPath(node, 'requestedLanguage/sorted'),
            REQUESTED_LANGUAGE_IGNORED : xml.evalXPath(node, 'requestedLanguage/ignored'),

			DOWNLOADSERVICE_LEAVE         : xml.evalXPath(node, 'downloadservice/leave'),
			DOWNLOADSERVICE_SIMPLE         : xml.evalXPath(node, 'downloadservice/simple'),
			DOWNLOADSERVICE_WITHDISCLAIMER : xml.evalXPath(node, 'downloadservice/withdisclaimer'),

			
            CLICKABLE_HYPERLINKS         : xml.evalXPath(node, 'clickablehyperlinks/enable'),

            INSPIRE           : xml.evalXPath(node, 'inspire/enable'),
            INSPIRE_SEARCH_PANEL           : xml.evalXPath(node, 'inspire/enableSearchPanel'),

            METADATA_SIMPLE_VIEW             : xml.evalXPath(node, 'metadata/enableSimpleView'),
            METADATA_ISO_VIEW                : xml.evalXPath(node, 'metadata/enableIsoView'),
            METADATA_INSPIRE_VIEW            : xml.evalXPath(node, 'metadata/enableInspireView'),
            METADATA_XML_VIEW                : xml.evalXPath(node, 'metadata/enableXmlView'),
            METADATA_DEFAULT_VIEW            : xml.evalXPath(node, 'metadata/defaultView'),

            METADATA_PRIVS_USERGROUPONLY     : xml.evalXPath(node, 'metadataprivs/usergrouponly'),
            
            HARVESTER           : xml.evalXPath(node, 'harvester/enableEditing'),
			LOCAL_RATING      : xml.evalXPath(node, 'localrating/enable'),			
            AUTO_FIXING       : xml.evalXPath(node, 'autofixing/enable'),
			PROXY_USE         : xml.evalXPath(node, 'proxy/use'),
			PROXY_HOST        : xml.evalXPath(node, 'proxy/host'),
			PROXY_PORT        : xml.evalXPath(node, 'proxy/port'),
			PROXY_USER        : xml.evalXPath(node, 'proxy/username'),
			PROXY_PASS        : xml.evalXPath(node, 'proxy/password'),
			FEEDBACK_EMAIL    : xml.evalXPath(node, 'feedback/email'),
			FEEDBACK_MAIL_HOST: xml.evalXPath(node, 'feedback/mailServer/host'),
			FEEDBACK_MAIL_PORT: xml.evalXPath(node, 'feedback/mailServer/port'),
			REMOVEDMD_DIR     : xml.evalXPath(node, 'removedMetadata/dir'),

			LDAP_USE          : xml.evalXPath(node, 'ldap/use'),
			LDAP_HOST         : xml.evalXPath(node, 'ldap/host'),
			LDAP_PORT         : xml.evalXPath(node, 'ldap/port'),
			LDAP_DEF_PROFILE  : xml.evalXPath(node, 'ldap/defaultProfile'),
            LDAP_ATTR_UID     : xml.evalXPath(node, 'ldap/uidAttr'),
			LDAP_DN_BASE      : xml.evalXPath(node, 'ldap/distinguishedNames/base'),
			LDAP_DN_USERS     : xml.evalXPath(node, 'ldap/distinguishedNames/users'),
			LDAP_SUBTREE      : xml.evalXPath(node, 'ldap/distinguishedNames/subtree'),
			LDAP_ANON_BIND    : xml.evalXPath(node, 'ldap/anonBind'),
			LDAP_DN_BIND      : xml.evalXPath(node, 'ldap/bind/bindDn'),
			LDAP_PW_BIND      : xml.evalXPath(node, 'ldap/bind/bindPw'),
			LDAP_ATTR_NAME    : xml.evalXPath(node, 'ldap/userAttribs/name'),
			LDAP_ATTR_PROFILE : xml.evalXPath(node, 'ldap/userAttribs/profile'),
            LDAP_ATTR_GROUP   : xml.evalXPath(node, 'ldap/userAttribs/group'),
            LDAP_DEF_GROUP    : xml.evalXPath(node, 'ldap/defaultGroup'),

			SHIB_USE              : xml.evalXPath(node, 'shib/use'),
			SHIB_PATH             : xml.evalXPath(node, 'shib/path'),
			SHIB_ATTRIB_USERNAME  : xml.evalXPath(node, 'shib/attrib/username'),
			SHIB_ATTRIB_SURNAME   : xml.evalXPath(node, 'shib/attrib/surname'),
			SHIB_ATTRIB_FIRSTNAME : xml.evalXPath(node, 'shib/attrib/firstname'),
			SHIB_ATTRIB_PROFILE   : xml.evalXPath(node, 'shib/attrib/profile'),
            SHIB_ATTRIB_GROUP     : xml.evalXPath(node, 'shib/attrib/group'),
            SHIB_DEF_GROUP        : xml.evalXPath(node, 'shib/defaultGroup'),

			USERSELFREGISTRATION_ENABLE : xml.evalXPath(node, 'userSelfRegistration/enable')
		}
		
		this.getConfigCB(data);
	}
}