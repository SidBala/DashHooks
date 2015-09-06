So you have an Amazon Dash button. Wouldn't it be awesome if you could put it to some other use?

That's where DashHooks comes in. DashHooks runs within your WiFi and monitors your Dash Button for presses.
When a press is detected, DashHooks runs the configured script. As simple as that.

    npm install
    node index.js -a a0:32:ab:21:37:fa -c ./sampleSlackNotiication.sh

    -a is the MAC address of your Dash Button
    -c is the command/script to run when the button is pressed.

Start with no options first. This will listen for all ARP probes in your network. If you press the Dash button now, DashHooks will show logs. This way, you can quickly determine your DashButton's MAC address without hunting for it in your router's UI.
