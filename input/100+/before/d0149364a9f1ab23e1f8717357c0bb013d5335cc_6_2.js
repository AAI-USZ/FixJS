function(event) {
      var modelId = $(event.currentTarget).attr("data-id"),
        targetModel = this.collection.get(modelId),
        likedSong, lastfmAttributes;

      if (_.isUndefined(targetModel)) return;

      likedSong = targetModel.likedSong || targetModel.toSong();
      likedSong.like();
      likedSong.setLastFmAttributes(targetModel.lastFmMeta);

      if (likedSong.isNew()) {
        likedSong.save();
        targetModel.likedSong = likedSong;
      } else {
        likedSong.save();
      }

      if (!_.isEmpty(likedSong.get("trackDownloadUrl"))) {
        this.vent.trigger("notification:info", "You can find the download link in the song info popover in your liked song collection.",
          "This song has a free download!");
      }

      this.vent.trigger("analytics:trackevent", "NowPlaying", "Like", targetModel.toDebugString(), likedSong.get("likeCount"));
      this.vent.trigger("nowplaying:like", targetModel);
    }