function(attr)
    {
        attr.percent = attr.progress / 10

        attr.statuses = this.mapStatuses(attr.status)

        var complete = attr.percent >= 100
        var data = attr.percent
        var forcestart = !_.contains(attr.statuses, 'queued') && _.contains(attr.statuses, 'started')
        var res, torrent_class
        
        if(_.contains(attr.statuses, 'paused'))
        {
            res = 'Paused'
            torrent_class = 'paused'
        }

        if(_.contains(attr.statuses, 'checking'))
        {
            res = "Checked %:.1d%%".replace(/%:\.1d%/, (data / 10).toFixed(1))
            torrent_class = 'checking waiting'
        }
        
        if(!res && complete)
        { 
            if (_.contains(attr.statuses, 'queued'))
            {
                if(_.contains(attr.statuses, 'started'))
                {
                    res = 'Seeding to ' + (attr.peers_connected || 0) + ' peers'
                    res += ' - U: ' + Helpers.parseBytes(attr.up_speed) + '/s'
                    res += ' ETA: ' + Helpers.secondsToString(attr.eta)
                    torrent_class = 'seeding'
                }else{
                    res = "Queued Seed"
                    torrent_class = 'seeding waiting'
                }
            }else{
                res = "Finished"
                torrent_class = 'done'
            }
        }else if(!res){
            if (_.contains(attr.statuses, 'queued') && !_.contains(attr.statuses, 'started'))
            {
                res = "Queued, position: " + attr.queue_position
                torrent_class = 'waiting'
            }else if(!_.contains(attr.statuses, 'queued') && !_.contains(attr.statuses, 'started')){
                res = "Stopped" + ' ' + data / 10 + "%"
                torrent_class = 'stopped'
            }else{
                res = forcestart ? '[F] ' : ''
                res += 'Downloading from ' + (attr.seeds_connected || 0) + ' peers'
                res += ' - D: ' + Helpers.parseBytes(attr.down_speed) + '/s U: ' + Helpers.parseBytes(attr.up_speed) + '/s'
                res += ' ETA: ' + Helpers.secondsToString(attr.eta)
                torrent_class = 'downloading'
            }
        }
        
        var status_split = res.split(' - ')
        
        var obj_res = {
            '_percent': attr.progress / 10,
            '_torrent_class': torrent_class,
            '_status_byline': res,
            '_compact_byline': status_split.length > 1 ? status_split[1] : res,
            '_ratio': (attr.ratio / 1000).toFixed(2)
        }

        return obj_res
    }