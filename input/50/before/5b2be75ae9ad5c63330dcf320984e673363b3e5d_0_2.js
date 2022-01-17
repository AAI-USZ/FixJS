function(opts) {
  opts.options({ "story_id": { "position": 2
                             , "help": "ID of the Tracker story to be estimated"
                             , "required": true
                             }
               , "estimate": { "position": 3
                             , "help": "# of story points"
                             , "required": true
                             }
               });
}