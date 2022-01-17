function() {
		var s = '<xsltforms:dump xmlns:xsltforms="http://www.agencexml.com/xsltforms">';
		s += '<xsltforms:date>' + XsltForms_browser.i18n.format(new Date(), "yyyy-MM-ddThh:mm:ssz", true) + '</xsltforms:date>';
		s += '<xsltforms:location>' + XsltForms_browser.escape(window.location.href) + '</xsltforms:location>';
		s += '<xsltforms:appcodename>' + navigator.appCodeName + '</xsltforms:appcodename>';
		s += '<xsltforms:appname>' + navigator.appName + '</xsltforms:appname>';
		s += '<xsltforms:appversion>' + navigator.appVersion + '</xsltforms:appversion>';
		s += '<xsltforms:platform>' + navigator.platform + '</xsltforms:platform>';
		s += '<xsltforms:useragent>' + navigator.userAgent + '</xsltforms:useragent>';
		s += '<xsltforms:xsltengine>' + this.xsltEngine + '</xsltforms:xsltengine>';
		var xsltsrc = '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt">';
		xsltsrc += '	<xsl:output method="xml"/>';
		xsltsrc += '	<xsl:template match="/">';
		xsltsrc += '		<xsl:variable name="version">';
		xsltsrc += '			<xsl:if test="system-property(\'xsl:vendor\')=\'Microsoft\'">';
		xsltsrc += '				<xsl:value-of select="system-property(\'msxsl:version\')"/>';
		xsltsrc += '			</xsl:if>';
		xsltsrc += '		</xsl:variable>';
		xsltsrc += '		<properties><xsl:value-of select="concat(\'|\',system-property(\'xsl:vendor\'),\' \',system-property(\'xsl:vendor-url\'),\' \',$version,\'|\')"/></properties>';
		xsltsrc += '	</xsl:template>';
		xsltsrc += '</xsl:stylesheet>';
		var res = XsltForms_browser.transformText("<dummy/>", xsltsrc, true);
		var spres = res.split("|");
		s += '<xsltforms:xsltengine2>' + spres[1] + '</xsltforms:xsltengine2>';
		s += '<xsltforms:version>' + this.fileVersion + '</xsltforms:version>';
		s += '<xsltforms:instances>';
		var pos = 0;
		for (var m = 0, mlen = XsltForms_globals.models.length; m < mlen; m++) {
			if (XsltForms_globals.models[m].element.id !== XsltForms_browser.idPf + "model-config") {
				for (var id in XsltForms_globals.models[m].instances) {
					if (XsltForms_globals.models[m].instances.hasOwnProperty(id)) {
						var count = XsltForms_browser.selectNodesLength("descendant::node() | descendant::*/@*[not(starts-with(local-name(),'xsltforms_'))]", XsltForms_globals.models[m].instances[id].doc);
						s += '<xsltforms:instance id="' + id + '">' + count + '</xsltforms:instance>';
						pos++;
					}
				}
			}
		}
		s += '</xsltforms:instances>';
		s += '<xsltforms:controls>';
		s += '<xsltforms:control type="group">' + XsltForms_globals.counters.group + '</xsltforms:control>';
		s += '<xsltforms:control type="input">' + XsltForms_globals.counters.input + '</xsltforms:control>';
		s += '<xsltforms:control type="item">' + XsltForms_globals.counters.item + '</xsltforms:control>';
		s += '<xsltforms:control type="itemset">' + XsltForms_globals.counters.itemset + '</xsltforms:control>';
		s += '<xsltforms:control type="output">' + XsltForms_globals.counters.output + '</xsltforms:control>';
		s += '<xsltforms:control type="repeat">' + XsltForms_globals.counters.repeat + '</xsltforms:control>';
		s += '<xsltforms:control type="select">' + XsltForms_globals.counters.select + '</xsltforms:control>';
		s += '<xsltforms:control type="trigger">' + XsltForms_globals.counters.trigger + '</xsltforms:control>';
		s += '</xsltforms:controls>';
		var re = /<\w/g;
		var hc = 0;
		var bhtml = document.documentElement.innerHTML;
		while (re.exec(bhtml)) {
			hc++;
		}
		s += '<xsltforms:htmlelements>' + hc + '</xsltforms:htmlelements>';
		s += '<xsltforms:transformtime>' + this.transformtime + '</xsltforms:transformtime>';
		s += '<xsltforms:htmltime>' + this.htmltime + '</xsltforms:htmltime>';
		s += '<xsltforms:creatingtime>' + this.creatingtime + '</xsltforms:creatingtime>';
		s += '<xsltforms:inittime>' + this.inittime + '</xsltforms:inittime>';
		s += '<xsltforms:refreshcount>' + this.refreshcount + '</xsltforms:refreshcount>';
		s += '<xsltforms:refreshtime>' + this.refreshtime + '</xsltforms:refreshtime>';
		var exprtab = [];
		for (var expr in XsltForms_xpath.expressions) {
			if (XsltForms_xpath.expressions.hasOwnProperty(expr) && XsltForms_xpath.expressions[expr]) {
				exprtab[exprtab.length] = {expr: expr, evaltime: XsltForms_xpath.expressions[expr].evaltime};
			}
		}
		exprtab.sort(function(a,b) { return b.evaltime - a.evaltime; });
		var top = 0;
		s += '<xsltforms:xpaths>';
		if (exprtab.length > 0) {
			for (var i = 0; i < exprtab.length && i < 20; i++) {
				s += '<xsltforms:xpath expr="' + XsltForms_browser.escape(exprtab[i].expr) + '">' + exprtab[i].evaltime + '</xsltforms:xpath>';
				top += exprtab[i].evaltime;
			}
			if (exprtab.length > 20) {
				var others = 0;
				for (var j = 20; j < exprtab.length; j++) {
					others += exprtab[j].evaltime;
				}
				s += '<xsltforms:others count="' + (exprtab.length - 20) + '">' + others + '</xsltforms:others>';
				top += others;
			}
			s += '<xsltforms:total>' + top + '</xsltforms:total>';
		}
		s += '</xsltforms:xpaths>';
		s += '</xsltforms:dump>';
		return s;
	}