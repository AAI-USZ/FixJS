function WebTrends(options){
var that=this;
this.dcsid="dcsj4a4uwuz5bdmdwicyom3wj_6s6e";
this.rate=5;
this.fpcdom=".mozilla.org";
this.trackevents=false;

if(typeof(options)!="undefined")
{
    if(typeof(options.dcsid)!="undefined") this.dcsid=options.dcsid;
    if(typeof(options.rate)!="undefined")this.rate=options.rate;
    if(typeof(options.fpcdom)!="undefined")this.fpcdom=options.fpcdom;
    if(typeof(this.fpcdom)!="undefined"&&this.fpcdom.substring(0,1)!='.')this.fpcdom='.'+this.fpcdom;
    if(typeof(options.trackevents)!="undefined") this.trackevents=options.trackevents;
}

this.domain="statse.webtrendslive.com";
this.timezone=0;
this.onsitedoms="";
this.downloadtypes="xls,doc,pdf,txt,csv,zip,dmg,exe";
this.navigationtag="div,table";
this.enabled=true;
this.i18n=false;
this.fpc="WT_FPC";
this.paidsearchparams="gclid";
this.splitvalue="";
this.preserve=true;
this.DCSdir={};
this.DCS={};
this.WT={};
this.DCSext={};
this.images=[];
this.index=0;
this.exre=(function()
{
    return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");
})();
this.re=(function()
{
    return(window.RegExp?(that.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");
})();
}