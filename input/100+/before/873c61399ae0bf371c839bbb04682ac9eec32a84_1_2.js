function InitTreeMap(responce) {
    var tm = new $jit.TM.Squarified({
        //where to inject the visualization
        injectInto: 'infovis',
        //parent box title heights
        titleHeight: 15,
        //enable animations
        animate: animate,
        //box offsets
        offset: 1,
        //Attach left and right click events
        Events: {
            enable: true,
            onClick: function (node) {
                if (node) tm.enter(node);
            },
            onRightClick: function () {
                tm.out();
            }
        },
        duration: 1000,
        //Enable tips
        Tips: {
            enable: true,
            //add positioning offsets
            offsetX: 20,
            offsetY: 20,
            //implement the onShow method to
            //add content to the tooltip when a node
            //is hovered
            onShow: function (tip, node, isLeaf, domElement) {
                var html = "<div class=\"tip-title\">" + node.name +
                                "</div><div class=\"tip-text\">";
                var data = node.data;
                if (data.count) {
                    html += "count: " + data.count;
                }
                tip.innerHTML = html;
            }
        },
        //Add the name of the node in the correponding label
        //This method is called once, on label creation.
        onCreateLabel: function (domElement, node) {
            domElement.innerHTML = node.name;
            var style = domElement.style;
            style.display = '';
            style.border = '1px solid transparent';
            domElement.onmouseover = function () {
                style.border = '1px solid #9FD4FF';
            };
            domElement.onmouseout = function () {
                style.border = '1px solid transparent';
            };
        }
    });

    var json_data_object = JSON.parse(responce);
    tm.loadJSON(JSON.parse(json_data_object));
    tm.refresh();
    //end
    //add events to radio buttons
    var sq = $jit.id('r-sq'),
    st = $jit.id('r-st'),
    sd = $jit.id('r-sd');
    var util = $jit.util;
    util.addEvent(sq, 'change', function () {
        if (!sq.checked) return;
        util.extend(tm, new $jit.Layouts.TM.Squarified);
        tm.refresh();
    });
    util.addEvent(st, 'change', function () {
        if (!st.checked) return;
        util.extend(tm, new $jit.Layouts.TM.Strip);
        tm.layout.orientation = "v";
        tm.refresh();
    });
    util.addEvent(sd, 'change', function () {
        if (!sd.checked) return;
        util.extend(tm, new $jit.Layouts.TM.SliceAndDice);
        tm.layout.orientation = "v";
        tm.refresh();
    });
    //add event to the back button
    var back = $jit.id('back');
    $jit.util.addEvent(back, 'click', function () {
        tm.out();
    });
}