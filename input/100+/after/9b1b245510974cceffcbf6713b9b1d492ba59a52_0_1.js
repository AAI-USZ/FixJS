function option(action, value) {
                    switch (action) {
                    case 'name':       self.name(value);
                                       break;
                    case 'action':     self.action(value);
                                       break;
                    case 'enctype':    self.enctype(value);
                                       break;
                    case 'params':     self.params(value);
                                       break;
                    case 'autoSubmit': self.autoSubmit = value;
                                       break;
                    case 'onSubmit':   self.onSubmit = value;
                                       break;
                    case 'onComplete': self.onComplete = value;
                                       break;
                    case 'onSelect':   self.onSelect = value;
                                       break;
                    default:
                                       throw new Error("[jQuery.ocupload.set] '" + action + "' is an invalid option.");
                    }
                }