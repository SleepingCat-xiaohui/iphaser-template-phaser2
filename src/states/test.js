import Phaser from 'phaser'

export default class extends Phaser.State {
  preload () {
    this.load.spritesheet('heros', 'assets/ff-sprites.png', 36, 36)
  }
  create () {
    this.hero = this.add.sprite(150, 150, 'heros', 0)
    this.hero.anchor.setTo(0.5)
    this.hero.animations.add('down', [0, 1], 4)
    this.hero.animations.add('up', [2, 3], 4)
    this.hero.animations.add('right', [4, 5], 4)
    this.hero.animations.add('left', [6, 7], 4)
    this.hero.play('down', null, true)

    this.physics.arcade.enable(this.hero)
    this.hero.body.angularVelocity = 200

    this.cursor = this.input.keyboard.createCursorKeys()
  }
  update () {
    if (this.cursor.down.isDown) {
      this.hero.play('down', null, true)
      this.hero.y += 2
    } else if (this.cursor.up.isDown) {
      this.hero.play('up', null, true)
      this.hero.y -= 2
    } else if (this.cursor.left.isDown) {
      this.hero.play('left', null, true)
      this.hero.x -= 2
    } else if (this.cursor.right.isDown) {
      this.hero.play('right', null, true)
      this.hero.x += 2
    }
  }
  render () {
    this.game.debug.body(this.hero)
  }
}
