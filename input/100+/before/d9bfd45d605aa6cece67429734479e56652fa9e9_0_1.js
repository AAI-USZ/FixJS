function() {
            var actor = $("#segment-actor");
            var duration = $("#segment-duration");
            var description = $("#segment-description");

            var valid_t = true;
            var valid_r = true;
            var valid_s = true;

            var pos_x = $("#segment-pos-to-x");
            var pos_y = $("#segment-pos-to-y");
            var pos_z = $("#segment-pos-to-z");
            var pos = [pos_x, pos_y, pos_z];

            var rotate_a = $("#segment-rot-to-a");
            var rotate_b = $("#segment-rot-to-b");
            var rotate_g = $("#segment-rot-to-g");
            var rotate = [rotate_a, rotate_b, rotate_g];

            var scale_x = $("#segment-scale-to-x");
            var scale_y = $("#segment-scale-to-y");
            var scale_z = $("#segment-scale-to-z");
            var scale = [scale_x, scale_y, scale_z];

            var easing = $("#segment-easing");

            var check = true;

            check = check && checkSelect(actor, "You must choose an actor");
            check = check && checkDigits(duration, "This must be a number");

            var posCheck = pos.some(function (e) {
                return e.val() !== "";
            });
            if (posCheck) {
                check = check && checkDigits(pos_x, "This must be a number", 0);
                check = check && checkDigits(pos_y, "This must be a number", 0);
                check = check && checkDigits(pos_z, "This must be a number", 0);
            }

            var rotateCheck = rotate.some(function (e) {
                return e.val() !== "";
            });
            if (rotateCheck) {
                check = check && checkDigits(rotate_a, "This must be a number", 1);
                check = check && checkDigits(rotate_b, "This must be a number", 1);
                check = check && checkDigits(rotate_g, "This must be a number", 1);
            }

            var scaleCheck = scale.some(function (e) {
                return e.val() !== "";
            });
            if (scaleCheck) {
                check = check && checkDigits(scale_x, "This must be a number", 2);
                check = check && checkDigits(scale_y, "This must be a number", 2);
                check = check && checkDigits(scale_z, "This must be a number", 2);
            }

            check = check && checkSelect(easing, "You must choose an easing function", 3);

            //check if it is all alright

            if (check) {
                var behaviour = {
                    easing: easing.val()
                };
                if (posCheck) {
                    behaviour.position= {
                        x: pos_x.val(),
                        y: pos_y.val(),
                        z: pos_z.val()
                    };
                }
                if (rotateCheck) {
                    behaviour.rotation = {
                        x: rotate_a.val(),
                        y: rotate_b.val(),
                        z: rotate_g.val()
                    };
                }
                if (scaleCheck) {
                    behaviour.scale = {
                        x: scale_x.val(),
                        y: scale_y.val(),
                        z: scale_z.val()
                    };
                }

                GraphState.currentLabel.component.setParameter("initialize", true);

                storyboardController.setDescriptionForSegment(GraphState.currentLogicSegment.id, description.val());
                storyboardController.setDurationForSegment(GraphState.currentLogicSegment.id, parseInt(duration.val(),10));
                storyboardController.setActorForSegment(GraphState.currentLogicSegment.id, parseInt(actor.val(), 10));
                storyboardController.setBehaviourForSegment(GraphState.currentLogicSegment.id, behaviour);

                GraphState.currentLabel.setLabel(duration.val());
                GraphState.currentLabel.component.setPaintStyle({
                    strokeStyle: "#000"
                });

                $(this).dialog("close");
            }


        }