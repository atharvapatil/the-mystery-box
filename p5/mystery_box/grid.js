function Grid(locX, locY) {

  this.x = locX;
  this.y = locY;
  this.display = function() {

    noStroke();

    if (switch1 == 0) {
      fill(c1);
      triangle(this.x, this.y, this.x + (boxSize / 2), this.y, this.x, this.y + (boxSize / 2));
    }

    if (switch1 == 1) {
      fill(c1);
      triangle(this.x+ (boxSize / 2), this.y+ (boxSize / 2), this.x + (boxSize / 2), this.y, this.x, this.y + (boxSize / 2));
    }




    if (switch2 == 0) {
      fill(c1);
      triangle(this.x + (boxSize / 2), this.y, this.x + (boxSize), this.y, this.x + (boxSize / 2), this.y + (boxSize / 2));
    }

    if (switch2 == 1) {
      fill(c1);
      triangle(this.x + (boxSize), this.y + (boxSize / 2), this.x + (boxSize), this.y, this.x + (boxSize / 2), this.y + (boxSize / 2));
    }


    if (switch3 == 0) {

      triangle(this.x, this.y + (boxSize / 2), this.x + (boxSize / 2), this.y + (boxSize / 2), this.x, this.y + (boxSize));
    }

    if (switch3 == 1) {
      fill(c1);
      triangle(this.x + (boxSize / 2), this.y + (boxSize), this.x + (boxSize / 2), this.y + (boxSize / 2), this.x, this.y + (boxSize));
    }

    if (switch4 == 0) {
      fill(c1);
      triangle(this.x + (boxSize / 2), this.y + (boxSize / 2), this.x + (boxSize), this.y + (boxSize / 2), this.x + (boxSize / 2), this.y + (boxSize));
    }

    if (switch4 == 1) {
      fill(c1);
      triangle(this.x + (boxSize), this.y + (boxSize), this.x + (boxSize), this.y + (boxSize / 2), this.x + (boxSize / 2), this.y + (boxSize));
    }


    if (switch5 == 0) {
      c1=color(255, 255, 255, 10);
      //ellipse(this.x + boxSize / 2, this.y + boxSize / 2, 20, 20);
      //ellipse(this.x + boxSize / 2, this.y + boxSize / 2, 5, 5);
    }


    if (switch5 == 1) {
      c1=color(0, 99, 10, 50);
      //ellipse(this.x + boxSize / 2, this.y + boxSize / 2, 20, 20);
      //ellipse(this.x + boxSize / 2, this.y + boxSize / 2, 5, 5);
    }


}
