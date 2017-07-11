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

    
    

    $('#songList1').on('click',function(){
        currentPlayList=playList_name[0];
        dataRender();
      
    })

    $('#songList2').on('click',function(){
        currentPlayList=playList_name[1];
        dataRender();

    })

    $('#songList3').on('click',function(){
        currentPlayList=playList_name[2];
    })

    $('#songList4').on('click',function(){
        currentPlayList=playList_name[3];
    })

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
    }]

    //mahi_way List
    var mahi_list=[
    {
        'name': '1 Excuses',
        'artist': 'Garry Sandhu Ft. Roach Killa',
        'album': 'Excuses',
        'duration': '3:52',
        'fileName': 'songs/excuses.mp3',
        'albumArt': 'img/excuses.JPG',
        'songNumber': 1
    },
    {
        'name': '2 Cheap Thrills',
        'artist': 'Sia Ft. Sean Paul',
        'album': 'Cheap Thrills',
        'duration': '3:45',
        'fileName': 'songs/cheap_thrills.mp3',
        'albumArt': 'img/cheap_thrills.JPG',
        'songNumber': 2
    },
    {
        'name': '3 Raatan',
        'artist': 'Garry Sandhu',
        'album': 'Magic',
        'duration': '4:40',
        'fileName': 'songs/raatan.mp3',
        'albumArt': 'img/raatan.JPG',
        'songNumber': 3
    },
    {
        'name': '4 Laiyan Laiyan',
        'artist': 'Saad Sultan Ft Rizwan Anwar',
        'album': 'Single',
        'duration': '3:04',
        'fileName': 'songs/laiyan_laiyan.mp3',
        'albumArt': 'img/laiyan_laiyan.JPG',
        'songNumber': 4
    }
]
var playList_name=[songs,mahi_list]
var currentPlayList=playList_name[0];

function dataRender(){  
        for(var j=0; j<4; j++){
        currentSongDetails(playList_name[j][0]);
        if(currentPlayList==playList_name[j]) {
            var audio=document.querySelector('audio');
            audio.src=playList_name[j][0].fileName;
            for(var i=0; i<playList_name[j].length; i++){
                //var name= '#song'+(i+1);
                var song= $('#song'+(i+1)); //select each song id
                song.find('.song-name').text(playList_name[j][i].name);  //look for .song-name inside each selector of class song-name
                song.find('.song-artist').text(playList_name[j][i].artist);
                song.find('.song-album').text(playList_name[j][i].album);
                song.find('.song-length').text(playList_name[j][i].duration);
                addSongNameClickEvent(playList_name[j][i],i+1);

            }
            break;
        }
        
    }
        $('#songs').DataTable({
        destroy: true,    
        paging:false       //pagination object disabled
        });
    }


    function currentSongDetails(songObj){   //to display current song info
        //attribute of song change krne ke liye
        $('.current-song-image').attr('src', songObj.albumArt); 
        $('.current-song-name').text(songObj.name);
        $('.current-song-album').text(songObj.album)
        currentSong=songObj.songNumber;
        $('#totalSongs').text(songObj.songNumber+'/'+currentPlayList.length);
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
        
        for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                var song=document.querySelector('audio');
                song.src=playList_name[j][currentSong].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][currentSong]);            

        }
        
    }
        
    }

    function song_list(){
        for(var i=0; i<4;i++){
            var song_id=$('<tr class="song" id="song'+(i+1)+'">'
                    +'<td class="song-name"></td>'
                    +'<td class="song-artist"></td>'
                    +'<td class="song-album"></td>'
                    +'<td class="song-length"></td>'
                    +'</tr>')

            $('.song-list').append(song_id);
    }
    }

