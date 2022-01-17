function(f) {
        if (f.id !== undefined && f.id !== 'forEach' && f.id !== '') {
            Ext.get(f.id).dom.style.border = '1px solid red';
            var ef = Ext.get(f.id+'_error');
            if (ef) { ef.innerHTML = f.msg; }
            this.fields.push(f.id);
        }
    }