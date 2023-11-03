# Squash-the-Bug V2

- [Components](#components)
- [Responsiveness](#responsiveness-considerations)
- [Bugs](#bugs)
- [Development Log](#development-log)

Squash-the-Bug V2 is simple point and click web game coded in only HTML, CSS and JS where in similar format to the traditional "whack-a-mole" game, the user will click on the bugs that will appear randomly in the "holes" of the game area to "squash" them and gain points in doing so.

V2 will focus on having an increasing difficultly based on an increasing level dependant on whether the user is able to meet the score requirement to proceed to the next level which I was not able to implement in first iteration. Secondary to this, an overhaul of the UI and structuring the webpage to create a more intuitive experience for the user.

The core components of the game and JS relating to them from the first iteration will be used as the basis for V2 with the hopes of either being able to attach the new features onto the preexisting code or altering the code to allow additional functions to be able to slot in as a callback. If neither of those options are possible, blocks of code will need to be revamped.

I decided to make this "whack-a-mole" style game as having the mouse input as the main interactive element because it felt more intuitive to me as someone who enjoys shooter games where the mouse is the main input.

## Components
### UI Elements
- Navigation bar to with links to open my web portfolio and the git hub repo of the web game
- A "header" page that will cover the whole viewport with the title, short description and maybe some sort of visual tutorial. This will translate out of view to the top of the page to reveal the game.
- A game area where there will be a varying number of "holes" for the bugs to appear for the user to click on.
- A side panel to display:
	- A timer
	- Current level
	- score and score required

### JS Elements
- Interactive "bug"
	- spawning
	- response on click
		- adding to score
		- removal of bug
	- automatic despawn on timeout
- timing system
	- end the game and present the score 
	- check score to determine level progression
- Level up system
	- scale up a threshold for progression
	- addition of additional elements such as holes etc
	- scale up difficult with shorter timings of bug spawn and despawn

## Responsiveness Considerations
The game cannot work on a phone screen right now

## Bugs
- ~~constant problem of the childNode of bug not existing when attempting removal~~
	- the timings on class removal and were off, and as such the mutation observer wasn't functioning properly.

## Development Log

- [Mutation observer](#mutation-observer)
- [Core Mechanics Rework](#core-mechanics-rework)

### Mutation observer
originally the visible "bug" element was hard coded in to appear along side addition and removal of the class of the parent hole div.
I moved away from this and had the visible element respond to whether the parent had the class of "bug" to then append or remove the child img. Using the mutation observer, each "hole" would be tracked for changes in it's class attributes and trigger the function to append or remove child to the conditions.
### Core mechanics rework

From the code with the first iteration I attempted to keep the same functionality and processes but restructured parts to have individual functions to be split apart:
#### Bug spawning and fleeing
`spawnBug` and `bugFlee` functions were previously a singular function that would recursively repeat itself on a timeout. Now with it separated it is possible to separately adjust the timings of each and possible to have a `clearTimeout` with the `whackBug` function without it breaking the game.

#### Bug whacking
all of the bug removal code based on the user clicking was within event listener block attached to each hole. This has now been moved into it's own function which can be call in response to the "mousedown" event listener

#### Timer
The timer was previously very inefficiently split into 2 parts, one part being the one functioning with the game, and the other being the visible element. In the first iteration, I felt that using `setTimeout` as the timer to functionally end the game was the simplest option. but as it's format was in milliseconds made it hard to make a presentable timer for the user. As such a separate function with `setinterval` was made. Coming back to this code I realised this is very unnecessary and removed the `setTimeout` function and added conditional statements in the `setInterval` to end the game.
P.S. It should be noted that I don't know when it ends it won't show 0 before the alert :/
P.S.2 OH I believe following what is mentioned in "In The Loop" presentation 2018 by Jake Archibald (https://youtu.be/cCOL7MC4Pl0), since all of the JS tasks are completed, the rendering processes happens in a set order determined by the browser and as such the alert is rendered first and will never present as 0 before the alert. this problem can kind of be hacked by just by altering the conditional to be "time < 0" instead of "time <= 0" thought technically the time may not be true. this will need further reading. 

### Initial commits
Reused the original HTML but shuffled elements around to compartmentalise them into 3 main parts:
- header
- main
	- info panel
	- game area
