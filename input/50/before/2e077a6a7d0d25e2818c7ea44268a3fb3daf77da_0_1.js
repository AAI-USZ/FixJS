function(e)
        {
            var key = e.which || e.keyCode;
            if (key === 13)
            {
                performSearch();
                e.halt();
                return false;
            }
        }