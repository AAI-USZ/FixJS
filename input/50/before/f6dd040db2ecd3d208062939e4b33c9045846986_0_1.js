function(url,proxy_url) {
               //proxy_url = proxy_url || "http://"+ document.location.host + ":9292";
               proxy_url = proxy_url || "http://localhost:9292"; // DEBUG: Remove me
               return $.get(proxy_url, { url : url });
           }