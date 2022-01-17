function (v) { return v.Id == this.Id }, { Id: e.Id }).single(undefined, undefined, function (result) {
                                equal(result.Title, e.Title + '_changed', 'changed text failed');
                                equal(result.Lead, e.Lead, 'original text failed');
                                start();
                            }