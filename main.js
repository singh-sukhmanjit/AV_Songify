var featSongs = [];
var userSongs = [];
var totalPlaylist = 2;


var cardListAjax = function(){
  $.ajax({
          'type': 'POST',
          'url': 'featSongScript.php',
          success: function (response) {
            featSongs = JSON.parse(response);
            console.log(featSongs);
            songListAjax();

          },
          error: function (xhr) {
            console.log(response.data,response.status);
          }
      })
}

cardListAjax();

var songListAjax = function(){
  $.ajax({
          'type': 'POST',
          'url': 'songListScript.php',
          success: function (response) {
            userSongs = JSON.parse(response);
            console.log(userSongs);
            init();

          },
          error: function (xhr) {
            console.log(response.data,response.status);
          }
      })
}


var init = function(){

  $('.theme1').on('click',function(){
    $('.wrapper').css("background","linear-gradient(rgb(33, 76, 120), rgb(3, 7, 12) 85%)");
  });

  $('.theme2').on('click',function(){
    $('.wrapper').css("background","linear-gradient(rgb(110, 77, 42), rgb(11, 7, 4) 85%)");
  });

  $('.theme3').on('click',function(){
    $('.wrapper').css("background","linear-gradient(rgb(42, 153, 26), rgb(3, 7, 12) 85%)");
  })

  var fx = setInterval(function(){
    var z = $('#urlFile')[0].files[0].name;
    console.log(z);
  },1000);

  console.log('init');
  //To change song

  var pList = 0;
  function showCard(pL){

    if(pL==1){
      console.log('a');
      var a = $('#songs');
      var b = $('.dataTables_filter');
      var c = $('.featWrapper');
      $(a).addClass('hidden');
      $(b).addClass('hidden');
      $(c).removeClass('hidden');
    }
  }
  //
  function showList(pL){
    if(pL==0){
      console.log('b');
      var a = $('.featWrapper');
      var b = $('.dataTables_filter');
      var c = $('#songs');
      $(a).addClass('hidden');
      $(b).removeClass('hidden');
      $(c).removeClass('hidden');
    }
  }

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

  //Display time in format of m:ss eg 1:05
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

  //Function is updated every second to show current time
  function updateCurrTime(){
      var song=document.querySelector('audio');
      var currTime=Math.floor(song.currentTime);
      var dur=Math.floor(song.duration);
      var widths; //Progress Bar ki css property set krri hai
      widths=currTime/dur*100;    //provides value of width for progress bar
      $('.progress-filled').css("width", widths+'%'); //it will update progress bar
      currTime=fancyTimeFormat(currTime);
      dur=fancyTimeFormat(dur);
      $('.progress-wrapper .time-elapsed').text(currTime);
      $('.progress-wrapper .song-duration').text(dur);
  }

  //To change song when we click on it
  function addSongNameClickEvent(songObj, number){
      $('#song'+number).click(function(){
      var audio=document.querySelector('audio');
  // Song is already playing on which it is clicked, so pause it
          if(audio.src.search(songObj.fileName)>=0){
              toggleSong();
          }
  //Song is different on which clicked, so change it
          else{
              audio.src=songObj.fileName;
              toggleSong();
              currentSongDetails(songObj);
          }
      });

      $('.card'+number).click(function(){
      var audio=document.querySelector('audio');
  // Song is already playing on which it is clicked, so pause it
          if(audio.src.search(songObj.fileName)>=0){
              toggleSong();
          }
  //Song is different on which clicked, so change it
          else{
              audio.src=songObj.fileName;
              toggleSong();
              currentSongDetails(songObj);
          }
      });
  }



  var currentSong= 1; //Initially first song the playlist selected
  var willLoop= 0;    //Loop is off initially
  var willShuffle= 0; //Shuffle is off initially

  //On click at first playlist, change, playlist name and Display playlist's data in Table
  //Similar with other songList click events
  $('#songList1').on('click',function(){
      currentPlayList=playList_name[0];
      console.log(pList);
      dataRender();
      showCard(pList);
      pList = 0;

  })

  $('#songList2').on('click',function(){
      currentPlayList=playList_name[1];
      console.log(pList);
      dataRender();
      showList(pList);
      pList = 1;


  })


  var playList_name=[featSongs, userSongs] //variable contains list of all playlists
  var currentPlayList=playList_name[0];   //initially first playlist is selected

  //This fxn display data in Table
  function dataRender(){
    for(var j=0; j<totalPlaylist; j++){
          if(currentPlayList==playList_name[j]) {
            currentSongDetails(playList_name[j][0]);
            var audio=document.querySelector('audio');
            audio.src=playList_name[j][0].fileName;
            for(var i=0; i<playList_name[j].length; i++){
                var song= $('#song'+(i+1)); //select each song id
                song.find('.song-sr').text((i+1));
                song.find('.song-name').text(playList_name[j][i].name);  //look for .song-name inside each selector of class song-name
                song.find('.song-artist').text(playList_name[j][i].artist);
                song.find('.song-album').text(playList_name[j][i].album);
                song.find('.song-length').text(playList_name[j][i].duration);

                var card = $('.card'+(i+1));
                card.find('img').attr('src', playList_name[j][i].albumArt);
                card.find('div').text(playList_name[j][i].name);
                addSongNameClickEvent(playList_name[j][i],i+1);
            }
            break;
          }
      }


      //Search and Sort Plugin
      $('#songs').DataTable({
          destroy: true,      //Before populating table with new data, destroy old data
          paging:false       //pagination object disabled
      });
  }

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

  //To randomly play song
  function randomExcluded(min, max, excluded) {
      var n = Math.floor(Math.random() * (max-min) + min);
      if (n >= excluded) n++;
      return n;
  }

  function changeSong(){
      for(var j=0; j<totalPlaylist; j++){
          if(currentPlayList==playList_name[j]) {
              var song=document.querySelector('audio');
              song.src=playList_name[j][currentSong].fileName;
              toggleSong();
              currentSongDetails(playList_name[j][currentSong]);
          }
      }
  }

  //Create HTML structure for Songs in Table
      function song_list(){
          for(var i=0; i<playList_name[1].length;i++){
              var song_id=$('<tr class="song" id="song'+(i+1)+'">'
                      +'<td class="song-sr"></td>'
                      +'<td class="song-name"></td>'
                      +'<td class="song-artist"></td>'
                      +'<td class="song-album"></td>'
                      +'<td class="song-length"></td>'
                      +'</tr>');

              $('.song-list').append(song_id);

          }
      }

      function card_list(){
          for(var i=0; i<playList_name[0].length;i++){
              var featCard = $('<div class="featCard card'+ (i+1) +'">'
                              +'<img src=" " width="160px" height="160px">'
                              +'<div></div>'
                              +'</div>');

              $('.featWrapper').append(featCard);
          }
      }
  //Toggle between Mute and Volume On
  $('.volume').on('click',function(){
      var song=document.querySelector('audio');
      $(this).toggleClass('glyphicon-volume-up glyphicon-volume-off')
      var check= $(this).hasClass('glyphicon-volume-up');
      if(check==true){    //volume class contains glyphicon volume up
          song.volume=1;
          $('#vol_filled').css("width", 100+"%");
      }
      else{               //volume class contains glyphicon volume off
          song.volume=0;
          $('#vol_filled').css("width", 0+"%");
      }
  })

  //Change Songs's Current Duration on clicking at Progress Bar
  $('.player-progress').on('click',function(event){
      var song=document.querySelector('audio');
      var seek=$('.player-progress');
      //event.pageX is X axis in pixels relative to page at which clicked
      //event.target.offsetLeft is distance from left side of element in pixels which is clicked
      //seek[0].clientWidth is width of first element containing player-progress class
      var song_seek=(event.pageX-event.target.offsetLeft)/seek[0].clientWidth;
      $('.progress-filled').css("width", song_seek+"%");
      song.currentTime=song.duration*song_seek;
  })

  //Change volume using slider
      var vol=document.querySelector('audio');
      vol.volume=1;   //Initially 100% volume
      $('#vol_filled').css("width",vol.volume*100+"%");
      $('#vol_slider').on('click',function(event){
          var song=document.querySelector('audio');
          var song_seek=(event.pageX-event.target.offsetLeft)/event.currentTarget.clientWidth;
          $('#vol_filled').css("width", song_seek*100+"%");
          song.volume=song_seek;
      })



    //initially first song and album ka name show hoga
      card_list();
      song_list();
      dataRender();
      $('.dataTables_filter').addClass('hidden');

      setInterval(function(){
          updateCurrTime();
      },1000);    //Update current time of second after 1 second


  $('.welcome-screen button').on('click', function() {
      var name = $('#name-input').val();
      var email = $('#email-input').val();
      var pwd = $('#pwd-input').val();
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
          toggleSong();
          });

      $('body').on('keypress', function(event) {
          //'event' object ka target jiska tagName "INPUT" hai uspe event lgana
          if (event.keyCode == 32 && event.target.tagName!="INPUT") {
              toggleSong();
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
      for(var j=0; j<totalPlaylist; j++){
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
      for(var j=0; j<totalPlaylist; j++){
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
      for(var j=0; j<totalPlaylist; j++){
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
      for(var j=0; j<totalPlaylist; j++){
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
      for(var j=0; j<totalPlaylist; j++){
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
}
