function() {
                         let _text = this._promptEntry.get_text();
                         this._promptEntry.reactive = false;
                         this._promptEntry.add_style_pseudo_class('insensitive');
                         this._userVerifier.call_answer_query_sync(serviceName, _text, null);
                     }