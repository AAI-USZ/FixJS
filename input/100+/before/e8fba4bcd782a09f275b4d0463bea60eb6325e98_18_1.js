fstepMismatch:"Invalid input.",tooLong:"Please enter at most {%maxlength} character(s). You entered {%valueLen}.",patternMismatch:"Invalid input. {%title}",valueMissing:{defaultMessage:"Please fill out this field.",checkbox:"Please check this box if you want to proceed."}};["select","radio"].forEach(function(a){g.en.valueMissing[a]="Please select an option."});["date","time","datetime-local"].forEach(function(a){g.en.rangeUnderflow[a]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(a){g.en.rangeOverflow[a]=
"Value must be at or before {%max}."});g["en-US"]=g["en-US"]||g.en;g[""]=g[""]||g["en-US"];g.de=g.de||{typeMismatch:{email:"{%value} ist keine zul\u00e4ssige E-Mail-Adresse",url:"{%value} ist keine zul\u00e4ssige Webadresse",number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},
rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat f\u00fcr dieses Eingabefeld ein falsches Format! {%title}",valueMissing:{defaultMessage:"Bitte geben Sie einen Wert ein",
checkbox:"Bitte aktivieren Sie das K\u00e4stchen"}};["select","radio"].forEach(function(a){g.de.valueMissing[a]="Bitte w\u00e4hlen Sie eine Option aus"});["date","time","datetime-local"].forEach(function(a){g.de.rangeUnderflow[a]="{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."});["date","time","datetime-local"].forEach(function(a){g.de.rangeOverflow[a]="{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});var p=
g[""];c.createValidationMessage=function(c,g){var h=p[g];h&&"string"!==typeof h&&(h=h[a.prop(c,"type")]||h[(c.nodeName||"").toLowerCase()]||h.defaultMessage);h&&"value,min,max,title,maxlength,label".split(",").forEach(function(g){if(-1!==h.indexOf("{%"+g)){var i=("label"==g?a.trim(a('label[for="'+c.id+'"]',c.form).text()).replace(/\*$|:$/,""):a.attr(c,g))||"";h=h.replace("{%"+g+"}",i);"value"==g&&(h=h.replace("{%valueLen}",i.length))}});return h||""};(c.bugs.validationMessage||!Modernizr.formvalidation||
c.bugs.bustedValidity)&&h.push("validationMessage");c.activeLang({langObj:g,module:"form-core",callback:function(a){p=a}});Modernizr.input.list&&!(a("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var c=this.options||[];if(!c.length){var g=a("select",this);if(g[0]&&g[0].options&&g[0].options.length)c=g[0].options}return c}}});h.forEach(function(g){c.defineNodeNamesProperty(["fieldset",
"output","button"],g,{prop:{value:"",writeable:!1}});["input","select","textarea"].forEach(function(h){var i=c.defineNodeNameProperty(h,g,{prop:{get:function(){var g=this,h="";if(!a.prop(g,"willValidate"))return h;var b=a.prop(g,"validity")||{valid:1};if(b.valid||(h=c.getContentValidationMessage(g,b)))return h;if(b.customError&&g.nodeName&&(h=Modernizr.formvalidation&&!c.bugs.bustedValidity&&i.prop._supget?i.prop._supget.call(g):c.data(g,"customvalidationMessage")))return h;a.each(b,function(a,b){if("valid"!=
a&&b&&(h=c.createValidationMessage(g,a)))return!1});return h||""},writeable:!1}})})})});