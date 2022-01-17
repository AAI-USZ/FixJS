function() {
        /*
		if(!PLEX.data_loaded) {
			$.get("plex-data/data.js", function(data){
				eval(data); // unpack
				PLEX.load_data(raw_plex_data);
				return PLEX.run();
			});
			return;
		}*/

        PLEX._servers_list = $("#plex_servers_list");
		PLEX._sections_list = $("#plex_section_list");
		PLEX._sorts_list = $("#plex_sort_list");
		PLEX._genre_list_section = $("#plex_genre_list_section").hide();
		PLEX._genre_list = $("#plex_genre_list");
		PLEX._director_list_section = $("#plex_director_list_section").hide();
		PLEX._director_list = $("#plex_director_list");
		PLEX._seen_list_section = $("#plex_seen_list_section");
		PLEX._seen_list = $("#plex_seen_list");
		PLEX._section_title = $("#section-header h2");
		PLEX._section_meta = $("#section-header p");
		PLEX._section_filter = $("#section-header input");
		PLEX._item_list_status = $("#item-list-status");
		PLEX._item_list = $("#item-list ul");
		PLEX._popup_overlay = $("#popup-overlay");
		PLEX._popup_container = $("#popup-container");

        PLEX.load_servers();
        return;
    }