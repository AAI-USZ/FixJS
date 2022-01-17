function(e){
          /*
          - binds all mouse/touch events (namespaced)
          - prepares stage overlay elements
          - preloads images if needed
          */
            var
              space= get(_dimensions_),
              frames= get(_frames_),
              resolution= max(frames, get(_steps_)),
              fraction= set(_fraction_, 1 / resolution * ((opt.step || opt.frame) - 1)),
              frame= set(_frame_, fraction * frames + 1),
              loaded= 0,
              id= t.attr('id'),
              $overlay= t.parent(),
              $hi= $(_div_tag_, { 'class': hi_klass,
                css: { position: _absolute_, left: 0, top: 0, width: space.x, height: space.y, background: _hex_black_, opacity: 0 }
              }).appendTo($overlay),
              area= set(_area_, $(opt.area || $hi ))
            if ($.reel.touchy){
              // workaround for downsizing-sprites-bug-in-iPhoneOS inspired by Katrin Ackermann
              t.css({ WebkitUserSelect: 'none', WebkitBackgroundSize: opt.images.length
                ? 'auto'
                : (get(_stitched_) && get(_stitched_)+'px '+space.y+'px')
                || (space.x * opt.footage)+'px '+(space.y * get(_rows_) * (opt.rows || 1) * (opt.directional? 2:1))+'px'
              });
              area
                .bind(_touchstart_, function(e){ t.trigger('down', [finger(e).clientX, finger(e).clientY, true]); })
                .bind(_touchmove_, function(e){ t.trigger('slide', [finger(e).clientX, finger(e).clientY, true]); return !(opt.rows > 1 || opt.orbital || get(_reeling_)) })
                .bind(_touchend_, function(e){ t.trigger('up', [true]); return false })
                .bind(_touchcancel_, function(e){ t.trigger('up', [true]); return false })
            }else{
              area
                .css({ cursor: 'url('+drag_cursor+'), '+failsafe_cursor })
                .bind(opt.wheelable ? _mousewheel_ : '', function(e, delta){ t.trigger('wheel', [delta]); return false })
                .bind(_dblclick_, function(e){ t.trigger('play') })
                .bind(opt.clickfree ? _mouseenter_ : _mousedown_, function(e){ t.trigger('down', [e.clientX, e.clientY]); return false })
                .bind(opt.clickfree ? _mouseleave_ : '', function(e){ t.trigger('up'); return false })
                .disableTextSelect();
            }
            (opt.hint) && area.attr(_title_, opt.hint);
            opt.monitor && $overlay.append($monitor= $(_div_tag_, {
              'class': monitor_klass,
              css: { position: _absolute_, left: 0, top: 0 }
            })) || ($monitor= $());
            opt.indicator && $overlay.append(indicator('x'));
            opt.rows > 1 && opt.indicator && $overlay.append(indicator('y'));
            t.trigger('preload');
          }