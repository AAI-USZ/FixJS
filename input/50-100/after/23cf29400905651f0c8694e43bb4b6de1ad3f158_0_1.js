function()
			{
				
				var html =

					"<div class='player-citation-bubble clearfix hide'>"+
						"<div class='player-citation-content'>"+
							"<h3><%= attr.title %></h3>"+
							"<div class='content'><span class='citation-subhead'>DESCRIPTION:</span> <%= attr.description %></div>"+
							"<div class='creator'><span class='citation-subhead'>CREATED BY:</span> <%= attr.media_creator_realname %></div>"+
							"<div class='date-created'><span class='citation-subhead'>CREATED ON:</span> <%= attr.date_created %></div>";

						if( !_.isNull( this.model.get('attr').media_geo_longitude ) )
						{
							html += "<div class='location-created'><span class='citation-subhead'>LOCATION:</span> <%= attr.media_geo_longitude %>, <%= attr.media_geo_latitude %></div>";
						}
						html +=
							"<div class='trackback'><span class='citation-subhead'>click below to view original</span></div>"+
						"</div>"+
						"<div class='player-citation-thumb'><img src='<%= attr.thumbnail_url %>' height='100px' width='100px'/></div>"+
					"</div>"+
					"<a href='<%= attr.attribution_uri %>' class='citation-icon' target='blank'><i class='zitem-<%= attr.archive.toLowerCase() %> zitem-30 <%= error %>'></i></a>";
					
				return html;
			}