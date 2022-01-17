function make_doclist(dt,dn){if(!locals[dt]){return[];}
var dl=[];dl[0]=locals[dt][dn];for(var ndt in locals){if(locals[ndt]){for(var ndn in locals[ndt]){var doc=locals[ndt][ndn];if(doc&&doc.parenttype==dt&&doc.parent==dn){dl.push(doc)}}}}
return dl;}