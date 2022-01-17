function(url,proxy_url) {
               proxy_url = proxy_url || "http://"+ document.location.host + ":9292";
               return $.get(proxy_url, { url : url });
           }