function(index,client,displayType,width,params,colors,maxproducts,style)
            {
                // the url of the script where we send the asynchronous call
				 var url = "http://odst.co.uk/api/p20/p20.php?user=m&pwd=test&params[feed_id]=" + client + "&" + params + "&" + colors + "&type=" + displayType + "&width=" + width  + "&max=" + maxproducts + "&style=" + style + "&callback=ODST_P20.parseRequest&index=" + index + "&rand=23ss4322";
				// create a new script element
                var script = document.createElement('script');
                // set the src attribute to that url
                script.setAttribute('src', url);
                // insert the script in out page
                document.getElementsByTagName('head')[0].appendChild(script);
				
            }