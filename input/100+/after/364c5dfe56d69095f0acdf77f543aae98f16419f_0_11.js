function (mapArea, options, cssclass) {

            var me = this, fill,stroke, e, t_fill, el_name, el_class, template, c = mapArea.coords();

            el_name = me.elementName ? 'name="' + me.elementName + '" ' : '';

            el_class = cssclass ? 'class="' + cssclass + '" ' : '';



            t_fill = '<v:fill color="#' + options.fillColor + '" class="_fill" opacity="' + 

                (options.fill ? 

                    options.fillOpacity :

                    0) + 

                '" /><v:stroke class="_fill" opacity="' + 

                options.strokeOpacity + '"/>';





            stroke = options.stroke ?

                ' strokeweight=' + options.strokeWidth + ' stroked="t" strokecolor="#' + 

                    options.strokeColor + '"' :

                ' stroked="f"';

            

            fill = options.fill ? 

                ' filled="t"' :

                ' filled="f"';



            switch (mapArea.shape) {

                case 'rect':

                    template = '<v:rect ' + el_class + el_name + fill + stroke + 

                        ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' + 

                          c[0] + 'px;top:' + c[1]  + 'px;width:' + (c[2] - c[0]) + 

                          'px;height:' + (c[3] - c[1]) + 'px;">' + t_fill + '</v:rect>';

                    break;

                case 'poly':

                    template = '<v:shape ' + el_class + el_name + fill + stroke + ' coordorigin="0,0" coordsize="' + me.width + ',' + me.height

                                + '" path="m ' + c[0] + ',' + c[1] + ' l ' + c.slice(2).join(',')

                                + ' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:' + me.width + 'px;height:' + me.height + 'px;">' + t_fill + '</v:shape>';

                    break;

                case 'circ':

                case 'circle':

                    template = '<v:oval ' + el_class + el_name + fill + stroke

                                + ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' + (c[0] - c[2]) + 'px;top:' + (c[1] - c[2])

                                + 'px;width:' + (c[2] * 2) + 'px;height:' + (c[2] * 2) + 'px;">' + t_fill + '</v:oval>';

                    break;

            }

            e = $(template);

            $(me.canvas).append(e);



            return e;

        }