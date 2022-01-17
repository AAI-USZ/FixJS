function(data){
                _this.comments.updateCommentsFor(stream_id);
                _this.sidebar.player.playStreamData(data);
                current_stream_id = stream_id;
            }