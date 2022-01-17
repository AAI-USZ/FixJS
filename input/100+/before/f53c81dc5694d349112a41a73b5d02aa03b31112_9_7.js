function(target, animate, callback) {
                if (this.animating) {
                    return this;
                }

                if (false === this._trigger('scroll', null, [target, animate])) {
                    return this;
                }

                if ($.isFunction(animate)) {
                    callback = animate;
                    animate  = true;
                }

                var parsed = jCarousel.parseTarget(target);

                if (parsed.relative) {
                    var end    = this.items().size() - 1,
                        scroll = Math.abs(parsed.target),
                        first,
                        index,
                        curr,
                        i;

                    if (parsed.target > 0) {
                        var last = this._last.index();

                        if (last >= end && this.tail) {
                            if (!this.inTail) {
                                this._scrollTail(animate, callback);
                            } else {
                                if (this.options.wrap == 'both' ||
                                    this.options.wrap == 'last') {
                                    this._scroll(0, animate, callback);
                                } else {
                                    this._scroll(Math.min(this._target.index() + scroll, end), animate, callback);
                                }
                            }
                        } else {
                            if (last === end &&
                                (this.options.wrap == 'both' || this.options.wrap == 'last')) {
                                return this._scroll(0, animate, callback);
                            } else {
                                first = this._target.index();
                                index = first + scroll;

                                if (this.circular && index > end) {
                                    i = end;
                                    curr = this.items().get(-1);

                                    while (i++ < index) {
                                        curr = this.items().eq(0);
                                        curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                        this.list().append(curr);
                                        // Force items reload
                                        this._items = null;
                                    }

                                    this._scroll(curr, animate, callback);
                                } else {
                                    this._scroll(Math.min(index, end), animate, callback);
                                }
                            }
                        }
                    } else {
                        if (this.inTail) {
                            this._scroll(Math.max((this._first.index() - scroll) + 1, 0), animate, callback);
                        } else {
                            first = this._target.index();
                            index = first - scroll;

                            if (first === 0 &&
                                (this.options.wrap == 'both' || this.options.wrap == 'first')) {
                                this._scroll(end, animate, callback);
                            } else {
                                if (this.circular && index < 0) {
                                    i = index;
                                    curr = this.items().get(0);

                                    while (i++ < 0) {
                                        curr = this.items().eq(-1);
                                        curr.after(curr.clone(true).addClass('jcarousel-clone'));
                                        this.list().prepend(curr);
                                        // Force items reload
                                        this._items = null;

                                        var lt  = jCarousel.intval(this.list().css(this.lt)),
                                            dim = this._dimension(curr);

                                        this.rtl ? lt += dim : lt -= dim;

                                        this.list().css(this.lt, lt + 'px');
                                    }

                                    this._scroll(curr, animate, callback);
                                } else {
                                    this._scroll(Math.max(first - scroll, 0), animate, callback);
                                }
                            }
                        }
                    }
                } else {
                    this._scroll(parsed.target, animate, callback);
                }

                this._trigger('scrollend');

                return this;
            }