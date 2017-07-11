var instrument=0;	//initially set id=0, eh piano di hai
$('#keyboard').on('click', function(){
    instrument=0;
})

$('#organ').on('click', function(){
    instrument=1;	//instrument = organ
})

$('#guitar').on('click', function(){
    instrument=2;	//instrument = acoustic guitar
})

$('#edm').on('click', function(){
    instrument=3;	//instrument = edm
})

//array of objects of note and octave, click or keyboard event isko trigger krke note and octave ki value se sound play krega
var music=[
        {'note': 'C', 'octave':'3'},{'note': 'D', 'octave':'3'},{'note': 'E', 'octave':'3'},
        {'note': 'F', 'octave':'3'},{'note': 'G', 'octave':'3'},{'note': 'A', 'octave':'3'},
        {'note': 'B', 'octave':'3'},{'note': 'C', 'octave':'4'},{'note': 'D', 'octave':'4'},
        {'note': 'E', 'octave':'4'},{'note': 'F', 'octave':'4'},{'note': 'G', 'octave':'4'},
        {'note': 'A', 'octave':'4'},{'note': 'B', 'octave':'4'},{'note': 'C', 'octave':'5'},
        {'note': 'D', 'octave':'5'},{'note': 'E', 'octave':'5'},{'note': 'F', 'octave':'5'},
        {'note': 'G', 'octave':'5'},{'note': 'A', 'octave':'5'},{'note': 'B', 'octave':'5'},
        {'note': 'C#', 'octave':'3'},{'note': 'D#', 'octave':'3'},{'note': 'F#', 'octave':'3'},
        {'note': 'G#', 'octave':'3'},{'note': 'A#', 'octave':'3'},{'note': 'C#', 'octave':'4'},
        {'note': 'D#', 'octave':'4'},{'note': 'F#', 'octave':'4'},{'note': 'G#', 'octave':'4'},
        {'note': 'A#', 'octave':'4'},{'note': 'C#', 'octave':'5'},{'note': 'D#', 'octave':'5'},
        {'note': 'F#', 'octave':'5'},{'note': 'G#', 'octave':'5'},{'note': 'A#', 'octave':'5'}        
]

//jab pressed() trigger hoga vo es array ki help se id select krega jisse blink krvana
var music_id=['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','w11','w12',
              'w13','w14','w15','w16','w17','w18','w19','w20','w21','b1','b2','b3',
              'b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15'
]

//sound play krne ke liye jab keyboard use hoga to vo iski help se check krega k konsi sound play krni hai
var key_id=['q','w','e','r','t','y','u','i','o','p','[',']',
            'z','x','c','v','b','n','m',',','.',
            '2','3','5','6','7','9','0','=',
            'a','s','f','g','j','k','l'
]

//to play sound using click event
$('body').on('click', function(event){
    var id =event.target.id;	//jis button pe click kiya uski 'div id' variable me store hoggi 
    for(var i=0; i<music.length; i++){
        if(music_id[i]==id){	//music_id array se check krega k 'div id' valid hai k nahi 
            break;	//aggr valid hui 'id' toh break ki help se 'i' ki value pta lg jayegi
        }
        
    }
    // 'i' ki value use krke arrays me se note and octave ki value select krni hai
    Synth.play(instrument, music[i].note, music[i].octave, 2);	
    pressed(i);	//'i' ki value use krke find kro konse button ko blink krna hai
    
})

$('body').on('keypress', function(event){
    var id=event.key;
    for(var i=0; i<key_id.length;i++){
        if(id==key_id[i]){	// yeh key ko array se match krega
            break;	// 'i' ki value milli
        }

    }
    // 'i' ki value use krke arrays me se note and octave ki value select krni hai
    Synth.play(instrument, music[i].note, music[i].octave, 2);
    pressed(i);	//'i' ki value use krke find kro konse button ko blink krna hai
})


//function ke sath buttons pe Unka Note and keyboard button ki value show krni hai
function white_keys(){
    var keys=['C3','D3','E3','F3','G3','A3','B3',
              'C4','D4','E4','F4','G4','A4','B4',
              'C5','D5','E5','F5','G5','A5','B5'];
    var press=['Q','W','E','R','T','Y','U',
               'I','O','P','[',']','Z','X',
               'C','V','B','N','M',',','.'
               ];
    for(var i=0; i<keys.length; i++){
        var id='#w'+(i+1);	//eg if i=0, id=w1 
        $(id).find('.keyHead').text(press[i]);
        $(id).find('.keyFoot').text(keys[i]);
    }    
}

function black_keys(){
    var keys=['C3#','D3#','F3#','G3#','A3#',
              'C4#','D4#','F4#','G4#','A4#',
              'C5#','D5#','F5#','G5#','A5#'];
    var press=['2','3','5','6','7',
               '9','0','=','A','S',
               'F','G','J','K','L'];
    for(var i=0; i<keys.length; i++){
        var id='#b'+(i+1);
        $(id).find('.keyHead').text(press[i]);
        $(id).find('.keyFoot').text(keys[i]);

    }    
}

//when key press hoga, us key ko blink krne ke liye
function pressed(i){
    $('#'+music_id[i]).addClass('pressed');
        setTimeout(function(){
            $('#'+music_id[i]).removeClass('pressed');
        },200);

}


window.onload= function(){

for(var i=0; i<21;i++){
      var white_key=$('<div class="white key" id="w'+(i+1)+'">'
                    +'<div class="label">'
                    +'<h4 class="keyHead"></h4>'
                    +'<h4 class="keyFoot"></h4>'
                    +'</div>'
                    +'</div>')
      $('#piano').append(white_key);
    }

    for(var i=0; i<15;i++){
      var black_key=$('<div class="black key" id="b'+(i+1)+'">'
                    +'<div class="label">'
                    +'<h4 class="keyHead"></h4>'
                    +'<h4 class="keyFoot"></h4>'
                    +'</div>'
                    +'</div>')
      $('#piano').append(black_key);
    }
	white_keys();	//onload pe white keys and black keys ke note and keyboard key show krni
    black_keys();
}