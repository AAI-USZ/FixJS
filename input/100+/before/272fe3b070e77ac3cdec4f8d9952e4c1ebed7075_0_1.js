function (route, successHandler){
    var url = '';
    ('string' == typeof route)? url = route : url = Routing.generate(route.name, route.parameters);
    $.ajax({
        type: 'POST',
        url: url,
        cache: false,
        success: function(data, textStatus, jqXHR){successHandler(data, textStatus, jqXHR)},
        error: function(xhr){
            (xhr.status == 403) ? utils.ajaxAuthenticationErrorHandler(function(){
                (undefined != typeof successHandler)? sendRequest(route, successHandler) : window.location.reload();
             }): alert('error');
        }
    });
}