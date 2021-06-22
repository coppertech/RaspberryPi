# rPi-Magic-Mirror

This is a pi project to create a magic mirror display (without a mirror) on a the family TV connected with other AV equipment. The hope is to develop the project to determine when no other media is being used (via CEC) and switch the display to the magic mirror source, keeping they MM display until preempted by another video source.

Off/On automation on a schedule is a secondary item.


## HDMI Source Control ## 

AV Control is handled using the cec-utils package. I installed it using the standard install:

`sudo apt install cec-utils`

I will not go into details on cec-utils/cec-client. Help is readily available. But, a full list of commands under cec-client is available using

`cec-client -h`

To determine available CEC-compatible equipment on the bus, use

`echo 'scan' | cec-client -s -d 1`

which for me results in the following output:

 ![Screenshot](https://github.com/coppertech/rPi-Magic-MIrror/blob/main/scan.png)

Source 3 is a Sony A/V media center including tuner, and multiple HDMI sources. Unit 0 is a Samsung TV. My desire is to have the TV display the Magic MIrror when no other audio/video is being displayed by the A/V source. The A/V automatically switches to standby after 3 minutes. So I used the following bash command in a shell script run by cron every minute to control the source change on the TV.

`echo 'pow 3' | cec-client -s -d 1 | grep 'power status: standby' 2>&1>>/dev/null  && echo 'pow 0' | cec-client -s -d 1 | grep 'power status: on' 2>&1>>/dev/null && echo 'Changing source...' && echo 'tx 1f:82:40:00' | cec-client -s -d 1`

The script checks to see the power on the A/V unit is in standby mode (no active source) and that the TV is on. If so, I send the command on the HDMI bus to tell the TV to change to the rPi MM source (HDMI 4). I do not want the source switching if the TV is off, as it will automatically power it on. I only want it displayed when the TV is left on.

_Note: My Samsung TV has an [issue](http://github.com/coppertech/rPi-Magic-MIrror/issues/2) in it's CEC implementation (Anynet+) where the standby command is unsupported. I am unable to put the TV in standby mode via the cec-utils interface. This prevents me from doing timed power-on and power-off until I find a workaround_


## MM Display ##

I wanted to simulate my Google calendar (along with shared calendars) in the same format as on Google. I also wanted a simple clock
and an upcoming events list. From there I just looked through the Third Party Modules to see what would be cool. I
ended up implementing the following modules on my initial version:

- MMM_CaldendarExt2
- MMM_Nicehash
- MMM-MWWordofTheDay
- weather (default module)
- calendar (default module)
- clock (defalut module)

To display my Google calendars I needed the "private url". The public url will not work. The url is available to the
calendar owner through the individual calendar settings under "Integrate Calendar".

I added each individual calendar definition with the private url under CalendarExt2 in the config.js file then selected which calendars to display in the default view.
For Nicehash, which displays crypto-mining information from your nicehash account, you need an API key. The same goes
for weather. The Calendar (upcoming events) uses the same private url and CalendarExt2. I didn't all all the same calendars under the 
calendar module, as I didn't want entries from all those same calendars to show up on the upcoming events list.

![MM Display](https://github.com/coppertech/rPi-Magic-MIrror/blob/main/MM_Screenshot.png)

## Development Issues ##

I found it difficult to make changes remotely, but was able to view the calendar remotely by adding the IP of the remote
machine to the config.js file in place of "localhost". then use a browser to go to the rPi port 8080. Unfortunately, I was 
unable to get the MM to display on both a remote browser and the HDMI inteface (localhost). So I had to switch back and forth.
I found some changes required a restart, not just a "touch" to config.js.

While not *new* to css, I am by no means an expert. That took some learning to get it set up where I was satisfied.
