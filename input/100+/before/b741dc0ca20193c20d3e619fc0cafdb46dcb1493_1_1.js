function(){var a={getCookie:function(b){var f=null;if(document.cookie&&document.cookie!=""){var e=document.cookie.split(";");for(var d=0;d<e.length;d++){var c=jQuery.trim(e[d]);if(c.substring(0,b.length+1)==(b+"=")){f=decodeURIComponent(c.substring(b.length+1));break}}}return f},autoSlug:function(c,b){c.keyup(function(d){b.val(c.val().toLowerCase().replace(/[^_-a-zA-Z0-9\s]+/ig,"").replace(/\s+/g,"-"))})},insertAtCaret:function(h,i){var g=document.getElementById(h);var b=g.scrollTop;var d=0;var j=((g.selectionStart||g.selectionStart=="0")?"ff":(document.selection?"ie":false));if(j=="ie"){g.focus();var f=document.selection.createRange();f.moveStart("character",-g.value.length);d=f.text.length}else{if(j=="ff"){d=g.selectionStart}}var c=(g.value).substring(0,d);var e=(g.value).substring(d,g.value.length);g.value=c+i+e;d=d+i.length;if(j=="ie"){g.focus();var f=document.selection.createRange();f.moveStart("character",-g.value.length);f.moveStart("character",d);f.moveEnd("character",0);f.select()}else{if(j=="ff"){g.selectionStart=d;g.selectionEnd=d;g.focus()}}g.scrollTop=b}};return a}