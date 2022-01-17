function(){

                var listItem = $('<li/>', {

                    id: this.id

                }).appendTo(playlistList);



                var link = $('<a/>', {

                    href: '#' + this.id,

                    text: this.title

                }).appendTo(listItem);



                var removeIcon = $('<div/>', {

                    class: "remove",

                    playlistid: this.id

                }).appendTo(listItem);



                //jQuery does not support appending paths to SVG elements. You MUST declare element inside of svg's HTML mark-up.

                removeIcon.append('<svg><path d="M0,2 L2,0 L12,10 L10,12z"/> <path d="M12,2 L10,0 L0,10 L2,12z"/></svg>');



                if(this.selected)

                    selectRow(this.id);

            }