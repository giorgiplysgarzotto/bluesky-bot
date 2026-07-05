import { Agent, CredentialSession } from '@atproto/api';
import { AtpAgentLoginOpts } from '@atproto/api';
const BLUESKY_USERNAME = process.env.BLUESKY_USERNAME!;
const BLUESKY_PASSWORD = process.env.BLUESKY_PASSWORD!;

dotenv.config();

// Create a Bluesky Agent 
const agent = new Agent({
    service: 'https://bsky.social',
  })


async function main() {
    const account: AtpAgentLoginOpts = {
        identifier: BLUESKY_USERNAME,
        password: BLUESKY_PASSWORD,
      }
    const session = new CredentialSession(new URL('https://bsky.social'))
    const agent = new Agent(session)
    await agent.login(account)
    
    await agent.post({
        text: "🙂"
    });
    console.log("Just posted!")
}

main();


// Run this on a cron job
const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
const scheduleExpression = '0 */3 * * *'; // Run once every three hours in prod

const job = new CronJob(scheduleExpression, main); // change to scheduleExpressionMinute for testing

job.start();