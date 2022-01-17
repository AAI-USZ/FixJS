function (e, delta, dx, dy) {
                    // prevent the default scrolling and keep it inside the widget
                    e.preventDefault();
                    that.scrollTo(is_horizontal ? (-el.offsetLeft - 37*dx) : (-el.offsetTop - 37*dy));
                }