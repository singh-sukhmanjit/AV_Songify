function toggleSong(){
        var song = document.querySelector('audio');
        if (song.paused == true) {
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        } 
        else {
            $('.play-icon'  ).removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
    };

    function fancyTimeFormat(time)
        {   
            // Hours, minutes and seconds
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = time % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }

    function updateCurrTime(){
        var song=document.querySelector('audio');
        var currTime=Math.floor(song.currentTime);
        var dur=Math.floor(song.duration);
        var widths; //Progress Bar ki css property set krri hai
        widths=currTime/dur*100;
        $('.progress-filled').css("width", widths+'%');
        currTime=fancyTimeFormat(currTime);
        dur=fancyTimeFormat(dur);
        $('.progress-wrapper .time-elapsed').text(currTime);
        $('.progress-wrapper .song-duration').text(dur);

        
    }

    function playList(songName, number){
            $('#song'+number).click(function(){
            var audio=document.querySelector('audio');
            
            if(audio.src.search(songName)>=0){   //audio source alag hai or use != -1
                toggleSong();
            }
            else{
                audio.src=songName;
                toggleSong();
            }
        });
    }

    var songs=[{
        'name': 'Coldplay- Fix You',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '4:07',
        'fileName': 'songs/fix_you.mp3'
    },
    {
        'name': 'Coldplay- For You',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '5:43',
        'fileName': 'songs/for_you.mp3'
    },
    {
        'name': 'Coldplay- Sky Full Of Stars',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '4:34',
        'fileName': 'songs/sky_full_of_stars.mp3'
    },
    {
        'name': 'Coldplay- Yellow',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '4:30',
        'fileName': 'songs/yellow.mp3'
    }
    ]

      
    
    window.onload= function(){ 
        for(var i=0; i<songs.length; i++){
            //var name= '#song'+(i+1);
            var song= $('#song'+(i+1)); //select each song id
            song.find('.song-name').text(songs[i].name);  //look for .song-name inside each song selector
            song.find('.song-artist').text(songs[i].artist);
            song.find('.song-album').text(songs[i].album);
            song.find('.song-length').text(songs[i].duration);
            playList(songs[i].fileName,i+1);
        }
        setInterval(function(){
            updateCurrTime();
        },1000);
        
    }
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
    $('.play-icon').on('click', function() {
        toggleSong()    
        });

    $('body').on('keypress', function(event) {
                if (event.keyCode == 32) {
                    toggleSong() 
                    }
                
            });