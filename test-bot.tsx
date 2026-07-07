import { Agent, CredentialSession } from '@atproto/api';
import {config} from 'dotenv';
import { CronJob } from 'cron';
config({ path: '.env' });
const BLUESKY_USERNAME = process.env.BLUESKY_USERNAME!;
const BLUESKY_PASSWORD = process.env.BLUESKY_PASSWORD!;

const session = new CredentialSession(new URL('https://bsky.social'))
const agent = new Agent(session)

async function login(username: string, password: string) {
    if (!session.hasSession) {
        await session.login({ identifier: BLUESKY_USERNAME, password: BLUESKY_PASSWORD});
    }
    console.log('Logged in as', session.did)
    return agent;
}

async function main() {
    await login(BLUESKY_USERNAME, BLUESKY_PASSWORD);
    await agent.post({
    text: "🙂"
});}

main().catch(err => {
    console.error('Login/post failed:', err.message)
    // don't rethrow — let the process stay alive for cron
  })


// Run this on a cron job
const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
const scheduleExpression = '0 */3 * * *'; // Run once every three hours in prod

const job = new CronJob(scheduleExpression, main); // change to scheduleExpressionMinute for testing

job.start();