function() {
        if(this.disposed) {
            return;
        }
        if (this.select) {
            var elm = this.select,
                host = elm.parentNode;
        }
        var container = this.getElement('container');
        /**
         * ComboBox析构后触发 
         * @event
         * @name magic.ComboBox#ondispose
         * @param {baidu.lang.Event} evt 事件参数 
         * @todo ondispose触发的时机，并不是在整个combobox析构之后，而是在数据析构后，dom删除之前。
         */
        magic.control.ComboBox.prototype.dispose.call(this);
        baidu.dom.remove(container);
        if (elm) {
            host.parentNode.insertBefore(elm, host);
            baidu.dom.remove(host);
            elm.style.visibility = '';
            elm.style.width = '';            
        }
        container = main = null;
    }