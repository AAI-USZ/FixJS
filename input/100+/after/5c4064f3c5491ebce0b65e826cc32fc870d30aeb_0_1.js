function () {
                if (arguments[0] instanceof Error) {
                  return handleError(arguments[0]);
                }
                var args_ = Array.prototype.slice.call(arguments, 1)
                  , currPost
                  , postArgs;
                if (args_.length) hookArgs = args_;
                if (++current_ < total_) {
                  currPost = posts[current_]
                  if (currPost.length < 1)
                    throw new Error("Your post must have a next argument -- e.g., function (next, ...)");
                  postArgs = [once(next_)].concat(hookArgs);
                  return currPost.apply(self, postArgs);
                } else if (typeof lastArg === 'function'){
                  // All post handlers are done, call original callback function
                  return lastArg.apply(self);
                }
              }