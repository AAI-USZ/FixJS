function(opts) {
  opts.options({ "story_id": { "position": 0
                             , "help": "ID of the Tracker story to be estimated"
                             , "required": true
                             }
               , "estimate": { "position": 1
                             , "help": "# of story points"
                             , "required": true
                             }
               });
}