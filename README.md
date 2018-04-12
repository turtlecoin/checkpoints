# Checkpoints
### How To Sync Quickly
##### In versions 0.4.3+ you can sync a fresh chain from 0 much quicker by loading "checkpoints" with your daemon. 

- download the latest checkpoints.csv here https://github.com/turtlecoin/checkpoints/raw/master/checkpoints.csv
- place checkpoints.csv in the same folder as your TurtleCoind daemon
- run TurtleCoind with checkpoints added like this: 

Linux, Apple `./TurtleCoind --load-checkpoints checkpoints.csv`

Windows `TurtleCoind.exe --load-checkpoints checkpoints.csv`
