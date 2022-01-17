function(currentItem, recycled) {

            var tpl = document.querySelector(".itemtemplate").winControl;

            tpl = tpl.renderItem(itemPromise, recycled);



            var dateItem = tpl.element._value.querySelector('.item-subtitle');

            dateItem.textContent = toReadableDate(currentItem.data.datePublished);



            var descItem = tpl.element._value.querySelector('.item-description');

            if (currentItem.data.description.length > 170)

                descItem.textContent = currentItem.data.description.substr(0, 170) + '...';

            else

                descItem.textContent = currentItem.data.description;



            return tpl.element;

        }