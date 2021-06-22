# rPi-Magic-Mirror

This is a pi project to create a magic mirror type display on a primary display (tv) shared with other AV equipment. The hope is to develop the project to determine when no other media is being used (via CEC) and switch the display to the magic mirror source, keeping they MM display until preempted by another video source.

Off/On automation on a schedule is a secondary item.

### HDMI Source Control ### 

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

Essentially, it checks to see the power on the A/V unit is in standby mode (no active source) and that the TV is on. If so, I send the command on the HDMI bus to tell the TV to change to the rPi MM source (HDMI 4). I do not want the source switching if the TV is off, as it will automatically power it on. I only want it displayed when the TV is left on.

_Note: My Samsung TV has an issue in it's CEC implementation (Anynet+) where the standby command is unsupported. I am unable to put the TV in standby mode via the cec-utils interface. This prevents me from doing timed power-on and power-off until I find a workaround_


