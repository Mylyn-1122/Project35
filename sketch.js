//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  database = firebase.database();
  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImg)
  dog.scale = 0.25;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock)

}


function draw() {  
  background(color(46, 139, 87))

  if(keyDown("Up")){
    writeStock(foodStock);
    dog.addImage(happyDog);
  }
  else{
    dog.addImage(dogImg)
  }

  console.log(foodStock)

  drawSprites();
  //add styles here
  fill(255);
  stroke(20);
  text("Food Stock" + ":" + foodStock, 400, 100)

}

function readStock(data){
  Food = data.val()
  foodStock = Food
}

function writeStock(ob1){
  if(ob1 <= 0){
    ob1=0;
  }
  else{
    ob1 = ob1 - 1
  }
  database.ref("/").set({
    Food : ob1
  })
}