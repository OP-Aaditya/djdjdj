song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;



function preload(){
    song=loadSound("pirate.mp3");
}



function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose' , gotPoses);
}


function modelLoaded(){
    console.log("poseNet is Initialized");
}


function gotPoses(results){
    if(results.length > 0 ){
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist + "scorerightWrist = " + scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWrist X = " + leftWristX + " LeftWrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWrist X = " + rightWristX + " RigthWrist Y = " + rightWristY);
    }
}



function draw(){
    image(video , 0 , 0 , 600 , 500);
    fill('#FF0000');
    stroke('#FF0000');
    circle(rightWristX , rightWristY , 20 );
if(scorerightWrist > 0.2){
    if(rightWristY > 0  && rightWristY <= 100){
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = " Speed = 1x";
        song.rate(1);
    }
    if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = " Speed = 1.5x";
        song.rate(1.5);
    }
    if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = " Speed = 2x";
        song.rate(2);
    }
    if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = " Speed = 2.5x";
        song.rate(2.5);
    }
}

if(scoreleftWrist > 0.2)
{
    circle(leftWristX , leftWristY , 20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML= "Volume - " + volume;
song.setVolume(volume);
}
}