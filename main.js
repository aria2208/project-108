prediction_1=""
prediction_2=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach('camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
          document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_uri+'" />';
    });
}
 
console.log('ml5.version:',ml5.version);

classifier =ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WOIe6Hqzn/model.json', modelLoaded);

function  modelLoaded(){
console.log('modelLoaded');
}

function check(){
    img=document.getElementById('capture_img');
    classifier.classify(img, got_result);

}

function speak(){
    var synth= window.speechSynthesis;
    speak_data_1="first prediction"+prediction_1;
    speak_data_2="second prediction"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function got_result(error , results){
    if(error){
       console.error(error);
       console.log("error");
    }
    else{
        console.log(results);
        document.getElementById("emotion_type1").innerHTML=results[0].label;
        document.getElementById("emotion_type2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label== "NO"){
            document.getElementById("update_emoji1").innerHTML= "&#128400";
            console.log("happy");
        }
        else if(results[0].label=="PERFECT"){
            document.getElementById("update_emoji1").innerHTML="&#128076";
        }
        if(results[0].label=="LITTLE"){
            document.getElementById("update_emoji1").innerHTML="🤏";
        }
       else if(results[1].label=="NO"){
            document.getElementById("update_emoji2").innerHTML="&#128400";
        }
        if(results[1].label=="PERFECT"){
            document.getElementById("update_emoji2").innerHTML="&#128076";
        }
       else if(results[1].label=="LITTLE"){
            document.getElementById("update_emoji2").innerHTML="🤏";
        }
      }
  }