$('.volume').on('click',function(){
    var song=document.querySelector('audio');
    $(this).toggleClass('glyphicon-volume-up glyphicon-volume-off')
    var check= $(this).hasClass('glyphicon-volume-up');
    if(check==true){
        song.volume=1;
    }
    else{
        song.volume=0;
    }
})

    
window.onload= function(){ 
        song_list();
    
      //initially first song and album ka name show hoga
        dataRender();

        setInterval(function(){
            updateCurrTime();
        },1000);

        //search and sort plugin
        
 
}

    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        var email = $('#email-input').val();
        var pwd = $('#pwd-input').val();
        console.log('click');
        if (name.length > 3) {  
                if(email=='test@acadview.com' && pwd=='JavascriptRocks'){

                    var message = "Welcome, " + name;
                    $('.main .user-name').text(message);
                    $('.welcome-screen').addClass('hidden');
                    $('.main').removeClass('hidden');
                    $('#playList').removeClass('hidden');
                }
                else {
                    $('#name-input').addClass('error');
                    $('.input-wrapper').find('p').text('Email or Password is incorrect');
                }
        }
        else {
        $('#name-input').addClass('error');
        $('.input-wrapper').find('p').text('Enter more than 3 characters');
        }
    });
    $('.play-icon').on('click', function() {
        toggleSong()    
        });

    $('body').on('keypress', function(event) {
        //'event' object ka target jiska tagName "INPUT" hai uspe event lgana
                if (event.keyCode == 32 && event.target.tagName!="INPUT") {
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
        for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                                          
                if(willShuffle==1){
            currentSong= randomExcluded(1, playList_name[j].length, currentSong);
            song.src=playList_name[j][currentSong-1].fileName;
            toggleSong();
            currentSongDetails(playList_name[j][currentSong-1]);
        }

        else if(willLoop==1){    //loop on hai
            if(currentSong<playList_name[j].length){   //last song se pehle ke songs hai
                changeSong();
            }
            else{   // loop on hai and last song hai
                song.src=playList_name[j][0].fileName; //first song ka source use kro
                toggleSong();
                currentSongDetails(playList_name[j][0]); 
            }
        }

        else{   //loop off hai
            if(currentSong<playList_name[j].length){   //last song se pehle ke songs hai
                changeSong();
            }
            else{       //last song ke bad play ka icon show kro and song stop kro
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                song.currentTime=0;
            }
        }
            
        }
        
    }
        
    })
   
//prev song using mouse
$('.fa-step-forward').on('click', function(){
    var song = document.querySelector('audio');
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                                          
                if(willShuffle==1){
                currentSong= randomExcluded(1, playList_name[j].length, currentSong);
                song.src=playList_name[j][currentSong-1].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][currentSong-1]);

            }

            else{
                if(currentSong<playList_name[j].length){   //last song se pehle ke songs hai
                    changeSong();
                }
                else{   
                song.src=playList_name[j][0].fileName; //agr last song hai to first song chlega
                toggleSong();
                currentSongDetails(playList_name[j][0]); 
                }  
    }
            
            
        }
        
    }
    
    

})

//next song using 'n' on keyboard
$('body').on('keypress', function(event){
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
            if(event.key == "n" && event.target.tagName!=="INPUT"){
                 var song = document.querySelector('audio');
            if(willShuffle==1){
                currentSong= randomExcluded(1, playList_name[j].length, currentSong);
                song.src=playList_name[j][currentSong-1].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][currentSong-1]);
            }

            else{
                if(currentSong<playList_name[j].length){   //last song se pehle ke songs hai
                    changeSong();
                }
                else{   
                song.src=playList_name[j][0].fileName; //agr last song hai to first song chlega
                toggleSong();
                currentSongDetails(playList_name[j][0]); 
                }  
            }
            }
            
        }
        
    }
    
})

//prev song using mouse
$('.fa-step-backward').on('click', function(){
    var song = document.querySelector('audio');
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                              
                 if(currentSong==1){ //agr first song hai to last song chlega
                    //agr currentSong=1 then songs[1] mtlb 2nd song, thats why currentSong=4-1=3 is songs[3]= lastsong
                    currentSong= playList_name[j].length - 1;  
                    changeSong();

                }
                else{
                    currentSong -= 2;   //currentSong agr 4 hai then 4-2=2 is songs[2] mtlb 3rd song
                    changeSong();
    }
            
        }
        
    }
   

})

//prev song using 'p' on keyboard
$('body').on('keypress', function(event){
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                              
                 if(event.key == "p" && event.target.tagName!=="INPUT"){
                var song = document.querySelector('audio');
                if(currentSong==1){ //agr first song hai to last song chlega
                    //agr currentSong=1 then songs[1] mtlb 2nd song, thats why currentSong=4-1=3 is songs[3]= lastsong
                    currentSong= playList_name[j].length - 1;  
                    changeSong();
                }
                else{
                    currentSong -= 2;   //currentSong agr 4 hai then 4-2=2 is songs[2] mtlb 3rd song
                    changeSong();
                }
    }
            
        }
        
    }
   
})

//playlist code


