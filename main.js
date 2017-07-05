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

    function addSongNameClickEvent(songObj, number){
            $('#song'+number).click(function(){
            var audio=document.querySelector('audio');
            
            if(audio.src.search(songObj.fileName)>=0){   //audio source alag hai or use != -1
                toggleSong();
            }
            else{
                audio.src=songObj.fileName;
                toggleSong();
                currentSongDetails(songObj);
            }
        });
    }

    var currentSong= 1;
    var willLoop= 0;
    var willShuffle= 0;

    var songs=[{
        'name': 'Coldplay- Fix You',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '4:07',
        'fileName': 'songs/fix_you.mp3',
        'albumArt': 'img/coldplay.jpg',
        'songNumber': 1
    },
    {
        'name': 'Coldplay- For You',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '5:43',
        'fileName': 'songs/for_you.mp3',
        'albumArt': 'img/coldplay.jpg',
        'songNumber': 2
    },
    {
        'name': 'Coldplay- Sky Full Of Stars',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '4:34',
        'fileName': 'songs/sky_full_of_stars.mp3',
        'albumArt': 'img/coldplay.jpg',
        'songNumber': 3
    },
    {
        'name': 'Coldplay- Yellow',
        'artist': 'Coldplay',
        'album': 'Coldplay',
        'duration': '4:30',
        'fileName': 'songs/yellow.mp3',
        'albumArt': 'img/coldplay.jpg',
        'songNumber': 4
    }
    ]

    function currentSongDetails(songObj){   //to display current song info
        //attribute of song change krne ke liye
        $('.current-song-image').attr('src', songObj.albumArt); 
        $('.current-song-name').text(songObj.name);
        $('.current-song-album').text(songObj.album)
        currentSong=songObj.songNumber;
    }

    function timeJump(){
        var song= document.querySelector('audio');
        song.currentTime= song.duration - 5;
    }

      
    $(document).ready(function(){   //search and sort plugin
    $('#songs').DataTable({
        paging:false       //pagination object disabled
        });
    });

    window.onload= function(){ 
        currentSongDetails(songs[0]);  //initially first song and album ka name show hoga

        for(var i=0; i<songs.length; i++){
            //var name= '#song'+(i+1);
            var song= $('#song'+(i+1)); //select each song id
            song.find('.song-name').text(songs[i].name);  //look for .song-name inside each song selector
            song.find('.song-artist').text(songs[i].artist);
            song.find('.song-album').text(songs[i].album);
            song.find('.song-length').text(songs[i].duration);
            addSongNameClickEvent(songs[i],i+1);
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
        //'event' object ka target jiska tagName "INPUT" hai uspe event lgana
                if (event.keyCode == 32 && event.target.tagName!="INPUT") {
                    console.log(event);
                    toggleSong() 
                    }
                
            });

    $('.fa-repeat').on('click', function(){
        //this matlab jo bhi selector selected hai usse phir se select karo
        $(this).toggleClass('disabled');    
        willLoop= 1 - willLoop;
        console.log(willLoop);
    })

    $('audio').on('ended', function(){
        var song = document.querySelector('audio');
        if(currentSong<songs.length){
        song.src=songs[currentSong].fileName;
        toggleSong();
        currentSongDetails(songs[currentSong]);
        }
        else{       
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.currentTime=0;
        }
    })