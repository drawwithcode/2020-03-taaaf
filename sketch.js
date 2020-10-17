let mySong;
let dataDeaths;
let myPersonalCorpses = [];


function preload() {

  mySong = loadSound("./assets/music/rain.mp3");

  dataDeaths = loadJSON("VSRR_Provisional_Drug_Overdose_Death_Counts.json");

}


function setup() {

  createCanvas(windowWidth, windowHeight);
  //
  // console.log(mySong);

  mySong.loop();

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  // console.log(dataDeaths.deaths.length);
  //
  //
  // console.log(myPersonalCorpses.lenght);

  addCorpse();

}


function draw() {

  background(255);

  let volume = 0;

  volume = analyzer.getLevel();

  volume = map(volume, 0, 1, 0, 0.008);

  push();

  for (let i = 0; i < myPersonalCorpses.length; i++) {

    translate(0, volume);

    myPersonalCorpses[i].run();

  }

  pop();

  push()
  noStroke();
  fill(255, 255, 255, 180);
  rect(0, 0, 210, 65);
  pop();

  push()
  noStroke();
  fill(0);
  ellipse(20, 20, 33);
  pop();

  text("= 1000 Drug Overdose Deaths", 40, 23);
  text("(USA from 2015 to 2020)", 50, 33);

  text("click to make them dance", 33, 55);


  // console.log(volume);
  //

}


function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  // for(let i = 0; i < myPersonalCorpses.length; i++){
  //
  //   myPersonalCorpses[i]=0;
  //
  //
  // }

  for (let i = myPersonalCorpses.length - 1; i >= 0; i--) {

    // myPersonalCorpses.splice(i, 1);

    // console.log(myPersonalCorpses[i]);

    myPersonalCorpses[i].resizeWin();



  }

  // addCorpse();

}



let a = 0;

function mouseClicked() {

  if (a == 0) {

    mySong.play();

  }

  a++;

  let b = int(random(myPersonalCorpses.length));

  myPersonalCorpses[b].clicked();

}


let x, y;
//


function addCorpse() {

  //
  //
  // console.log(dataDeaths.deaths.length);

  // if(a==0){



  for (let i = 0; i < dataDeaths.deaths.length; i++) {

    if (dataDeaths.deaths[i].Indicator == "Number of Drug Overdose Deaths" && dataDeaths.deaths[i].State != "US") {

      let size = dataDeaths.deaths[i]["Data Value"] / 60;

      // let size = dataDeaths.deaths[i]["Data Value"];

      //
      // console.log(size);

      const newCorpse = new Corpse(random(0, width), random(0, height), size / 2, random(200), 100);

      myPersonalCorpses.push(newCorpse);

    }

  }


  //
  // }else{
  //
  //
  //   for (let i = 0; i < dataDeaths.deaths.length; i++) {
  //
  //     if(dataDeaths.deaths[i].Indicator == "Number of Drug Overdose Deaths" && dataDeaths.deaths[i].State !="US"){
  //
  //       let size = map(dataDeaths.deaths[i]["Data Value"], 0, 3000, 0, 50);
  //
  //       // let size = dataDeaths.deaths[i]["Data Value"];
  //
  //
  //       console.log(size);
  //
  //       const newCorpse = new Corpse(random(0,width),random(0,height),size/2,random(1,200));
  //
  //       myPersonalCorpses[i]=newCorpse;
  //
  //
  //
  //
  //
  //
  //
  //
  // }
  //
  //
  // a++;

}



class Corpse {

  constructor(x, y, radius,color,p) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.p = p;

  }

  clicked(){

      this.color = "yellow";
      this.p = 5;

    }


  display(p) {

    push();
    noStroke();
    fill(this.color);

    translate(random(0, this.radius) / this.p, random(0, this.radius) / this.p);

    console.log(p);

    ellipse(this.x, this.y, this.radius * 2);
    pop();

  }

  resizeWin(){

    this.x = random(0, width);
    this.y = random(0, height);

  }


  run(p) {

    this.display(p);

  }

}
