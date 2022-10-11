var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'cat.png';

var dino = {
    x : 5,
    y : 100,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img2, this.x,this.y)
    }
}

var img1 = new Image();
img1.src = 'bear.png';


class Cactus {
    constructor() {
        this.x = 1000;
        this.y = 100;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1, this.x,this.y)
    }
}
// var cactus = new Cactus();
// cactus.draw();

var timer = 0;
var cactusmore = [];
var jumptimer = 0;
var animation;

function frameimplement() {
    animation = requestAnimationFrame(frameimplement)
    timer++;
    ctx.clearRect(0,0, canvas.width,canvas.height);

    if(timer % 200 === 0){
    var cactus = new Cactus();
    cactusmore.push(cactus);
    }

    cactusmore.forEach((a,i,o)=>{
        //x<0 delete
        if (a.x < 0){
            o.splice(i,1)
        }
        a.x--;

        collision(dino,a);

        a.draw();
    })
    
    // jumping skill
    if (jumping == true){
        // dino.y--;
        dino.y -= 4;
        jumptimer++;
    }
    if (jumping == false){
        if(dino.y < 200){
            // dino.y++;
            dino.y += 3;
        }
    }
    if (jumptimer > 50){
        jumping = false;
        jumptimer = 0
    }
    dino.draw()
}

frameimplement();



// Collision check
function collision(dino,cactus){
    var xdiffer = cactus.x - (dino.x + dino.width);
    var ydiffer = cactus.y - (dino.y + dino.height);
    if (xdiffer < 0 && ydiffer < 0){
        ctx.clearRect(0,0, canvas.width,canvas.height);
        cancelAnimationFrame(animation)
    }
}

var jumping = false;
document.addEventListener('keydown',function(e){
    if (e.code === 'Space'){
        jumping = true;
    }
})