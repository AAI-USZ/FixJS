function () {

            var val = formatter(this.getData(parent.dataContext)) ? null : 'none';

            parent.setStyle('display', val);

        }