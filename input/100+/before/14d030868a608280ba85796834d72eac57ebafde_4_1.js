function()

{

    /*******************************************************/

    /*******************  PRIVATE STATE    *****************/

    /*******************************************************/

   var items_ = {};

   var sounds_ = [];

   var extension_ = ".ogg";

   var id_ = 0;



    var GetPath_ = function(path)

    {

        return path.replace(".zzz",extension_);

    }



    var GetElement_ = function(id)

    {

        return window.document.getElementById(id);

    }



    var GetCurrentElement_ = function(path)

    {

        return GetElement_(items_[path].Elements[items_[path].CurrentChannel]);

    }





    /*******************************************************/

    /*******************  PUBLIC  STATE    *****************/

    /*******************************************************/



    var SoundManager = function()

    {

    }



    SoundManager.prototype.GetExtension = function() { return extension_; }



    /*creates a DOM audio element and loads it with base64 data*/

    SoundManager.prototype.LoadBase64 = function(path,nbChannels,defaultVolume,base64Data,loop)

    {

        if(!items_[path])

        {

            nbChannels = nbChannels || 1;

            //nbChannels  = 1;

            try

            {

                items_[path] = {Channels:nbChannels,CurrentChannel:0,Elements:[],DefaultVolume:defaultVolume || 1};

                for(var i = 0; i < nbChannels; ++i)

                {

                    var el = new Audio();

                    var id = "sound" + id_;

                    items_[path].Elements[i] = id;

                    //el.type = "application/ogg";

                    el.src = base64Data;

                    el.load();

                    el.id = id;

                    el.loop = !!loop;

                    window.document.body.appendChild(el);



                    ++id_;

                }



            }

            catch(err)

            {

                items_[path] = null;

            }

        }



        return path;

    }

    /*creates a DOM audio element and loads it*/

    SoundManager.prototype.Load = function(path,nbChannels,defaultVolume)

    {

        if(!items_[path])

        {

            nbChannels = nbChannels || 1;

            //nbChannels  = 1;

            try

            {

                items_[path] = {Channels:nbChannels,CurrentChannel:0,Elements:[],DefaultVolume:defaultVolume || 1};

                for(var i = 0; i < nbChannels; ++i)

                {

                    var el = new Audio();

                    var id = "sound" + id_;

                    items_[path].Elements[i] = id;

                    //el.type = "application/ogg";

                    el.src = GetPath_(path) + "?qaz=" + id;

                    el.load();

                    el.id = id;

                    window.document.body.appendChild(el);



                    ++id_;

                }



            }

            catch(err)

            {

                items_[path] = null;

            }

        }

    }



    /**/

    SoundManager.prototype.Unload = function(path)

    {

        if(!!items_[path])

        {

            for(var i = 0; i < items_[path].Channels; ++i)

            {

                var element = GetElement_(items_[path].Elements[i]);

                element.pause();

                window.document.body.removeChild(element);

            }

            items_[path] = null;

        }

    }



    /**/

    SoundManager.prototype.SetVolume = function(path, value)

    {

        if(!!items_[path])

        {

            for(var i = 0; i < items_[path].Channels; ++i)

                GetElement_(items_[path].Elements[i]).volume = value;

        }

    }



    /**/

    SoundManager.prototype.GetVolume = function(path)

    {

        if(!!items_[path])

        {

            return GetCurrentElement_(path).volume;

        }

        return 0;

    }



    /**/

    SoundManager.prototype.IsPlaying = function(path)

    {

        if(!!items_[path])

        {

            return !GetCurrentElement_(path).paused;

        }

        return 0;

    }





    /**/

    SoundManager.prototype.Restart = function(path,loops)

    {

        if(!!items_[path])

        {

            var el = GetCurrentElement_(path);

            if(!!el.duration)

                el.currentTime = 0;

            el.volume = items_[path].DefaultVolume;

        }

    }



    /**/

    SoundManager.prototype.Play = function(path,loops)

    {

        if(!!items_[path])

        {

            /*go to the next channel*/

            if(++items_[path].CurrentChannel >= items_[path].Channels)

                items_[path].CurrentChannel = 0;



            /*start playing from the time = 0*/

            var el = GetCurrentElement_(path);

            if(!!el.duration) el.currentTime = 0;

            if(!!loops) el.loop = true;



            el.volume = items_[path].DefaultVolume;

            el.play();



            if(!!el.error)

            {

                Alert(path);

                Alert(el.error);

                items_[path] = null;

                return;

            }

        }

    }



    /*sets the volume and plays the sound*/

    SoundManager.prototype.PlayWithVolume = function(obj,loops)

    {

        var path = obj.Value;

        if(!!items_[path])

        {

            /*go to the next channel*/

            if(++items_[path].CurrentChannel >= items_[path].Channels)

                items_[path].CurrentChannel = 0;

            /*start playing from time 0*/

            var el = GetCurrentElement_(path);

            if(!!el.currentTime)

                el.currentTime = 0;



            //el.loop = !!loops;



            el.volume = obj.Volume;

            el.play();



            if(!!el.error)

            {

                Alert(path);

                Alert(el.error.code);

                items_[path] = null;

                return;

            }

        }

    }





    /**/

    SoundManager.prototype.Replay = function(path)

    {

        if(!!items_[path])

        {

            var el = GetCurrentElement_(path);

            el.pause();

            el.currentTime = 0;

            el.volume = items_[path].DefaultVolume;

            el.play();

        }

    }





    /**/

    SoundManager.prototype.Pause = function(path)

    {

        if(!!items_[path])

        {

            var el = GetCurrentElement_(path);

            el.forcePaused_ = true;

            el.pause();

        }

    }



    /**/

    SoundManager.prototype.PauseAll = function()

    {

        for(var i in items_)

        {

            if(!items_[i])

                continue;

            for(var x = 0; x < items_[i].Channels; ++x)

            {

                var el = GetElement_(items_[i].Elements[x]);

                if(!el.paused)

                {

                    el.forcePaused_ = true;

                    el.pause();

                }

            }

        }

    }



    /**/

    SoundManager.prototype.ResumeAll = function()

    {

        for(var i in items_)

        {

            if(!items_[i])

                continue;

            for(var x = 0; x < items_[i].Channels; ++x)

            {

                var el = GetElement_(items_[i].Elements[x]);

                if(!!el.forcePaused_)

                {

                    el.play();

                    el.forcePaused_ = undefined;

                }

            }

        }

    }



    /**/

    SoundManager.prototype.Resume = function(path)

    {

        if(!!items_[path])

        {

            var el = GetCurrentElement_(path);

            if(!!el.forcePaused_)

                el.play();

        }

    }

    /**/

    SoundManager.prototype.PlayOrResume = function(path,loops)

    {

        if(!!items_[path])

        {

            var el = GetCurrentElement_(path);

            if(!!el.paused)

            {

                el.loop = !!loops;

                el.play();

            }

            else

                this.Play(path,loops);

        }

    }



    /**/

    SoundManager.prototype.Preload = function()

    {

    }





    /**/

    SoundManager.prototype.QueueSound = function(value,volume,delay)

    {

        sounds_[sounds_.length] = {Value:value, Volume:volume||1, Frame:game_.GetCurrentFrame() + (delay||0)};

    }





    /**/

    SoundManager.prototype.FrameMove = function(frame)

    {

    }



    /**/

    SoundManager.prototype.Render = function(frame)

    {

        for(var i in sounds_)

        {

            if(frame >= sounds_[i].Frame)

                this.PlayWithVolume(sounds_.splice(i,1)[0]);

        }

    }



    return new SoundManager();

}