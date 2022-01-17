function merge_options(map_data, options) {

            var temp_opts = u.updateProps({}, options);

            delete temp_opts.areas;



            u.updateProps(map_data.options, temp_opts);



            merge_areas(map_data, options.areas);

            // refresh the area_option template

            u.updateProps(map_data.area_options, map_data.options);

        }