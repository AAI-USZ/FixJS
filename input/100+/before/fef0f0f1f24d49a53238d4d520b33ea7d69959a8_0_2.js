function () {
            if (s.disabled || visible) return false;

            var hi = s.height,
                thi = s.rows * hi;

            // Parse value from input
            read();

            // Create wheels containers
            var html = '<div class="' + s.theme + '">' + (s.display == 'inline' ? '<div class="dw dwbg dwi"><div class="dwwr">' : '<div class="dwo"></div><div class="dw dwbg"><div class="dwwr">' + (s.headerText ? '<div class="dwv"></div>' : ''));
            for (var i = 0; i < s.wheels.length; i++) {
                html += '<div class="dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';
                // Create wheels
                for (var label in s.wheels[i]) {
                    html += '<td><div class="dwwl dwrc">' + (s.mode != 'scroller' ? '<div class="dwwb dwwbp" style="height:' + hi + 'px;line-height:' + hi + 'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:' + hi + 'px;line-height:' + hi + 'px;"><span>&ndash;</span></div>' : '') + '<div class="dwl">' + label + '</div><div class="dww dwrc" style="height:' + thi + 'px;min-width:' + s.width + 'px;"><ul>';
                    // Create wheel values
                    for (var j in s.wheels[i][label]) {
                        html += '<li class="dw-v" data-val="_' + j + '" style="height:' + hi + 'px;line-height:' + hi + 'px;">' + s.wheels[i][label][j] + '</li>';
                    }
                    html += '</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>';
                }
                html += '</tr></table></div></div>';
            }
            html += (s.display != 'inline' ? '<div class="dwbc"><span class="dwbw dwb-s"><a href="#" class="dwb">' + s.setText + '</a></span><span class="dwbw dwb-c"><a href="#" class="dwb">' + s.cancelText + '</a></span></div>' : '<div class="dwcc"></div>') + '</div></div></div>';

            dw = $(html);

            scrollToPos();

            // Show
            s.display != 'inline' ? dw.appendTo('body') : elm.is('div') ? elm.html(dw) : dw.insertAfter(elm);
            visible = true;

            // Theme init
            theme.init(dw, that);

            if (s.display != 'inline') {
                // Init buttons
                $('.dwb-s a', dw).click(function () {
                    that.setValue(false, true);
                    that.hide();
                    s.onSelect.call(e, that.val, that);
                    return false;
                });

                $('.dwb-c a', dw).click(function () {
                    that.hide();
                    s.onCancel.call(e, that.val, that);
                    return false;
                });

                // Disable inputs to prevent bleed through (Android bug)
                $('input,select').each(function() {
                    if (!$(this).prop('disabled'))
                        $(this).addClass('dwtd');
                });
                $('input,select').prop('disabled', true);

                // Set position
                position();
                $(window).bind('resize.dw', position);
            }

            // Events
            dw.delegate('.dwwl', 'DOMMouseScroll mousewheel', function (e) {
                if (!s.readonly) {
                    e.preventDefault();
                    e = e.originalEvent;
                    var delta = e.wheelDelta ? (e.wheelDelta / 120) : (e.detail ? (-e.detail / 3) : 0),
                        t = $('ul', this),
                        p = +t.data('pos'),
                        val = Math.round(p - delta);
                    setGlobals(t);
                    calc(t, val, delta < 0 ? 1 : 2);
                }
            }).delegate('.dwb, .dwwb', START_EVENT, function (e) {
                // Active button
                $(this).addClass('dwb-a');
            }).delegate('.dwwb', START_EVENT, function (e) {
                if (!s.readonly) {
                    // + Button
                    e.preventDefault();
                    e.stopPropagation();
                    var t = $(this).closest('.dwwl').find('ul')
                        func = $(this).hasClass('dwwbp') ? plus : minus;
                    setGlobals(t);
                    clearInterval(timer);
                    timer = setInterval(function() { func(t); }, s.delay);
                    func(t);
                }
            }).delegate('.dwwl', START_EVENT, function (e) {
                // Scroll start
                if (!move && s.mode != 'clickpick' && !s.readonly) {
                    e.preventDefault();
                    move = true;
                    target = $('ul', this).addClass('dwa');
                    if (s.mode == 'mixed')
                        $('.dwwb', this).fadeOut('fast');
                    pos = +target.data('pos');
                    setGlobals(target);
                    start = getY(e);
                    startTime = new Date();
                    stop = start;
                    that.scroll(target, pos);
                }
            });

            s.onShow.call(e, dw, that);
        }