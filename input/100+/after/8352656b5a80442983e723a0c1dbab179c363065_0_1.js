function() {
            trigger = $('<a href="#" id="example"></a>').appendTo(document.body);
            select = new Select({
                trigger: '#example',
                model: [
                    {value: 'value1', text: 'text1'},
                    {value: 'value2', text: 'text2', selected: true}
                ]
            }).render();

            select.syncModel([
                {value: 'value3', text: 'text3'},
                {value: 'value4', text: 'text4', selected: true}
            ]);

            expect(select.get('trigger').html()).toBe('text4');
            expect(select.get('value')).toBe('value4');
            expect(select.get('selectedIndex')).toBe(1);
            expect(select.currentItem[0]).toBe(select.element.find('[data-role=item]')[1]);
            expect(select.options.eq(0).attr('data-defaultSelected'))
                .toBe('false');
            expect(select.options.eq(0).attr('data-selected'))
                .toBe('false');
            expect(select.options.eq(1).attr('data-defaultSelected'))
                .toBe('true');
            expect(select.options.eq(1).attr('data-selected'))
                .toBe('true');
        }