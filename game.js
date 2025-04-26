#!/usr/bin/env node

import readline from 'readline'
import chalk from 'chalk'
import figlet from 'figlet'
import chalkAnimation from 'chalk-animation'
import ora from 'ora'

function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

let rl = createReadlineInterface();

let randomNumber = Math.floor(Math.random() * 100) + 1
let startingLives = 10
let lives = 10

async function welcome() {
  const title = chalkAnimation.rainbow('🎯 Welcome to the Guessing Game! 🎯')
  await sleep(2000)
  title.stop()

  console.log(chalk.greenBright("\nI'm thinking of a number between 1 and 100. Good luck!\n"))
}

function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function startGame() {
  await welcome()
  askDifficulty()
}

function askDifficulty() {
  console.log(chalk.bgCyan(' 🌀 Pick your difficulty 🌀 '))
  console.log(chalk.bgGreen(' 1. Easy: 10 lives '))
  console.log(chalk.bgYellow(' 2. Medium: 5 lives '))
  console.log(chalk.bgRed(' 3. Hard: 3 lives '))

  chooseDifficulty()
}

function chooseDifficulty() {
  rl.question("\nChoose: ", setDifficulty)
}

function askQuestion() {
  rl.question(`\nYour guess: `, checkInput)
}

function setDifficulty(diff) {
  const mode = parseInt(diff)

  if (isNaN(mode)) {
    console.log(chalk.bgRed('\n⚠️ Please enter a valid Difficulty!'))
    chooseDifficulty()
    return
  }

  if (mode === 1) {
    lives = 10
    startingLives = 10
    console.log(chalk.bgGreen("\nYou have chosen Easy — 10 lives\n"))
    askQuestion()
  } else if (mode === 2) {
    lives = 5
    startingLives = 5
    console.log(chalk.bgYellow("\nYou have chosen Medium — 5 lives\n"))
    askQuestion()
  } else if (mode === 3) {
    lives = 3
    startingLives = 3
    console.log(chalk.bgRed("\nYou have chosen Hard — 3 lives\n"))
    askQuestion()
  } else {
    console.log(chalk.bgRed('\n⚠️ Please enter a valid Difficulty!'))
    chooseDifficulty()
  }
}

function checkInput(num) {
  const guess = parseInt(num)

  if (isNaN(guess)) {
    console.log(chalk.bgRed('\n⚠️ Please enter a valid number!'))
    askQuestion()
    return
  }

  if (guess === randomNumber) {
    const tries = startingLives - lives + 1
    if (tries === 1) {
      console.log(chalk.bgWhite(`\nPerfect Game!`))
      askPlayAgain()
    } else if (tries > 1) {
      console.log(chalk.bgGreen(`\n✅ You got it right in ${tries} tries! You're safe... for now.`))
      askPlayAgain()
    }
  } else {
    lives--
    if (lives > 0 && guess != "") {
      console.log(chalk.bgRed(`\n❌ Nope! You have ${lives} ${lives === 1 ? "life" : "lives"} left.`))
      if (guess > randomNumber) {
        console.log(chalk.bgYellow(`🔻 The number is smaller than ${guess}`))
      } else {
        console.log(chalk.bgYellow(`🔺 The number is bigger than ${guess}`))
      }
      askQuestion()
    } else {
      console.log(chalk.bgRed(`\n💀 Game over! The correct number was ${randomNumber}. Better luck next time.`))
      askPlayAgain()
    }
  }
}

async function askPlayAgain() {
    rl.question('\nDo you want to play again? (y/n): ', async function(answer) {
        if (answer.toLowerCase() === 'y') {
            const spinner = ora('Thinking of a new number...').start();
            await sleep(2000);
            spinner.succeed('New number ready!');


            rl.close();
            

            rl = createReadlineInterface();


            lives = startingLives;
            randomNumber = Math.floor(Math.random() * 100) + 1;
            

            const newGameTitle = chalkAnimation.rainbow('🎮 NEW GAME STARTED! 🎮');
            await sleep(2000);
            newGameTitle.stop();

            askDifficulty();
        } else {
            console.log(chalk.bgBlue('\n👋 Thanks for playing! See you next time.'));
            rl.close();
        }
    });
}

startGame()
