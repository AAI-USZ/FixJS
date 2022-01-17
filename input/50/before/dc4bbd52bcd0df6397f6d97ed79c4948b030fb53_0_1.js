function (node, renderedView) {
            Y.log('View has been refreshed!');
            Y.log(node);
            Y.log(renderedView);
            //re-bind the DOM
            this.loaded = true;
            this.bind();
        }