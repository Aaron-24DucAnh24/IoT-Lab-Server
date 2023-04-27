## Roles:
1. Listen to users' action from mobile app (http requests)
2. Control devices by send message to gateway (socketIO)
3. Automatically set connection to be not OKAY to detect if gateway is connected 
4. Automatically control devices when users turn on auto module
5. Block action from dashboard of ***Adafruit*** if there was no connection between any hops of the system.

## To use:
1. Make a directory ./ignore_file/index.js add authentication information
    ```javascript
    password = '___'
    username = '___'
    clientId = '___'
    module.exports = {password, username, clientId}
    ```

2. Run the server: npm start

3. Use ***NGROK*** to create public IP for the server: ngrok http 3000

4. Copy the IP and add it to mobile app.
