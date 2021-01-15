# GALACTICOLOUR

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Menus](#menus)
    * [Main Menu](##main-menu)
    * [Manual]
    * [Upgrades]
        + [Guns]
        + [Bodies]
        + [Engines]
    * [Level Select]
- [Levels]
    * [Waves]
    * [Enemies]
- [Screenshots]

# Introduction

<p>Galacticolour is a web-based, two-dimensional space shooter which takes inspiration from classic
games such as Asteroids and Space Invaders, along with a touch of the beloved mobile game Color Switch.</p>

<p>The game was created completely from scratch using JavaScript and HTML. The project served as a challenge for the 
team that would also aid them in improving their JavaScript skills and sharpening their knowledge of its conventions.</p>

<p>Galacticolour is heavily reliant on user mouse and keyboard input. The program runs in a game loop that constantly
listens for cues in order to trigger certain events in-game.</p>

<p>The objective of Galacticolour is to complete a series of 14 levels, where the player traverses the galaxy from 
planet to planet fighting off waves of increasingly stronger enemies.</p>

<p>Avoid colliding with incoming enemies and projectiles, as losing all your health will result in losing the game and having
to restart the level.</p>

<p>Change the appearance and functionality of your equipment including ship body types, projectiles and engines. </p>

<p>This project was developed in a team of 3 group members consisting of Alex Hyde, Sebastian Villate and Kevin Lee.
All three are First Year students at the University of Waterloo. Their respective GitHub profiles can be found below:</p>

[Alex Hyde](https://github.com/Alex-Hyde)<br>
[Sebastian Villate](https://github.com/Sebvillate)<br>
[Kevin Lee](https://github.com/keeinlev)<br>


# Menus
<p>There are four menus that the user can access, each with their own function:</p>

## Main Menu
<p>This is the menu that appears upon launching the webpage that hosts the game. From here, the player can access the other three
menus available in the game. The use of multiple layers of images allows for a smooth parallax background effect as well as
updates in the user interface that are responsive to the position of the player's mouse, such as the glows that change colour
around the menu buttons.</p>

![glowGif](/screenshots/glow.gif/) <br>

<p>In the bottom right hand part of the screen, there is a small speaker icon that, when pressed, will play the main menu theme song.</p>

![speaker](/screenshots/speaker.png/)


## Manual
<p>The manual is a comprehensive overview of all the controls, enemy types and ship upgrades that exist in the game. It can be accessed
by clicking the highlighted icon as shown below.</p>

![openManualGif](/screenshots/openmanual.gif/)

<p>To allow the user to try the controls out before entering battle in a real level, there is a small frame contained within
the manual where they can control a fully operational player ship.</p>
<p>Use WASD to move your ship, aim and shoot with your mouse, press SpaceBar to change the colour of your ship, and press Shift
to warp your ship to your mouse's location</p>

![trainingShipGif](/screenshots/trainingship.gif/)

<p>The next few pages go over the different types of mobs, including their movement patterns, their strength and general health capacity.</p>

![mobsManualGif](/screenshots/mobsmanual.gif/)

<p>Finally, the last few pages explain the benefits of using different ship customizations, which can be found in the inventory menu.</p>

![upgradesManualGif](/screenshots/upgradesmanual.gif/)


## Inventory
<p>The Inventory can be accessed from the Main Menu on the left side of the screen.</p>
<p>Here, you can cycle through your weapons for each colour, as well as your ship's body and engines.</p>
<p>Different weapons will also behave differently, each one with its own firerate, damage and the rocket launcher even has an area of effect.</p>
<p>Changing engines will both alter the ship's speed but also the warp cooldown time. Usually, faster ships will have longer warp cooldowns and vice versa.</p>

![openInvGif](/screenshots/inventory.gif/)


<p>Each body has its unique characteristic ability. For example, a certain body will allow for health regeneration
upon killing an enemy, but as a penalty, enemies take less damage per hit.</p>

[regenGif]


<p>A complete rundown of each of the abilities and stats can be found in the Manual</p>



[gameOver]
