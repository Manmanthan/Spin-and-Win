// How to create the basic skeleton for the game -> Game Loop
let prize_config = {
    count: 12,
    prize_names: ["1 Lakh rupees will be added to your bank","2 Lakh rupees will be added to your bank","3 Lakh rupees will be added to your bank","4 Lakh rupees will be added to your bank","5 Lakh rupees will be added to your bank","6 Lakh rupees will be added to your bank","7 Lakh rupees will be added to your bank","8 Lakh rupees will be added to your bank","9 Lakh rupees will be added to your bank","10 Lakh rupees will be added to your bank","11 Lakh rupees will be added to your bank","12 Lakh rupees will be added to your bank",]
}

let config = {
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    // Load images
    this.load.image('background','Assets/back.jpg');
    this.load.image('wheel','Assets/wheel.png');
    this.load.image('pin','Assets/pin.png');
    this.load.image('stand','Assets/stand.png');
}

function create(){
    console.log("Create");
    // Create images
    let W = game.config.width;
    let H = game.config.height;
    
    // Create background
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
    //Create stand
    let stand = this.add.sprite(W/2,H/2+260,"stand");
    stand.setScale(0.25);
    
    // Create Spin wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.5);
    
    // Create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    
    // Event Listeners
    this.input.on("pointerdown", spinwheel, this);
    
    // Text Object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red", 
    }
    this.game_text = this.add.text(10,10,"Welcome to spin and win", font_style);
}

// Game loop
function update(){
    console.log("Update");
    
//    this.wheel.angle += 1;
}

function spinwheel(){
    console.log("Mouse Clicked");
    this.game_text.setText("You clicked the mouse");
    
    let rounds = Phaser.Math.Between(2,4);
    let degree = Phaser.Math.Between(0,11)*30;
    
    let prize_idx = prize_config.count - 1 - Math.floor(degree/(360/prize_config.count));
    
    let total_angle = rounds*360 + degree;
    console.log(total_angle);
    tween = this.tweens.add({
        targets:this.wheel,
        angle: total_angle+15,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete: function(){
            this.game_text.setText("You won. " + prize_config.prize_names[prize_idx]);
        }
    });
}











