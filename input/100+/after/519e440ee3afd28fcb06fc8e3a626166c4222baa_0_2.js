function() {
    try {
        this.processInput();
        do {
            changed = false;
            for (f in this.fields) {
                if (this.fields[f].set) continue;
                if (((!this.fields[f].value || 
                      (!this.fields[f].changed && !this.fields[f].primary) )) &&
                    this.fields[f].calc) {
                    var missing = 0;
                    var parameters = {};
                    for (i = 0; i < this.fields[f].parameters.length; i++) {
                        parm = this.fields[f].parameters[i]
                        if (this.fields[parm].value &&
                            (this.fields[parm].changed || 
                             this.fields[parm].primary || 
                             this.fields[parm].set)) {
                            parameters[parm] = this.fields[parm].value;
                        } else {
                            ++missing;
                        }
                    }
                    if ((this.fields[f].max_missing != undefined  &&
                         missing <= this.fields[f].max_missing) ||
                        (missing == 0) ) {
                        this.fields[f].set = true;
                        changed = true;
                        this.fields[f].value = this.fields[f].calc(parameters);
                    }
                }
                
            }
        } while (changed);
        this.processOutput();
    } catch(e) {
        setErrorMessage(e);
    }
}