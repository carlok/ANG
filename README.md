ANG - Accelerometer Noise Gauge
==

![](https://raw.githubusercontent.com/carlok/ANG/master/ang_screenshot_2014-07-23-18-43-29.png)

ANG is a small project/exercise to measure the noise of the accelerometer that many smartphones have.

The idea is simple: after having put your mobile on a "quiet" surface, it starts colleting samples of the (x, y, z) acceleration, measuring the 3 axial noise as a max/min percentage.

ANG is build upon [Ionic] and [ngCordova] and it has been tested on an Android phone.

How to get it
--
* set up a working environment with [Ionic] and [ngCordova] (read their documentation);
* create a new Ionic project:
```sh
ionic start myApp tabs
```
* change directory:
```sh
cd myApp
```
* if your working environment does not have them, add the required plugins:
```sh
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.device-motion
```
* download ```ng-cordova.js``` from [ngCordova] repository and copy it to ```www/lib/ng-cordova.js```;
* copy/overwrite the files of this repository in their corresponding folders of your project:
```sh
www/index.html
www/js/app.js
www/js/controllers.js
www/templates/tab-dash.html
```
* (optional) customize control names and so on;
* connect your mobile with a USB cable;
* run the following commands:
```sh
ionic build android
ionic run android
```
* test it on your mobile.

TODO
--
* start collecting samples a few seconds **after** the pressure of the "Start" button (to avoid adding noise);
* a diagram, perhaps.

License
--

[GPLv3], although it is just a small project/exercise and a good part of its source code comes from both [Ionic] and [ngCordova] generators, documentation or examples.

[GPLv3]:https://gnu.org/licenses/gpl.html
[Ionic]:http://ionicframework.com/
[ngCordova]:http://ngcordova.com/
