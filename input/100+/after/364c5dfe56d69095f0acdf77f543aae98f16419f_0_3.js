function () {

                var elements = {},

                        lastKey = 0,

                        fade_func = function (el, op, endOp, duration) {

                            var index, 

                                cbIntervals = duration/15,

                                obj, u = $.mapster.utils;



                            if (typeof el === 'number') {

                                obj = elements[el];

                                if (!obj) {

                                    return;

                                }

                            } else {

                                index = u.indexOfProp(elements, null, el);

                                if (index) {

                                    delete elements[index];

                                }

                                elements[++lastKey] = obj = el;

                                el = lastKey;

                            }



                            endOp = endOp || 1;



                            op = (op + (endOp / cbIntervals) > endOp - 0.01) ? endOp : op + (endOp / cbIntervals);



                            u.setOpacity(obj, op);

                            if (op < endOp) {

                                setTimeout(function () {

                                    fade_func(el, op, endOp, duration);

                                }, 15);

                            }

                        };

                return fade_func;

            }