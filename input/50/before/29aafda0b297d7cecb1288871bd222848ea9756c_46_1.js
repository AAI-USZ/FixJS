function(doc)
    {
        // See also issue 4529. Since the memory profiler is still a lab thing,
        // hide the "Memory Profiler" button begin a pref.
        if (!Options.get("memoryProfilerEnable"))
        {
            var button = doc.getElementById("fbToggleMemoryProfiling");
            if (button)
                Dom.collapse(button, true);
        }
    }