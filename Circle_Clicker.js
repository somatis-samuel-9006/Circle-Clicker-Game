
var points = 0;
document.getElementById('pointvalue').innerHTML = points;   //displays points
var documentHeight = document.documentElement.clientHeight -150;    //prevent vertical scroll & circles covering title/points
var documentWidth = document.documentElement.clientWidth -100;  //prevent horizontal scroll

function makeCircle(){
    var xPosition = Math.floor(Math.random() * documentWidth);   //random coordinates
    var yPosition1 = Math.floor(Math.random() * documentHeight);

    var circle = document.createElement('div');     //circle properties
    circle.style.bottom = yPosition1 + "px";
    circle.style.left = xPosition + "px";
    circle.onclick = targetHit;

    document.body.appendChild(circle);

    let animation = anime({
        targets: 'div',
        duration: 3000,
        width: 90,
        height: 90,
        easing: 'linear',           //make it look clean
        complete: function(anim){   //remove element after animation
            circle.remove();
        }
    }); 
}
function targetHit(){           //when you click a circle
    circle = this;              //this = element recieving the onclick event
    circle.remove();
    points++;
    document.getElementById('pointvalue').innerHTML = points;

    if(points > 9 && points <= 99){
        document.getElementById('points').style.right = 55 +'px';       //format points output with bigger point values
    } 
    if(points > 99){
        document.getElementById('points').style.right = 60 + 'px';
    }
    

}
function sendScore(){       //Send score to server
    console.log('starting');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("recieved confimation");
        }
    };   
    console.log("save requested");
    
    xhttp.open("POST", "", true);
    xhttp.send("Score="+points);
}
function main(){
    setInterval(makeCircle, 1000);   //Do this every 1 second.
}
main();