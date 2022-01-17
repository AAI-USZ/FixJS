function() {
                         let _text = this._promptEntry.get_text();
                         this._promptEntry.reactive = false;
                         this._promptEntry.add_style_pseudo_class('insensitive');
                         this._greeterClient.call_answer_query(serviceName, _text);
                     }