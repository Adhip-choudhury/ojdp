object_status="";
objects=[];



function preload(){
    img=loadImage('dog_cat.jpg');
}


function setup(){
  canvas=createCanvas(500, 400);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(500,400)
  video.hide();
}


function draw(){
    image(video, 0,  0, 500, 400);
    if(object_status != ""){
      objectDetector.detect(video, gotRuselt); 
      for(var i = 0; i <= objects.length; i++){
      document.getElementById("status").innerHTML="Status: detected objects";
      document.getElementById("Number_of_objects").innerHTML="Number of objects are there is "+objects.length;
      // fill("red");
      // text(objects[i].label, objects[i].x+15, objects[i].y+10);
      fill("#FF0000"); 
      percent = floor(objects[i].confidence * 100); 
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      }
    }     
  }

      
    

      function modelLoaded(){
        console.log("Model is loaded......");
        object_status=true;
    }
    

    function start(){
        objectDetector=ml5.objectDetector("cocossd", modelLoaded);
      document.getElementById("status").innerHTML="Status: detecting objects";
    }



    function gotRuselt(error, results){
      if(error){
        console.error(error);
      }
      else{
        console.log(results);
        objects=results;
      }
    }