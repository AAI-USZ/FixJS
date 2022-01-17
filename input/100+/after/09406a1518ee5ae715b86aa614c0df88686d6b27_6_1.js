function () {
        var template,
            artist = this.model.get("artist"),
            song = this.model.get("song");

        if (artist && song) {

            template = _.template($("#now_playing_template").html(), {
                artistName:artist.artistName,
                songTitle:song.songTitle,
                songYear:song.releaseYear,
                album:song.albumName,
                cover:song.albumCover,
                twitterUrl:artist.artistTwitterURL ? artist.artistTwitterURL : "None",
                facebookUrl:artist.artistFacebookURL ? artist.artistFacebookURL : "None"
            });

            this.$el.html(template);

        } else {
            template = _.template($("#now_playing_template").html(), {
                artistName:"",
                songTitle:"",
                songYear:"",
                album:"",
                cover:"",
                twitterUrl:"None",
                facebookUrl:"None"
            });
            this.$el.html(template);
        }

        return this;
    }