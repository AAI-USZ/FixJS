function(a){g&&(i=!0,a.stopImmediatePropagation())}).datepicker(a.extend({onClose:function(){i&&c.not(":focus")?(h(),c.trigger("focusout"),c.triggerHandler("blur")):h()}},o,j.datepicker,b.data("datepicker"))).bind("change",e).data("datepicker");m.dpDiv.addClass("input-date-datepicker-control");d&&f.triggerDomUpdate(d[0]);["disabled","min","max","value","step"].forEach(function(a){var c=b.prop(a);""!==c&&("disabled"!=a||!c)&&b.prop(a,c)});return m};i.date=function(b){