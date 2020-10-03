

class Food{
    constructor(){
        
        this.getFoodstock;
        this.updateFoodStock;
        this.deductFood;
        this.image = loadImage("images/Milk.png");

    }

    display(){
        var x=80;
        var y = 30;

        imageMode(CENTER);

        if(this.foodStock !== 0){
            for(var i=0; i<foodStock; i++){
                if(i%1 === 0){
                    x = 80;
                    y=y+20;
                }
                image(this.image, x, y, 50, 50);
                x=x+10;
            }
        }
    }
}