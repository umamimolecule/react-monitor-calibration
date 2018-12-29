# react-monitor-calibration

A simple app to display slides of color patterns to help you calibrate multiple monitors. Written using React and Redux as a sample project.

## Motivation

I have a dual monitor setup, and one day I noticed my monitors were not quite displaying the same colors.  Displaying various colour slides next to each other would help me adjust the monitors to match.  I wanted some way of having two synchronised sets of slides on each monitor, so hence this app.

## How to use

Open the browser page on multiple monitors and hit F11 to go full screen. Now when you click on each slide, the multiple pages should all be synchronised.

You can use the left and right arrow keys to navigate to the previous and next slides respectively.

![Screenshot](screenshot.gif)

Having these images side by side will hopefully let you calibrate your monitors, either by using the manual settings on the monitor itself or by using your graphics card utility to adjust the various parameters.

## Website

https://monitorcalibration.azurewebsites.net/

## How does it synchronise between the different pages?

It uses browser local storage to detect when the current slide has been changed. The pages poll local storage every 200ms to check whether another page has changed the slide, and if so will then synchronise to show the same page.

## What? I have to manually calibrate my monitors?!

Yep, this software is not smart enough to do it for you ;)
