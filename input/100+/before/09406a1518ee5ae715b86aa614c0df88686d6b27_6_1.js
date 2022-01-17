function() {
        var template,
            artist = this.model.get("artist"),
            song = this.model.get("song");

        if( artist && song ) {

            template = _.template( $("#now_playing_template").html(), {
                artistName: artist.artistName,
                songTitle:  song.songTitle,
                songYear:   song.releaseYear,
                album:      song.albumName,
 				twitterUrl: artist.artistTwitterURL,
				facebookUrl: artist.artistFacebookURL } );

            this.$el.html( template );

        } else {
            template = _.template( $("#now_playing_template").html(), {
                artistName: "",
                songTitle: "",
                songYear: "",
                album: "",
 				twitterUrl: "None",
				facebookUrl: "None" } );
            this.$el.html( template );
        }

        return this;
    }