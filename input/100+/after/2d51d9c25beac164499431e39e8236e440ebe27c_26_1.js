fa.attr(b.target,"novalidate")&&(j.stopImmediatePropagation(),p&&j.preventDefault());b.target&&a(b.target).unbind("submit.preventInvalidSubmit")}),c.moveToFirstEvent(b.target,"submit")),f=!1,!g.opera))c.fromSubmit=!0,a(b.target).checkValidity(),c.fromSubmit=!1},!0);e=function(b){null!=a.attr(b.target,"formnovalidate")&&(n&&clearTimeout(n),o=!0,n=setTimeout(function(){o=!1},20))};g.addEventListener("click",e,!0);g.addEventListener("touchstart",e,!0);g.addEventListener("touchend",e,!0)}a(document).bind("firstinvalidsystem",