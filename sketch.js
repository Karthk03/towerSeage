
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var world, engine;
var block = [], blockArrPos = -1;
var minVal = 600, maxVal = 900;
var polygon, string, plygonImg;
var ground;

function preload() 
{
    plygonImg = loadImage("polygon.png")
}

function setup()
{
    var canvas = createCanvas(1200,700);

    engine = Engine.create();
    world = engine.world;

    for(let y=400; y>=100; y-=70)
    {
        for(let x=minVal; x<=maxVal;x+=50)
        {
            blockArrPos++;
            block[blockArrPos] = new Block(x,y);
            //console.log(block[blockArrPos]);
        }
        minVal+=50;
        maxVal-=50;
    }

    platform = new Platform(750,460,400,20);

    var optionP = 
    {
        'restitution':0.8,
        'friction':1.0,
        'density':0.5,
        'isStatic': true
    }
    
    ground = Bodies.rectangle(600,675,1200,50,{'isStatic': true});

    Matter.World.add(world,ground);

    polygon = Bodies.circle(100, 200, 50, optionP)

    Matter.World.add(world,polygon);

    console.log(polygon);

    string = new Slingshot(polygon, {x: 200,Y: 100});

    //Engine.run(engine);
}

function draw()
{
    background(0);

    Engine.update(engine);

    imageMode(CENTER); 
    image(plygonImg,polygon.position.x,polygon.position.y,100,100);

    for(let i = blockArrPos; i>=0; i--)
    {
        //console.log(i);
        block[i].display();
    }

    platform.display();

    string.display();

    rectMode(CENTER);
    rect(ground.position.x,ground.position.y,1200,50);
}

function keyPressed()
{
    if(keyCode == 32)
    {
        //Matter.Body.setStatic(polygon,false);

        string.launch();
    }

    if(keyCode == 38)
    {
        Matter.Body.setPosition(polygon,{x: 100, y: 50});
    }
}