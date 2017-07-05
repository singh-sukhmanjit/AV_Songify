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
        song.currentTime= song.duration - 2;
    }

    function randomExcluded(min, max, excluded) {
        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
    }
      
    function changeSong(){
        var song=document.querySelector('audio');
        song.src=songs[currentSong].fileName;
        toggleSong();
        currentSongDetails(songs[currentSong]);
    }
    

    window.onload= function(){ 
        currentSongDetails(songs[0]);  //initially first song and album ka name show hoga

        for(var i=0; i<songs.length; i++){
            //var name= '#song'+(i+1);
            var song= $('#song'+(i+1)); //select each song id
            song.find('.song-name').text(songs[i].name);  //look for .song-name inside each selector of class song-name
            song.find('.song-artist').text(songs[i].artist);
            song.find('.song-album').text(songs[i].album);
            song.find('.song-length').text(songs[i].duration);
            addSongNameClickEvent(songs[i],i+1);
        }
        setInterval(function(){
            updateCurrTime();
        },1000);

        //search and sort plugin
        $('#songs').DataTable({
        paging:false       //pagination object disabled
        });
        
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
    })

    $('.fa-random').on('click', function(){
        $(this).toggleClass('disabled');
        willShuffle= 1 -willShuffle;
    })

    //after song ends it check for shuffle on, loop on, loop off
    $('audio').on('ended', function(){
        var song=document.querySelector('audio');
        if(willShuffle==1){
            currentSong= randomExcluded(1, songs.length, currentSong);
            song.src=songs[currentSong-1].fileName;
            toggleSong();
            currentSongDetails(songs[currentSong-1]);
        }

        else if(willLoop==1){    //loop on hai
            if(currentSong<songs.length){   //last song se pehle ke songs hai
                changeSong();
            }
            else{   // loop on hai and last song hai
                song.src=songs[0].fileName; //first song ka source use kro
                toggleSong();
                currentSongDetails(songs[0]); 
            }
        }

        else{   //loop off hai
            if(currentSong<songs.length){   //last song se pehle ke songs hai
                changeSong();
            }
            else{       //last song ke bad play ka icon show kro and song stop kro
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                song.currentTime=0;
            }
        }
    })
   
//prev song using mouse
$('.fa-step-forward').on('click', function(){
    var song = document.querySelector('audio');
    if(willShuffle==1){
        currentSong= randomExcluded(1, songs.length, currentSong);
        song.src=songs[currentSong-1].fileName;
        toggleSong();
        currentSongDetails(songs[currentSong-1]);
    }

    else{
        if(currentSong<songs.length){   //last song se pehle ke songs hai
            changeSong();
        }
        else{   
        song.src=songs[0].fileName; //agr last song hai to first song chlega
        toggleSong();
        currentSongDetails(songs[0]); 
        }  
    }
    

})

//next song using 'n' on keyboard
$('body').on('keypress', function(event){
    if(event.key == "n" && event.target.tagName!=="INPUT"){
        var song = document.querySelector('audio');
    if(willShuffle==1){
        currentSong= randomExcluded(1, songs.length, currentSong);
        song.src=songs[currentSong-1].fileName;
        toggleSong();
        currentSongDetails(songs[currentSong-1]);
    }

    else{
        if(currentSong<songs.length){   //last song se pehle ke songs hai
            changeSong();
        }
        else{   
        song.src=songs[0].fileName; //agr last song hai to first song chlega
        toggleSong();
        currentSongDetails(songs[0]); 
        }  
    }
    }
})

//prev song using mouse
$('.fa-step-backward').on('click', function(){
    var song = document.querySelector('audio');
    if(currentSong==1){ //agr first song hai to last song chlega
        //agr currentSong=1 then songs[1] mtlb 2nd song, thats why currentSong=4-1=3 is songs[3]= lastsong
        currentSong= songs.length - 1;  
        changeSong();

    }
    else{
        currentSong -= 2;   //currentSong agr 4 hai then 4-2=2 is songs[2] mtlb 3rd song
        changeSong();
    }

})

