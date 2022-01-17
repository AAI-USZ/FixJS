function(e){
        OpenSpice.socket.emit('require_del_track', {'pass':MASTERPASS, 'track_number':$(e.target).parents('tr').prevAll('tr').size()})
    }