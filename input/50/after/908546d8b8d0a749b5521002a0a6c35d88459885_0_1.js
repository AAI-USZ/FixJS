function(data){
                _this.sidebar.player.playStreamData(data);
                _this.comments.updateCommentsFor(stream_id);
                current_stream_id = stream_id;
            }