function createRedirDiv(redirect){
    var ddg_result = document.getElementById("ddg_zeroclick");
    if (ddg_result !== null){
      ddg_result.className = 'ddg_answer';
      ddg_result.innerHTML = 'Wait for redirect or '  
                           + '<a id="redirect" href="' + redirect + '">Click here</a>'
                           + cross_answer;
    }
}