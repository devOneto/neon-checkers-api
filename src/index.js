let mr = 10; // margem de respiro
let lc = 60; // lado da casa
let song, analyzer, eq, fft;
let eqBandNames = ['A', 'B', 'C','D','E','F','G','H'];
let media;

function preload() {
  song = loadSound('../assets/eb2.mp3');
}

function setup() {
  createCanvas(500,500);
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  //create a Equalizer
  eq = new p5.EQ(eqBandNames.length);
  //
  song.disconnect();
  eq.process(song);

  fft = new p5.FFT();
  
  song.loop();

  console.log(eq.bands)

}

function draw() {
  background(30);

  media = fft.analyze().reduce(function (a,b) {return a+b}) / 96;
  if(media>255){media=media/2}
  // eq.bands[5].gain(40);
  // eq.bands[5].gain(-30);

  let rms = analyzer.getLevel()*5;
  let r = media
  let g = 0
  let b = 0

  //desenhar casas pares
  fill(r,g,b)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      
      if(j%2!=0){
        rect(70+i*2*lc,10+j*lc,lc,lc)
      }else{
        rect(10+2*i*lc,10+j*lc,lc,lc)
      }
    }
  }
  fill(255)

  //desenhar casas ímpares
  fill(30,30,30)
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      if (j % 2 == 0) {
        rect(70+i*2*lc,10+lc*j,lc,lc)
      }else{
        rect(10+i*2*lc,10+lc*j,lc,lc)
      }
    }
  }

  fill(255)

//Equalizer
// for(i = 0; i < 99; i++){
//   y = 400-fft.analyze()[i];
//   rect(5*i+5,y,2.5,2.5)
// }

// media = fft.analyze().reduce(function (a,b) {return a+b}) / 96
// line(0,400-media,800,400-media)

// fill(media,100 ,100)
// rect(10,10,20,20)

}

function mouseClicked(){
  console.log(fft.analyze())
  media = fft.analyze().reduce(function (a,b) {return a+b}) / 96
  console.log(media)
  
}