function reuseMarkersCache(_element_parent, _array, _interval) {

            // the stuff below is basically a copy/paste of the createIntervalElements function body
            VMM.attachElement(_element_parent, "");

            for (var i = 0; i < _array.length; i++) {
                var _element = VMM.appendAndGetElement(_element_parent, "<div>", _interval.classname);

                VMM.appendElement(_element, _array[i].pretty_date);

                _array[i].interval_element = _element;

                // OCN-107: the following line has been commented out. it is very CPU consuming
                // OCN-107: the effect is that the marker text (e.g. JULY 4) is not centered around its marker
                //VMM.Lib.css(_element, "text-indent", -(VMM.Lib.width(_element)/2));
                //VMM.Lib.css(_element, "opacity", "0");
            }

            positionInterval(_element_parent, _array);
        }