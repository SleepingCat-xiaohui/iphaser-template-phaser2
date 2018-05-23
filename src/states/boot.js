import Phaser from 'phaser'

export default class Boot extends Phaser.State {
  preload () {
    this.load.spritesheet('pet', './assets/test.png', 34, 68)
  }

  create () {
    let pet = this.add.sprite(300, 160, 'pet')
    pet.anchor.setTo(0.5)
    pet.animations.add('jump', null, 10, true).play()

    this.add.text(300, 200, `Hello World`, {
      font: '20px Courier',
      fill: '#fff000',
    }).anchor.setTo(0.5)
  }
}
