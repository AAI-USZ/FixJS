function templateHandler(itemPromise) {

        return itemPromise.then(function (currentItem, recycled) {





            var tplSelect;

            if (currentItem.data.innerIndex == 0) {

                tplSelect = document.querySelector('.largeitemtemplate').winControl;

            }

            else {

                tplSelect = document.querySelector('.itemtemplate').winControl;

            }



            tplSelect = tplSelect.renderItem(itemPromise, recycled);



            return tplSelect.element;



        });

    }