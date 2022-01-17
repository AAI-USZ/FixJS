function addTask(text, list, backgroundColor) {
    var createDataControl = function(text) {
        var checkBox = $('<input type="checkbox">' + text +'<br>');
        checkBox.click(function(e) {
            var clazz = 'task-completed';
            if (e.target.checked) {
                $(e.target.parentElement).addClass(clazz);
            }
            else {
                $(e.target.parentElement).removeClass(clazz);
            }
        });
        return checkBox;
    };

    var added = false;
    var checkBox = text ? createDataControl(text) : null;
    if (text) {
        $('div.task', list).each(function () {
            if (added) {
                return;
            }

            if (this.innerHTML == '') {
                checkBox.appendTo($(this));
                $(this).draggable("option", "disabled", false);
                if (backgroundColor) {
                    $(this).css('background-color', backgroundColor);
                }
                added = true;
            }
        });
    }

    if (!added) {
        var task = $('<div class="task"></div>');
        task.addClass(parseListId(list[0]));
        task.draggable({ revert: "invalid" });
        if (checkBox) {
            checkBox.appendTo(task);
            task.css('background-color', backgroundColor);
        }
        else {
            task.draggable("option", "disabled", true);
        }
        task.appendTo($(list));
    }
}