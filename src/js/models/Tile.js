
import { Puyo } from '@models/Puyo';
import { config } from '@config';

export class Tile {
  constructor  (x,y) {
    this.x = x;
    this.y = y;
    this.puyo = null;
    this.board = null;
  }

  add (puyo) {
    this.puyo = puyo; 
  }

  linkBoard (board) {
    this.board = board
  }
}