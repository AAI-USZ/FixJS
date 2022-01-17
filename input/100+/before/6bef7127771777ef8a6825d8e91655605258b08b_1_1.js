function ConfigView(strLoader)
{
	//--- setup validators
	this.strLoader = strLoader;
	this.validator = new Validator(strLoader);

	this.validator.add(
	[
		{ id:'site.siteId',   type:'length',   minSize :1,  maxSize :200 },
		{ id:'site.name',     type:'length',   minSize :1,  maxSize :200 },
		{ id:'site.organ',    type:'length',   minSize :0,  maxSize :200 },
		
		{ id:'server.host',   type:'length',   minSize :1,  maxSize :200 },
		{ id:'server.host',   type:'hostname' },
		{ id:'server.port',   type:'integer',  minValue:80, maxValue:65535 },
		
		{ id:'intranet.network', type:'ipaddress' },
		{ id:'intranet.netmask', type:'ipaddress' },

		{ id:'selection.maxrecords',   type:'integer',  minValue:1000, maxValue:100000, empty:false },

		{ id:'threadedindexing.maxthreads',   type:'integer',  minValue:1, maxValue:10, empty:false },

		{ id:'indexoptimizer.at.hour',   type:'integer',  minValue:0, maxValue:23, empty:false }, 
		{ id:'indexoptimizer.at.min',   type:'integer',  minValue:0, maxValue:59, empty:false }, 
		{ id:'indexoptimizer.at.sec',   type:'integer',  minValue:0, maxValue:59, empty:false }, 
		{ id:'indexoptimizer.interval.day',   type:'integer',  minValue:0, maxValue:14, empty:false }, 
		{ id:'indexoptimizer.interval.hour',   type:'integer',  minValue:0, maxValue:65535, empty:false }, 
		{ id:'indexoptimizer.interval.min',   type:'integer',  minValue:0, maxValue:59, empty:false }, 

		{ id:'z3950.port',   type:'integer',  minValue:80, maxValue:65535, empty:true },

		{ id:'oai.mdmode',   type:'integer',  minValue:1, maxValue:2, empty:false },
		{ id:'oai.tokentimeout',   type:'integer',  minValue:60, maxValue:86400, empty:false },
		{ id:'oai.cachesize',   type:'integer',  minValue:10, maxValue:1000, empty:false },

		{ id:'feedback.email',     type:'length',   minSize :0,  maxSize :200 },		
		{ id:'feedback.mail.host', type:'length',   minSize :0,  maxSize :200 },
		{ id:'feedback.mail.host', type:'hostname' },
		{ id:'feedback.mail.port', type:'integer',  minValue:25, maxValue:65535, empty:true },
		
		{ id:'proxy.host',     type:'length',   minSize :0,  maxSize :200 },
		{ id:'proxy.host',     type:'hostname' },
		{ id:'proxy.port',     type:'integer',  minValue:21, maxValue:65535, empty:true },
		{ id:'proxy.username', type:'length',  minSize :0,  maxSize :200 },
		{ id:'proxy.password', type:'length',  minSize :0,  maxSize :200 },

		{ id:'removedMd.dir', type:'length', minSize :0,  maxSize :200 },
		
		{ id:'ldap.host',         type:'length',   minSize :0, maxSize :200 },
		{ id:'ldap.host',         type:'hostname' },
		{ id:'ldap.port',         type:'integer',  minValue:80, maxValue:65535, empty:true },		
		{ id:'ldap.baseDN',       type:'length',  minSize :1,  maxSize :200 },
		{ id:'ldap.usersDN',      type:'length',  minSize :1,  maxSize :200 },
		{ id:'ldap.nameAttr',     type:'length',  minSize :1,  maxSize :200 },
        { id:'ldap.uidAttr',      type:'length',  minSize :1,  maxSize :20 },

		{ id:'shib.path',              type:'length',   minSize :0, maxSize :256 },
		{ id:'shib.attrib.username',   type:'length',   minSize :0, maxSize :150 },
		{ id:'shib.attrib.surname',    type:'length',   minSize :0, maxSize :150 },
		{ id:'shib.attrib.firstname',  type:'length',   minSize :0, maxSize :150 },
		{ id:'shib.attrib.profile',    type:'length',   minSize :0, maxSize :150 }
	]);
	
	this.z3950Shower = new Shower('z3950.enable', 'z3950.subpanel');	

	var dsTargetIds = ['downloadservice_simple.subpanel', 'downloadservice_withdisclaimer.subpanel', 'downloadservice_leave.subpanel'];
	this.downloadservicesimpleShower  = new RadioShower('downloadservice.simple',     'downloadservice_simple.subpanel', dsTargetIds);
	this.downloadservicewithdisclaimerShower  = new RadioShower('downloadservice.withdisclaimer',     'downloadservice_withdisclaimer.subpanel', dsTargetIds);
	this.downloadserviceleaveShower  = new RadioShower('downloadservice.leave',     'downloadservice_leave.subpanel', dsTargetIds);

	this.indexOptimizerShower = new Shower('indexoptimizer.enable', 'indexoptimizer.subpanel');
	this.proxyShower = new Shower('proxy.use',    'proxy.subpanel');

	var targetIds = ['ldap.subpanel', 'geonetworkdb.subpanel'];
	this.ldapShower  = new RadioShower('ldap.use',     'ldap.subpanel', targetIds);
	this.geonetworkdbShower  = new RadioShower('geonetworkdb.use',     'geonetworkdb.subpanel', targetIds);

	this.shibShower  = new Shower('shib.use',     'shib.subpanel');
    this.inspireShower  = new Shower('inspire.enable',     'inspire.subpanel');

    Event.observe($('inspire.enable'), 'click', function() {
        $('inspire.enableSearchPanel').checked = $('inspire.enable').checked;

        if (!$('inspire.enable').checked) {
            $('metadata.enableInspireView').checked = false;
        }

        $('metadata.enableInspireView').disabled = !$('inspire.enable').checked;

        if ($('metadata.enableInspireView').disabled) {
            $("metadata.defaultView.Inspire").hide();
            if ($("metadata.defaultView").value == $("metadata.defaultView.Inspire").value) {
        		$("metadata.defaultView").value = ($('metadata.enableSimpleView').checked)?
                                                        $("metadata.defaultView.Simple").value:$("metadata.defaultView.Advanced").value;
            }

        } else {
            $("metadata.defaultView.Inspire").show();
        }
    });

    Event.observe($('server.protocol'), 'change', function() {
        if ($('server.protocol').value == 'https') {
            $('server.port').value = '443';
        } else {
            $('server.port').value = '8080';
        }

    });

    Event.observe($('metadata.enableSimpleView'), 'click', function() {
        if (!$('metadata.enableSimpleView').checked) {
            $("metadata.defaultView.Simple").hide();
            if ($("metadata.defaultView").value == $("metadata.defaultView.Simple").value) {
        		$("metadata.defaultView").value = ($('metadata.enableSimpleView').checked)?
                                                        $("metadata.defaultView.Simple").value:$("metadata.defaultView.Advanced").value;
            }

        } else {
            $("metadata.defaultView.Simple").show();
        }

    });

    Event.observe($('metadata.enableIsoView'), 'click', function() {
        if (!$('metadata.enableIsoView').checked) {
            $("metadata.defaultView.Iso").hide();
            if ($("metadata.defaultView").value == $("metadata.defaultView.Iso").value) {
        		$("metadata.defaultView").value = ($('metadata.enableSimpleView').checked)?
                                                        $("metadata.defaultView.Simple").value:$("metadata.defaultView.Advanced").value;
            }

        } else {
            $("metadata.defaultView.Iso").show();
        }
    });

    Event.observe($('metadata.enableInspireView'), 'click', function() {
        if (!$('metadata.enableInspireView').checked) {
            $("metadata.defaultView.Inspire").hide();
            if ($("metadata.defaultView").value == $("metadata.defaultView.Inspire").value) {
        		$("metadata.defaultView").value = ($('metadata.enableSimpleView').checked)?
                                                        $("metadata.defaultView.Simple").value:$("metadata.defaultView.Advanced").value;
            }

        } else {
            $("metadata.defaultView.Inspire").show();
        }
    });

    Event.observe($('metadata.enableXmlView'), 'click', function() {
        if (!$('metadata.enableXmlView').checked) {
            $("metadata.defaultView.Xml").hide();
            if ($("metadata.defaultView").value == $("metadata.defaultView.Xml").value) {
        		$("metadata.defaultView").value = ($('metadata.enableSimpleView').checked)?
                                                        $("metadata.defaultView.Simple").value:$("metadata.defaultView.Advanced").value;
            }

        } else {
            $("metadata.defaultView.Xml").show();
        }

    });
}