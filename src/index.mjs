// src/index.mjs
import Slack from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();

const app = new Slack.App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Function to generate block kit and send to Slack
export async function sendTasksToSlack(tasks) {
    console.log(tasks);
    const taskBlocks = tasks.map(task => ({
        type: 'section',
        fields: [
            {
                type: 'mrkdwn',
                text: `*Task Name:* ${task.name}\n*Description:* ${task.description}\n*Priority:* ${task.priority}\n*Project:* ${task.projectname}\n*Assignee:* ${task.assignee.name}`
            }
        ]
    }));

    const blocks = [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Tasks List*'
            }
        },
        {
            type: 'divider'
        },
        ...taskBlocks // Spread the taskBlocks array to include dynamically generated task blocks
    ];

    try {
        const result = await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: process.env.SLACK_CHANNEL,
            blocks,
        });

        console.log('Message sent successfully:', result);
    } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('Error sending message to Slack');
    }
}

// Export the function to be used in server.js
export default sendTasksToSlack;
