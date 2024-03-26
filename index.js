const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//set static path
app.use(express.static(path.join(__dirname,"client")));

app.use(bodyParser.json());

const PublicVapidKey = 'BExjFmYXYtvUhpGCfTG_ICiZcOK2Alcq75amvkPo9phEya_tDZO510Cnc7FmLHUJpt4MYyPeSftiDgmg-JnPpP0';
const PrivateVapidKey = 'Cn8afVTmuBmmCCOD1EUJB-TF3JNdOm8lqu4pQMnt2b0';

webpush.setVapidDetails('mailto:bommanavinay876@gmail.com',PublicVapidKey,PrivateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: 'Invalid subscription object' });
    }

    // Log the received subscription
    console.log('Received subscription:', subscription);

    // Respond to the client
    res.status(201).json({});

    // Create a payload
    const payload = JSON.stringify({ title: 'Push Notication' });
 
    // Send the notification
    webpush.sendNotification(subscription, payload)
        .then(() => console.log('Notification sent successfully'))
        .catch(err => console.error('Error sending notification:', err));
});
// app.post('/subscribe', (req, res) => {
//     const { userIdentifier, subscription } = req.body;

//     if (!userIdentifier || !subscription || !subscription.endpoint) {
//         return res.status(400).json({ error: 'Invalid request' });
//     }

//     // Log the received subscription and user identifier
//     console.log(`Received subscription for user ${userIdentifier}:`, subscription);

//     // Save the subscription along with the user identifier in your database

//     // Respond to the client
//     res.status(201).json({ message: 'Subscription received successfully' });
// });

// Example route for sending notifications to a specific user
// // Example of a simple in-memory database to store user subscriptions
// const userSubscriptions = {};

// // Route for subscribing a user
// app.post('/subscribe', (req, res) => {
//     const { userIdentifier, subscription } = req.body;

//     if (!userIdentifier || !subscription || !subscription.endpoint) {
//         return res.status(400).json({ error: 'Invalid request' });
//     }

//     // Associate the subscription with the user
//     if (!userSubscriptions[userIdentifier]) {
//         userSubscriptions[userIdentifier] = [];
//     }
//     userSubscriptions[userIdentifier].push(subscription);

//     // Log the received subscription and user identifier
//     console.log(`Received subscription for user ${userIdentifier}:`, subscription);

//     // Respond to the client
//     res.status(201).json({ message: 'Subscription received successfully' });
// });

// // Route for sending a notification to a specific user
// app.post('/send-notification', (req, res) => {
//     const { userIdentifier, payload } = req.body;

//     // Check if the user has subscriptions
//     const subscriptions = userSubscriptions[userIdentifier];
//     if (!subscriptions || subscriptions.length === 0) {
//         return res.status(404).json({ error: 'No subscriptions found for the user' });
//     }

//     // Send notifications to each subscription associated with the user
//     subscriptions.forEach(subscription => {
//         webpush.sendNotification(subscription, JSON.stringify(payload))
//             .then(() => console.log(`Notification sent successfully to user ${userIdentifier}`))
//             .catch(err => console.error('Error sending notification:', err));
//     });

//     // Respond to the client
//     res.status(200).json({ message: 'Notifications sent successfully' });
// });



// app.post('/subscribe', (req, res) => {
//     const subscriptions = req.body; // Assuming req.body is an array of subscription objects

//     if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
//         return res.status(400).json({ error: 'Invalid subscriptions array' });
//     }

//     // Log the received subscriptions
//     console.log('Received subscriptions:', subscriptions);

//     // Respond to the client
//     res.status(201).json({ message: 'Subscriptions received successfully' });

//     // Create a payload
//     const payload = JSON.stringify({ title: 'Push test' });

//     // Send notifications to each subscription
//     subscriptions.forEach(subscription => {
//         webpush.sendNotification(subscription, payload)
//             .then(() => console.log('Notification sent successfully to', subscription.endpoint))
//             .catch(err => console.error('Error sending notification:', err));
//     });
// });



const port = 443;
app.listen(port, () => console.log(`Server is running on port ${port}`));
