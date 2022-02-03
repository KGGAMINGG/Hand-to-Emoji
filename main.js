prediction_1 = "";
prediction_2 = "";

Webcam.set({
width: 350,
Height: 300,
image_format : 'png',
png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){

    Webcam.snap(function (data_uri) {
document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });

    
}
console.log('ml5 version', ml5.version);

classifer = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qfB39fd_g/model.json', modelLoaded);

function modelLoaded(){
console.log('Model Loaded (Hand Loaded) (L0L');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first (1) prediction is" + prediction_1;
    speak_data_2 = "And the second (2) prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {

    img = document.getElementById('captured_image');
    classifer.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name1").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        speak();
        if (result[0].label == "thumbs up") {
            document.getElementById('update_emoji').innerHTML = "&#128077;"
        }

        if (result[0].label == "peace") {
            document.getElementById('update_emoji').innerHTML = "&#9996;"
        }

        if (result[0].label == "Hand") {
            document.getElementById('update_emoji').innerHTML = "&#128075;"

        }

        if (result[1].label == "thumbs up") {
            document.getElementById('update_emoji1').innerHTML = "&#128077;"
        }

        if (result[1].label == "peace") {
            document.getElementById('update_emoji1').innerHTML = "&#9996;"
        }

        if (result[1].label == "Hand") {
            document.getElementById('update_emoji1').innerHTML = "&#128075;"

        }
    }
}