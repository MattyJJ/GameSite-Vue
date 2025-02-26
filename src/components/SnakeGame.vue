<style scoped></style>

<template>
  <header></header>

  <main>
    <canvas id="game-canvas"></canvas>
  </main>
</template>

<script setup lang="ts">
import { Vector2 } from '@/Lib'

const TILE_SIZE: number = 32
const GAME_SIZE: number = 20
const CANVAS_W: number = TILE_SIZE * GAME_SIZE
const CANVAS_H: number = TILE_SIZE * GAME_SIZE
const FRAME_TIME: number = 1000 / 10

// GRAPHICS START

class Graphics {
  static #instance: Graphics

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  public DrawTile(position: Vector2, color: string): void {
    this.context.fillStyle = color
    this.context.fillRect(
      position.x * TILE_SIZE,
      position.y * TILE_SIZE,
      TILE_SIZE - 5,
      TILE_SIZE - 5,
    )
  }

  public Clear() {
    //this.context.fillStyle = color
    this.context.clearRect(0, 0, CANVAS_W, CANVAS_H)
  }

  private constructor() {
    this.canvas = document.getElementById('game-canvas')! as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H
  }

  public static get instance(): Graphics {
    if (!Graphics.#instance) {
      Graphics.#instance = new Graphics()
    }

    return Graphics.#instance
  }
}

// GRAPHICS END
// SNAKE START

class Snake {
  public body: Array<Vector2>
  public head: Vector2
  public score: number
  public length: number
  public direction: Vector2
  private moveQueue: Array<Vector2>

  public constructor() {
    const _: number = Math.floor(GAME_SIZE / 2)
    this.head = new Vector2(_, _)
    this.body = new Array<Vector2>(new Vector2(_ - 1, _), new Vector2(_ - 2, _))
    this.moveQueue = new Array<Vector2>()
    this.direction = new Vector2(1, 0)
    this.score = 0
    this.length = 2
  }

  public Update() {
    if (this.moveQueue.length > 0) {
      const dir = this.moveQueue[0]
      if (!((dir.x != 0 && this.direction.x != 0) || (dir.y != 0 && this.direction.y != 0))) {
        this.direction = dir
      }
      this.moveQueue.shift()
    }

    this.body.unshift(new Vector2(this.head.x, this.head.y))

    this.head.x += this.direction.x
    this.head.y += this.direction.y

    if (this.body.length > this.score + 2) this.body.pop()

    this.body.forEach((pos: Vector2) => {
      if (pos.x == this.head.x && pos.y == this.head.y) game.GameReset()
    })

    if (
      this.head.x < 0 ||
      this.head.x > GAME_SIZE - 1 ||
      this.head.y < 0 ||
      this.head.y > GAME_SIZE - 1
    )
      game.GameReset()
  }

  public Render() {
    Graphics.instance.DrawTile(this.head, 'lime')

    this.body.forEach((pos: Vector2) => {
      Graphics.instance.DrawTile(pos, 'green')
    })
  }

  public QueueMove(dir: Vector2): void {
    if (this.moveQueue.length >= 2) this.moveQueue.unshift()
    this.moveQueue.push(dir)
  }
}

// SNAKE END
// APPLE START

class Apple {
  public snake: Snake
  public position: Vector2

  public constructor(snake: Snake) {
    this.snake = snake
    this.position = new Vector2(0, 0)

    this.RandPos()
  }

  public Update() {
    if (this.snake.head.x == this.position.x && this.snake.head.y == this.position.y) {
      this.snake.score++
      this.RandPos()
    }
  }

  public Render() {
    Graphics.instance.DrawTile(this.position, 'red')
  }

  private RandPos(): void {
    this.position.x = Math.floor(Math.random() * GAME_SIZE)
    this.position.y = Math.floor(Math.random() * GAME_SIZE)

    if (this.snake.head.x == this.position.x && this.snake.head.y == this.position.y) {
      this.RandPos()
      return
    }

    this.snake.body.forEach((pos: Vector2) => {
      if (pos.x == this.position.x && pos.y == this.position.y) {
        this.RandPos()
        return
      }
    })
  }
}

// APPLE END
// GAME START

class Game {
  private snake: Snake
  private apple: Apple

  private started: boolean = false

  public constructor() {
    this.snake = new Snake()
    this.apple = new Apple(this.snake)
  }

  public GameReset(): void {
    this.snake = new Snake()
    this.apple = new Apple(this.snake)
    this.started = false
  }

  public Update(): void {
    if (!this.started) return

    this.snake.Update()
    this.apple.Update()
  }

  public Render(): void {
    Graphics.instance.Clear()

    this.snake.Render()
    this.apple.Render()
  }

  public QueueMove(dir: Vector2): void {
    if (dir.x == -1 && !this.started) return
    this.snake.QueueMove(dir)
    this.started = true
  }
}

const game: Game = new Game()

document.addEventListener('keydown', (e) => {
  if (e.repeat) return
  if (e.key == 'w' || e.key == 'ArrowUp') game.QueueMove(new Vector2(0, -1))
  if (e.key == 'a' || e.key == 'ArrowLeft') game.QueueMove(new Vector2(-1, 0))
  if (e.key == 's' || e.key == 'ArrowDown') game.QueueMove(new Vector2(0, 1))
  if (e.key == 'd' || e.key == 'ArrowRight') game.QueueMove(new Vector2(1, 0))
})

function GameLoop(): void {
  game.Update()
  game.Render()
}

setInterval(GameLoop, FRAME_TIME)
</script>
