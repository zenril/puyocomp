import { Board } from '@models/Board';
import { Ticker } from '@models/Ticker';
import { config } from '@config';

var ticker  = new Ticker();
var board = Board.instance();


function moveTile (tile) {
  if (tile && tile.puyo) {
    if(tile.y + 1 <= config.board.height){
      var tile2 = board.tile(tile.x, tile.y + 1);
      if(!tile2.puyo) {
        tile2.puyo = tile.puyo;
        tile.puyo = null;
        
        tile2.puyo.x = tile2.x;
        tile2.puyo.y = tile2.y;
      }
    }
  }
}

ticker.tick(function(){
  var tileSize = board.getTileSize();

  background(0); 
  if(!board.dropping) {
    board.spawn();
  }

  board.loopTiles(function(tile){
    fill(255);
    window.rect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
    if(tile.puyo) {
      fill(255, 204, 0);
      window.ellipse(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
      
      moveTile(tile);

    }
  })
});



window.windowResized = function() {
  board.canvasWidth = windowWidth;
  board.canvasHeight = windowHeight;

  resizeCanvas(windowWidth, windowHeight);
}


window.setup = function(){
  ellipseMode(CORNER);
  board.canvasWidth = windowWidth;
  board.canvasHeight = windowHeight;

  createCanvas(windowWidth, windowHeight);
  ticker.start();

}


