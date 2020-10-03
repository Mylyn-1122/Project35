//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;
var fedTime, lastFed;
var foodObj;
var lastStocked;
var lastFed;


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

  foodObj = new Food();

  var feedPet = createButton('Feed the Pet')
  feedPet.position(700, 95);
  feedPet.mousePressed(feedDog);

  var addFood = createButton('Add Food')
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(color(46, 139, 87))



  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  foodObj.display();

  //console.log(foodStock)

  drawSprites();
  //add styles here
  fill(255);
  stroke(20);
  text("Food Stock" + ":" + foodStock, 400, 100)

  textSize (15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  }
  else if(lastFed === 0){
    text("last feed : 12 AM", 350, 30)
  }
  else{
    text("Last Feed : " + lastFed + " AM", 350, 30)
  }

}

function readStock(data){
  Food = data.val()
  foodStock = Food
}

function feedDog(){
  dog.addImage(happyDog);

  foodStock = foodStock - 1;
  
  database.ref('/').update({
    Food : foodStock,
    FeedTime : hour()
  })
}

function addFoods(){
  foodStock ++;
  database.ref("/").update({
    Food : foodStock
  })
}
