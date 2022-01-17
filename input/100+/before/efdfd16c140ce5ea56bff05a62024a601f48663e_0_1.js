function(){
        try {
            var file = gio.File.new_for_path(GLib.get_home_dir() + "/.candidate-selections.json");
        
            if (file.query_exists (null)) {
                /*
                var file_stream = file.read(null);
                var data_stream = gio.DataInputStream.new(file_stream);
                var json = data_stream.read_until("", null);
                this._candidateSelections = JSON.parse(json[0]);
                */
                file.read_async(0, null,
                		function(source, result){
                		    var file_stream = source.read_finish(result);
                		    
                		    if (file_stream){
                		        var data_stream = gio.DataInputStream.new(file_stream);
                                var json = data_stream.read_until("", null);
                                this._candidateSelections = JSON.parse(json[0]);
                		    } else {
                		        this._logger(e, 'Error in _loadCandidateSelectionsFromFile');
                		    }
                		});
            } else {
                this._candidateSelections = {};
            }
        } catch (e){
           this._candidateSelections = {};
           this._logger(e, 'Error in _loadCandidateSelectionsFromFile');
        }
    }