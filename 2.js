// 创建画布
var canvas = document.createElement ("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 949;
canvas.height = 700;
document.body.appendChild(canvas);

// 图片导入
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";


var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.gif";


var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.gif";

var bulletReady = false;
var bulletImage = new Image();
bulletImage.onload = function () {
    bulletReady = true;
};
bulletImage.src = "images/bullet.jpg";

// 速度设定
var hero = {
    speed: 260
};
var monster = {
    speed:230
};
var bullet={
    speed:700
}
var monstersCaught = 0;
var herodead=0;

// 监听器设置
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e["keyCode"]] = true;
}, false);


addEventListener("keyup", function (e) {
    delete keysDown[e["keyCode"]];
}, false);

// 游戏开场设定
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    bullet.x=canvas.width+20;
    bullet.y=canvas.height+20;



    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// 键位设置
var update = function (modifier) {
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) {
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) {
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) {
        hero.x += hero.speed * modifier;
    }
    if(87 in keysDown){
        monster.y-=monster.speed*modifier;
    }
    if (83 in keysDown) {
        monster.y += monster.speed * modifier;
    }
    if (65 in keysDown) {
        monster.x -= monster.speed * modifier;
    }
    if (68 in keysDown) {
        monster.x += monster.speed * modifier;
    }
    if (32 in keysDown) {
        bullet.x=monster.x;
        bullet.y=monster.y;
    }


    function fire() {
        bullet.x += bullet.speed * modifier;
    }
    onmousedown=fire();


// 胜利条件判定
    if (
        hero.x <= (monster.x + 47)
        && monster.x <= (hero.x + 72)
        && hero.y <= (monster.y + 80)
        && monster.y <= (hero.y + 102)
    ) {
        ++monstersCaught;
        reset();
    }
    if (
        hero.x <= (bullet.x + 24)
        && bullet.x <= (hero.x + 38)
        && hero.y <= (bullet.y + 40)
        && bullet.y <= (hero.y + 35)


    ) {
        ++herodead;
        reset();
    }


};


// 在画布上显示渲染
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    if (bulletReady) {
        ctx.drawImage(bulletImage, bullet.x,bullet.y);
    }


    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Gremlin caught: " + monstersCaught, 32, 32);
    ctx.fillText("Halberdier dead: " + herodead, 32, 60);


};

// 游戏本体场次循环
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

// 浏览器兼容性
    requestAnimationFrame(main);
};




var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//调用方法
var then = Date.now();
reset();
main();
