import { config } from '@config';
import { Puyo } from '@models/Puyo';
import { Tile } from '@models/Tile';

export class Board {

  constructor() {
    this.width = config.board.width;
    this.height = config.board.height;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.grid = [];
    this.dropping = null;

    //make build board;
    for (let x = 0; x < this.width; x++) {

      //create x  row
      if (!this.grid[x]) this.grid[x] = []
      for (let y = 0; y < this.height; y++) {

        //create x a nd y and tile
        if (!this.grid[x][y]) {
          var tile = this.grid[x][y] =  new Tile(x,y);
          tile.linkBoard(this);
        }
      }
    }
  }

  getTileSize(){
    return this.canvasHeight / this.height;
  }

  spawn() {
    //randomize x position
    var x = this.width * Math.random() << 0,

      //y position
      y = 1,

      //figure out x2 position
      x2 = x > this.width / 2 ? x - 1 : x + 1,

      y2 = y - 1,

      //will it be vertical alignment
      vertical = Math.random() * 2 << 0,

      //create Puyo1
      puyo1 = Puyo.createPuyo(x, y);

      if(vertical) {
        x2 = x;
      } else {
        y2 = y;
      }

      //create puyo2
      var puyo2 = Puyo.createPuyo(
        vertical ? x : x2,
        vertical ? y2 : y
      );

      this.dropping = [
        puyo1,
        puyo2
      ];

      this.tile(x,y).add(puyo1);
      this.tile(x2,y2).add(puyo2);
  }

  tile (x, y) {
    return this.grid[x][y];
  }

  loopTiles (cb) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        cb.apply(this.tile(x, y), [this.tile(x,y), x,y]);
      }
    }
  }

  //create instance
  static instance() {
    if (!Board._instance) {
      Board._instance = new Board()
    }
    return Board._instance;
  }
}