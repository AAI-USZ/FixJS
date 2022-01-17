function () {
            var template = "<table class='test-table'>" +
                             "<tbody data-bind='foreach: authors'>" +
                               "<tr><td>" +
                                 "<table class='test-outer'>" +
                                   "<tbody data-bind='foreach: $parent.authors'>" +
                                     "<tr>" +
                                       "<td data-bind='text: $parent.$parent.title'></td>" +
                                       "<td data-bind='text: fullName'></td>" +
                                     "</tr>" +
                                   "</tbody>" +
                                 "</table>" +
                               "</td></tr>" +
                             "</tbody>" +
                           "</table>";

            this.node.html(template);

            databind.applyBindings(this.authorsViewModel, this.element);

            var table = $(".test-table", this.element);
            var cells = $(".test-outer td", this.element);

            assertSame("data bound foreach item count is incorrect", 3, table.prop("rows").length);
            assertSame("incorrect number of cells", 18, cells.length);

            assertSame("cell 0 value is incorrect", "Author:", cells.eq(0).text());
            assertSame("cell 1 value is incorrect", "William Riker", cells.eq(1).text());
            assertSame("cell 2 value is incorrect", "Author:", cells.eq(2).text());
            assertSame("cell 3 value is incorrect", "Deanna Troi", cells.eq(3).text());
            assertSame("cell 4 value is incorrect", "Author:", cells.eq(4).text());
            assertSame("cell 5 value is incorrect", "Beverly Crusher", cells.eq(5).text());

            assertSame("cell 6 value is incorrect", "Author:", cells.eq(6).text());
            assertSame("cell 7 value is incorrect", "William Riker", cells.eq(7).text());
            assertSame("cell 8 value is incorrect", "Author:", cells.eq(8).text());
            assertSame("cell 9 value is incorrect", "Deanna Troi", cells.eq(9).text());
            assertSame("cell 10 value is incorrect", "Author:", cells.eq(10).text());
            assertSame("cell 11 value is incorrect", "Beverly Crusher", cells.eq(11).text());

            assertSame("cell 12 value is incorrect", "Author:", cells.eq(12).text());
            assertSame("cell 13 value is incorrect", "William Riker", cells.eq(13).text());
            assertSame("cell 14 value is incorrect", "Author:", cells.eq(14).text());
            assertSame("cell 15 value is incorrect", "Deanna Troi", cells.eq(15).text());
            assertSame("cell 16 value is incorrect", "Author:", cells.eq(16).text());
            assertSame("cell 17 value is incorrect", "Beverly Crusher", cells.eq(17).text());

            this.authorsViewModel.set('authors', Authors.create([{
                    firstName: "W",
                    lastName: "R",
                    title: "<b>Number One</b>",
                    url: "/Riker",
                    away: true,
                    popular: true
                }, {
                    firstName: "D",
                    lastName: "T",
                    title: "<b>Counselor</b>",
                    url: "/Troi",
                    away: true,
                    popular: true
                }, {
                    firstName: "B",
                    lastName: "C",
                    title: "<b>Doctor</b>",
                    url: "/Crusher",
                    away: true,
                    popular: true
                }
            ]));

            table = $(".test-table", this.element);
            cells = $(".test-outer td", this.element);

            assertSame("data bound foreach item count is incorrect after change", 3, table.prop("rows").length);
            assertSame("incorrect number of cells after change", 18, cells.length);
            
            assertSame("cell 0 value is incorrect after change", "Author:", cells.eq(0).text());
            assertSame("cell 1 value is incorrect after change", "W R", cells.eq(1).text());
            assertSame("cell 2 value is incorrect after change", "Author:", cells.eq(2).text());
            assertSame("cell 3 value is incorrect after change", "D T", cells.eq(3).text());
            assertSame("cell 4 value is incorrect after change after change", "Author:", cells.eq(4).text());
            assertSame("cell 5 value is incorrect after change", "B C", cells.eq(5).text());

            assertSame("cell 6 value is incorrect after change", "Author:", cells.eq(6).text());
            assertSame("cell 7 value is incorrect after change", "W R", cells.eq(7).text());
            assertSame("cell 8 value is incorrect after change", "Author:", cells.eq(8).text());
            assertSame("cell 9 value is incorrect after change", "D T", cells.eq(9).text());
            assertSame("cell 10 value is incorrect after change", "Author:", cells.eq(10).text());
            assertSame("cell 11 value is incorrect after change", "B C", cells.eq(11).text());

            assertSame("cell 12 value is incorrect after change", "Author:", cells.eq(12).text());
            assertSame("cell 13 value is incorrect after change", "W R", cells.eq(13).text());
            assertSame("cell 14 value is incorrect after change", "Author:", cells.eq(14).text());
            assertSame("cell 15 value is incorrect after change", "D T", cells.eq(15).text());
            assertSame("cell 16 value is incorrect after change", "Author:", cells.eq(16).text());
            assertSame("cell 17 value is incorrect after change", "B C", cells.eq(17).text());
        }