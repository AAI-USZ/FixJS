function(cval,crumb,sep){var aCookie=cval.split(sep||":");for(var i=0;i<aCookie.length;i++){var aCrumb=aCookie[i].split("=");if(crumb==aCrumb[0]){return aCrumb[1];}}
return null;}