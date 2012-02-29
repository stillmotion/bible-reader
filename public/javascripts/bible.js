  var inTensPosition = false;
  var inHundredsPosition = false;
  
function play_audio (verse) {
    console.log("Play verse " + verse);
  var audioUrl = "http://audio.esvonline.org/hw/" + verse,
      audio = $('<audio />', {
        src: audioUrl,
        controls: false,
        autoplay: false,
        preload: 'auto',
        autobuffer: true,
        'class': 'current_audio'
      });

  $('body').append(audio);
  var a = document.getElementsByTagName("audio")[0];
  a.addEventListener("ended", function(evt) {
    console.log("Ended... " + verse);
    evt.target.parentNode.removeChild(evt.target);

    var nextVerse = 0;
    if (inTensPosition){
    console.log("In ten's position with verse " + verse);
    nextVerse = Number(verse.charAt(verse.length -2)+verse.charAt(verse.length -1)) + 1;
    console.log("In ten's position with nextVerse " + nextVerse);
    }
    else if(inHundredsPosition){
        console.log("In hundred's position with verse " + verse);
nextVerse = Number(verse.charAt(verse.length-3)+verse.charAt(verse.length-2)+verse.charAt(verse.length-1)) + 1;
    }
    else{
        nextVerse = Number(verse.charAt(verse.length-1)) + 1;
    console.log(verse + " " + nextVerse);
    }
    if (nextVerse === 10){
        inTensPosition = true;
        console.log("Next verse is 10 " + nextVerse);
    }
    if (nextVerse === 100){
        inTensPosition = false;
        inHundredsPosition = true;
    console.log("Next verse is 100 " + nextVerse);

    }
    if (nextVerse <= (document.getElementsByClassName("verse-num").length)){
    console.log("Still more verses");
        if (inTensPosition && !inHundredsPosition){
        
            nextVerse = verse.slice(0, -2) + nextVerse;
                        console.log("About to play " + nextVerse);

            play_audio(nextVerse);
        }
        else if(inHundredsPosition && !inTensPosition){
            console.log("Next verse is " + nextVerse);

            nextVerse = verse.slice(0, -3) + nextVerse;
                console.log("Next verse is " + nextVerse);

            play_audio(nextVerse);
        }
        else{
            nextVerse = verse.slice(0, -1) + nextVerse;
            console.log("About to play " + nextVerse);
            play_audio(nextVerse);
        }
    }
  }, true);
  a.play();
  console.log("We are in tens position " + inTensPosition + " hundreds " + inHundredsPosition + " " + a.src);
}

$(document).ready(function() {
  var cleanVerse = /^p([0-9]+).[0-9]+\-[0-9]$/,
      verseMatch = cleanVerse.exec($('.esv-text :first-child:first').attr('id')),
      verse      = verseMatch[1];

  if (verse) {
    play_audio(verse);
  }
});