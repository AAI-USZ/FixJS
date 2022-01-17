function WebTrends(){
	var that=this;
	// begin: user modifiable
	this.rate=5;
	this.dcsid="dcsj4a4uwuz5bdmdwicyom3wj_6s6e";
	this.domain="statse.webtrendslive.com";
	this.timezone=0;
	this.fpcdom=".start.mozilla.org";
	this.enabled=true;
	this.i18n=false;
	this.fpc="WT_FPC";
	this.paidsearchparams="gclid";
	this.splitvalue="";
	this.preserve=false;
	// end: user modifiable
	this.DCS={};
	this.WT={};
	this.DCSext={};
	this.images=[];
	this.index=0;
	this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
}