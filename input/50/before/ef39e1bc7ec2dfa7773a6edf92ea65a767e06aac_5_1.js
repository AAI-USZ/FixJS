function(){
            if (typeof module === 'undefined') return false;
            try{ require('mongodb'); } catch(e) { return false; }
            return true;
        }