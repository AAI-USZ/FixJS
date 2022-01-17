function(e)
{
    if (e.onclick)
        var gCap = e.onclick.toString();
    else if (e.onmousedown)
        var gCap = e.onmousedown.toString();
    var gStart = gCap.substring(gCap.indexOf("dcsSetVar(")+10,gCap.length)||gCap.substring(gCap.indexOf("_tag.dcsSetVar(")+16,gCap.length);
    var gEnd = gStart.substring(0,gStart.indexOf(");")).replace(/\s"/gi,"").replace(/"/gi,"");
    var gSplit = gEnd.split(",");
    if (gSplit.length!=-1)
    {
        for (var i=0;i<gSplit.length;i+=2)
        {
            if (gSplit[i].indexOf('WT.')==0)
            {
                if (this.dcsSetVarValidate(gSplit[i]))
                {
                    this.WT["setvar_"+gSplit[i].substring(3)]=gSplit[i+1];
                }
                else
                {
                    this.WT[gSplit[i].substring(3)]=gSplit[i+1];
                }
            }
            else if (gSplit[i].indexOf('DCS.')==0)
            {
                if (this.dcsSetVarValidate(gSplit[i]))
                {
                    this.DCS["setvar_"+gSplit[i].substring(4)]=gSplit[i+1];
                }
                else
                {
                    this.DCS[gSplit[i].substring(4)]=gSplit[i+1];
                }

            }
            else if (gSplit[i].indexOf('DCSext.')==0)
            {
                if (this.dcsSetVarValidate(gSplit[i]))
                {
                    this.DCSext["setvar_"+gSplit[i].substring(7)]=gSplit[i+1];
                }
                else
                {
                    this.DCSext[gSplit[i].substring(7)]=gSplit[i+1];
                }
            }
            else if (gSplit[i].indexOf('DCSdir.')==0)
            {
                if (this.dcsSetVarValidate(gSplit[i]))
                {
                    this.DCSdir["setvar_"+gSplit[i].substring(7)]=gSplit[i+1];
                }
                else
                {
                    this.DCSdir[gSplit[i].substring(7)]=gSplit[i+1];
                }
            }
        }
    }
}