function addToHistory(objName, objData, icon, world, history) {
    if (history.length == 1) {
        $('#no-items').toggle();
    }

    var item = $('<li>').addClass('history-item');
    item.append($('<p>').html(objData.id));
    item.append($('<p>').html(objName));
    item.append($('<div>').addClass(icon));

    var deleteButton = $('<i>').addClass('icon-trash icon-large delete');
    deleteButton.click(function(e) {
        e.preventDefault();
        world.DestroyBody(history[objData.id].GetBody());
        $(this).parent().remove();

        if (!$('.history-item').length) {
            $('#no-items').toggle();
        }
    });
    item.append(deleteButton);

    var jointButton = $('<i>').addClass('icon-link icon-large joint');
    var active = 0;
    jointButton.click(function(e) {
        e.preventDefault();
        if (!active) {
            jointButton.addClass('joint-hover');
            active = 1;

            // If two objects chosen, link them together.
            var activeJoints = $('.joint-hover');
            if (activeJoints.length > 1) {
                activeJoints.each(function(index, element) {
                    var otherId = $(element).parent().children().html();

                    if (otherId != objData.id) {
                        thisBody = history[objData.id].GetBody();
                        otherBody = history[otherId].GetBody();
                        var joint = new b2RevoluteJointDef();
                        joint.Initialize(thisBody, otherBody, thisBody.GetWorldCenter());
                        world.CreateJoint(joint);
                    }

                });
                activeJoints.removeClass('joint-hover');
            }
        }
        else {
            // Untoggle.
            jointButton.removeClass('joint-hover');
            active = 0;
        }
    });
    item.append(jointButton);


    // Using the passed in object values, create a sublist.
    var sublist = $('<ul>').addClass('item-details');
    for (key in objData) {
        if (key == 'id') { continue; }
        var subitem = $('<li>').addClass('item-detail');
        subitem.append($('<p>').html(key).addClass('item-detail-key'));
        subitem.append($('<p>').html(objData[key]).addClass('item-detail-val'));
        sublist.append(subitem);
    }
    sublist.hide();
    item.append(sublist);

    // Expand on click, handle weird opacity stuff.
    item.click(function() {
        sublist.toggle(200, 'linear');
    });

    $('#history').prepend(item);
}