//prev song using 'p' on keyboard
$('body').on('keypress', function(event){
    if(event.key == "p" && event.target.tagName!=="INPUT"){
        var song = document.querySelector('audio');
        if(currentSong==1){ //agr first song hai to last song chlega
            //agr currentSong=1 then songs[1] mtlb 2nd song, thats why currentSong=4-1=3 is songs[3]= lastsong
            currentSong= songs.length - 1;  
            changeSong();
        }
        else{
            currentSong -= 2;   //currentSong agr 4 hai then 4-2=2 is songs[2] mtlb 3rd song
            changeSong();
        }
    }
})

$('#inst').on('click', function(){
    $('.main').addClass('hidden');
    $('#piano_wrapper').removeClass('hidden');
})

var instrument=0;
$('#keyboard').on('click', function(){
    instrument=0;
})

$('#organ').on('click', function(){
    instrument=1;
})

$('#guitar').on('click', function(){
    instrument=2;
})

$('#edm').on('click', function(){
    instrument=3;
})

$('#C_3').on('click', function(){
    Synth.play(instrument, 'C', 3, 2);
})

$('#D_3').on('click', function(){
    Synth.play(instrument, 'D', 3, 2);
})

$('#E_3').on('click', function(){
    Synth.play(instrument, 'E', 3, 2);
})

$('#F_3').on('click', function(){
    Synth.play(instrument, 'F', 3, 2);
})

$('#G_3').on('click', function(){
    Synth.play(instrument, 'G', 3, 2);
})

$('#A_3').on('click', function(){
    Synth.play(instrument, 'A', 3, 2);
})

$('#B_3').on('click', function(){
    Synth.play(instrument, 'B', 3, 2);
})

$('#C_4').on('click', function(){
    Synth.play(instrument, 'C', 4, 2);
})

$('#D_4').on('click', function(){
    Synth.play(instrument, 'D', 4, 2);
})

$('#E_4').on('click', function(){
    Synth.play(instrument, 'E', 4, 2);
})

$('#F_4').on('click', function(){
    Synth.play(instrument, 'F', 4, 2);
})

$('#G_4').on('click', function(){
    Synth.play(instrument, 'G', 4, 2);
})

$('#A_4').on('click', function(){
    Synth.play(instrument, 'A', 4, 2);
})

$('#B_4').on('click', function(){
    Synth.play(instrument, 'B', 4, 2);
})

$('#C_5').on('click', function(){
    Synth.play(instrument, 'C', 5, 2);
})

$('#D_5').on('click', function(){
    Synth.play(instrument, 'D', 5, 2);
})

$('#E_5').on('click', function(){
    Synth.play(instrument, 'E', 5, 2);
})

$('#F_5').on('click', function(){
    Synth.play(instrument, 'F', 5, 2);
})

$('#G_5').on('click', function(){
    Synth.play(instrument, 'G', 5, 2);
})

$('#A_5').on('click', function(){
    Synth.play(instrument, 'A', 5, 2);
})

$('#B_5').on('click', function(){
    Synth.play(instrument, 'B', 5, 2);
})

$('#CH_3').on('click', function(){
    Synth.play(instrument, 'C#', 3, 2);
})

$('#DH_3').on('click', function(){
    Synth.play(instrument, 'D#', 3, 2);
})

$('#FH_3').on('click', function(){
    Synth.play(instrument, 'F#', 3, 2);
})

$('#GH_3').on('click', function(){
    Synth.play(instrument, 'G#', 3, 2);
})

$('#AH_3').on('click', function(){
    Synth.play(instrument, 'A#', 3, 2);
})

$('#CH_4').on('click', function(){
    Synth.play(instrument, 'C#', 4, 2);
})

$('#DH_4').on('click', function(){
    Synth.play(instrument, 'D#', 4, 2);
})

$('#FH_4').on('click', function(){
    Synth.play(instrument, 'F#', 4, 2);
})

$('#GH_4').on('click', function(){
    Synth.play(instrument, 'G#', 4, 2);
})

$('#AH_4').on('click', function(){
    Synth.play(instrument, 'A#', 4, 2);
})

$('#CH_5').on('click', function(){
    Synth.play(instrument, 'C#', 5, 2);
})

$('#DH_5').on('click', function(){
    Synth.play(instrument, 'D#', 5, 2);
})

$('#FH_5').on('click', function(){
    Synth.play(instrument, 'F#', 5, 2);
})

$('#GH_5').on('click', function(){
    Synth.play(instrument, 'G#', 5, 2);
})

$('#AH_5').on('click', function(){
    Synth.play(instrument, 'A#', 5, 2);
})