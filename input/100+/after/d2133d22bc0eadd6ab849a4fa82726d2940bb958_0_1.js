function(i, value){
                var artilce_image_url = value.image_url;
                var image_tag = artilce_image_url != '' ? '<img src="'+artilce_image_url+'" width="64px"/>' : '<img src="/static/images/news2.png" width="64px"/>';

                target.append('<div id="tabs-news" class="ui-tabs-panel"><div class="article">'+
                image_tag +
                '<div class="article-content">'+
                '<span><a target="_blank" href="'+value.link+'">'+
                value.title+'</a></span><br/>'+value.content+'<br/>'+
                '<div class="article-footer">'+value.date+' | '+
                '<a target="_blank" href="'+value.link+'">'+value.source+'</a>'+
                '</div></div>'+
                '<div class="overlay">'+
                '<a class="goto" target="_blank" href="'+value.link+'">'+value.source+'</a>'+
                '<a class="related-button" target="_blank"'+
                'href="/related/'+value.hash_key+'/">View Related</a></div>'+
                '<br style="clear:both"/></div></div>');
                }