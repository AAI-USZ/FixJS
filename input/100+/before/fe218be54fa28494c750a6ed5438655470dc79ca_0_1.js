function(err, grid) {
            var grid_utf = grid.encodeSync('utf', {resolution: 4});
            //fs.writeFileSync('./ref.json',JSON.stringify(grid_utf))
            assert.equal(JSON.stringify(grid_utf), reference);
            // pull an identical view and compare it to original grid
            var gv = grid.view(0, 0, 256, 256);
            var gv_utf = gv.encodeSync('utf', {resolution: 4});
            assert.equal(JSON.stringify(gv_utf), reference);
            // pull a subsetted view (greenland basically)
            var gv2 = grid.view(64, 64, 64, 64);
            assert.equal(gv2.width(), 64);
            assert.equal(gv2.height(), 64);
            var gv_utf2 = gv2.encodeSync('utf', {resolution: 4});
            //fs.writeFileSync('./test/support/grid_view.json',JSON.stringify(gv_utf2),'utf8')
            assert.equal(JSON.stringify(gv_utf2), reference_view);
            done();
        }