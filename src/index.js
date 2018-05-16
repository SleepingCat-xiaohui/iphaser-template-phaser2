import 'pixi'
import 'p2'
import Phaser from 'phaser'

import TestState from './states/test'

class Game extends Phaser.Game {
  constructor () {
    super(300, 300, Phaser.AUTO, 'content')
    this.state.add('test', TestState, true)
  }
}

let game = new Game() // eslint-disable-line
