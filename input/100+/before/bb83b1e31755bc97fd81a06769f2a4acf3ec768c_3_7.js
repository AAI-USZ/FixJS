function (container) {
        $(container).append('<table>\
            <tr>\
                <th>Gesture</th>\
                <td id="Gesture"></td>\
            </tr>\
            <tr>\
                <td>Event type</td>\
                <td id="EventType"></td>\
            </tr>\
            <tr>\
                <td>Values</th>\
                <td id="Values"></td>\
            </tr>\
            </table>');

        this.addEventListener('rcjs:pinchstart', function (event) {
            print('pinch', 'rcjs:pinchstart', event);
        });

        this.addEventListener('rcjs:pinch', function (event) {
            print('pinch', 'rcjs:pinch', event);
        });

        this.addEventListener('rcjs:pinchend', function (event) {
            print('', 'rcjs:pinchend', event);
        });

        this.addEventListener('rcjs:swipestart', function (event) {
            print('swipe', 'rcjs:swipestart', event);
        });

        this.addEventListener('rcjs:swipe', function (event) {
            print('swipe', 'rcjs:swipe', event);
        });

        this.addEventListener('rcjs:swipeend', function (event) {
            print('', 'rcjs:swipeend', event);
        });

        function print (gesture, type, obj) {
            $('#Gesture').empty().append(gesture);
            $('#EventType').empty().append(type);
            $('#Values').empty().append(JSON.stringify(obj, null, '\t'));
        }
    }