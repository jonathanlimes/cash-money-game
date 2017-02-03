# CA$H MONEY

[Live Demo Here] (https://wdi-sg.github.io/wdi-project-1-jonathanlimes/)


![CASH MONEY] (http://i.imgur.com/Q687kMP.png "Cash Money Logo")

It's Chinese New Year, and you're on your way to riches by collecting red packets. You'll pocket $2 for each red packet you grab, but fat pockets will slow you down! Speed up by eating oranges along the way, but avoid the firecrackers or you'll be back where you first started, and a lot poorer! Collect more money than your opponent within 30 seconds to win!

## Gameplay

**PLAYER 1: Starts from Top-Left Corner**

W - Move Up

A - Move Left

S - Move Down

D - Move Right

---

**PLAYER 2: Starts from Bottom-Right Corner**

Up - Move Up

Left - Move Left

Down - Move Down

Right - Move Right

---

**Red Packets:** Earns you $2, but slows you down.

**Oranges:** Speeds you up.

**Firecrackers:** Returns you to your original spot, and sets you back by $3!

---

**Timer:** 30 Seconds. Progress Bar shows the time left

**Reset:** Hit the 'Reset Game' button

**WINNER:** Player that amasses the most amount of money before the timer runs out (30 seconds).

## Development
* HTML5 Canvas, programmed using JavaScript
* Skeleton CSS Framework
* A bit of Responsive Web Design to have everything fit onscreen regardless of browser size
* index.html / style.css / script.js
* [View Code Workflow here] (https://docs.google.com/presentation/d/1uzdkDOVF2_yVdmQA22r5RG9DANF_smVhi5z-qyL131I/edit?usp=sharing)

## References, Tools, and Inspiration
* [How to Make a Simple HTML5 Canvas Game by Matt Hackett] (http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/)
* [MDN Canvas Tutorial] (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
* [Making Sprite-Based Games with Canvas by JLongSter] (http://jlongster.com/Making-Sprite-based-Games-with-Canvas)
* [Creating and Styling Progress Bars] (http://www.hongkiat.com/blog/html5-progress-bar/)
* [OpenGameArt.org] (http://opengameart.org/)
* [Logo Generator] (http://www6.flamingtext.com/)
* [Tiled: Map Editor] (http://www.mapeditor.org/)
* [Bfxr: Sound Effects for Games] (http://www.bfxr.net/)
* [Skeleton CSS Framework] (http://getskeleton.com/)
* [Viewport Sized Typography] (https://css-tricks.com/viewport-sized-typography/)
* [Media Query for Responsive Web Design] (http://www.w3schools.com/css/css_rwd_mediaqueries.asp)

## What I would've done differently
* Declare `keysDown` as an array instead of an object
* CSS styling could’ve been improved to make it more responsive to the user’s screen - Could have rearranged divs entirely upon hitting a minimum screen size
* I would do `renderObjs()` very differently. The plan was to use different sprite images for the players when moving in different directions. Need to improve my understanding of Canvas!
* Add obstacles to restrict movement on the game board
