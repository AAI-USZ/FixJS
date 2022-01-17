function(str) {
            //chat message
            str = str.stripColors;
            var parts = str.match(/^([0-9\-: ]+) \[INFO\] <([^>]+)> (.*)$/);

            if(parts)  {
                //0 = entire msg,
                //1 = timestamp,
                //2 = player name,
                //3 = message
                this.log.debug('Player ' + parts[2] + ' chatted: ' + parts[3]);
                this.emit('player::chat', parts[2], parts[3]);
            }
        }