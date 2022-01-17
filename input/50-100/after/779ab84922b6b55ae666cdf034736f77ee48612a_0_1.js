function createResultDiv()
{  
    var result = document.getElementById("results");
    var ddg_result = document.getElementById("ddg_zeroclick");
    showZeroClick();
    if (ddg_result === null){ 
        var out = '<img src="css/imgs/assets/results_top_new.png" id="rounded-top" />'
                + '<div id="res"><div id="ddg_zeroclick"></div></div>'
                + '<img src="css/imgs/assets/results_bot_new.png" id="rounded-bot" />';

        /*var out = '<div style="background-image: url("css/imgs/assets/no-shadow/top_test_no_shadow.png");" id="rounded-top" />'
                + '<div id="res"><div id="ddg_zeroclick"></div></div>'
                + '<img src="css/imgs/assets/results_bot.png" id="rounded-bot" />';*/

        /*var out = '<g:background src="css/imgs/assets/no-shadow/top_test_no_shadow.png" id="roundedTop">'
                +   '<div></div>'
                + '</g:background>'
                + '<div id="res"><div id="ddg_zeroclick"></div></div>'
                + '<g:background src="css/imgs/assets/no-shadow/bot_test_no_shadow.png" id="roundedBot">'
                +   '<div></div>'
                + '</g:background>';*/

        result.innerHTML = out;
        ddg_result = document.getElementById("ddg_zeroclick");
    }  
  
    return ddg_result;
}