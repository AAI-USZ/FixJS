function(status){
            var save = status.save,
                fileName = status.filename,
                url = status.url,
                fileType = status.fileType,
                element, rules, self = this;

            if (save && save.success && save.status === 201) {
                //
                if (fileType.indexOf('svg') !== -1) {
                    element = document.application.njUtils.make('embed', null, this.application.ninja.currentDocument);
                    element.type = 'image/svg+xml';
                    element.src = url+'/'+fileName;
                } else {
                    element = document.application.njUtils.make('image', null, this.application.ninja.currentDocument);
                    element.src = url+'/'+fileName;
                }
                //Adding element once it is loaded
                element.onload = function () {
                    element.onload = null;
                    self.application.ninja.elementMediator.addElements(element, rules, true/*notify*/, false /*callAddDelegate*/);
                };
                //Setting rules of element
                rules = {
                    'position': 'absolute',
                    'top' : '0px',
                    'left' : '0px'
                };
                //
                self.application.ninja.elementMediator.addElements(element, rules, false/*notify*/, false /*callAddDelegate*/);
            } else {
                //HANDLE ERROR ON SAVING FILE TO BE ADDED AS ELEMENT
            }

            return element;
        }