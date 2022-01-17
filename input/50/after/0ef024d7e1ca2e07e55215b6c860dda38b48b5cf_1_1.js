function(params){
            var action_obj = {"disk_template": params.data.extra_param};
            OpenNebula.Action.simple_action(params,OpenNebula.VM.resource,
                                            "attachdisk",action_obj);
        }