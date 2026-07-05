import crypto from 'crypto';
import { Agent, CredentialSession } from '@atproto/api';
import { AtpAgentLoginOpts } from '@atproto/api';
const BLUESKY_USERNAME = process.env.BLUESKY_USERNAME!;
const BLUESKY_PASSWORD = process.env.BLUESKY_PASSWORD!;

function validatePost() {
    // translate into bluesky API
    await agent.get(//posts)
    if reply is first reply, return true
    if reply is not first reply, return false
}

function findBlock() {
    await agent.get(//posts)
    for await (const post of posts) {
        validatePost()
        if (isBlock === true) {
            return post;
        }
        if (isBlock === false) {
            continue;
        }
    if {block === null} {
        return null;
    }
    if {block !== null} {
        return Block;
    }
}

function parseTransaction(user1: string, user2: string, amount: number) {
    const transaction = `${user1} -> ${user2} ${amount}`;
    return transaction;
}

function bundleTransactions() {
    const transactions = [];
    await agent.get(//transations)
    for await (const transaction of transactions) {
        const { user1, user2, amount } = transaction;
        const transaction = parseTransaction(user1, user2, amount);
        transactions.push(transaction);
    }
    return transactions;
}


function buildHash(transactions: Array<string>) {
    return crypto.createHash(transactions)
}

// so facets are really crazy to make. The plan was for transactions to mention the users, but now...
// for the 1.0, let's keep it to a coinbot tag at the front of the post (positioning is the same for all posts) 
// transactions will identify handles, but then not link to uuids...
// transactions can have an identifying number, and then the bot can reply to the transaction posts with that number.
// then in the block the transactions are copied with the identifying number. 
// deleted posts don't identify authors, so when the bot replies to those posts, it'll need to mention both users and the amount. 
// with that verification recorded in coinbot posts, block transaction lists can rely on id numbers and current handles.
function buildPost(hash, totals, transactions: Array<string>,) {
    const tags = [ '#coinbot']
    const mentions =
    const facets = [`${tags}`, `${mentions}`]
    const text = `${hash} ${totals} ${transactions}`
    const post = {"text": `${text}`,
"facets": [`${facets}`]
}
    return post
}

//here's a thought: users can do the work for me. if a transaction post has a mention, the facets can just be copied. 
//eg: "@user1 transfers X coin to @user2"
//transaction post grabs all the post info and reproduces it in the reply. 
//a transaction must be in the above parsable format to be valid. 
function buildReply(transaction: string) {
    //get transaction post text in json format
    //parse
    //reproduce as json for reply
}

//the awaits here will all have to be split up into their own functions.
//this is the structure though.
function findTransactions() {
    await agent.get(//transactions)
    for await (const transaction of transactions) {
        buildReply(transaction);
        await agent.post(reply);
    }
}

async function main() {
    const account: AtpAgentLoginOpts = {
        identifier: BLUESKY_USERNAME,
        password: BLUESKY_PASSWORD,
      }
    const session = new CredentialSession(new URL('https://bsky.social'))
    await session.login(account)
    const agent = new Agent(session)
    findTransactions();
    findBlock();
    if (block !== null) {
        getTransactions();
        bundleTransactions();
        updateTotals();
        buildHash();
        buildPost();
        post();
    }
    else {
        return null;
    }

    await agent.post(post);
    // look for new blocks
    // validate block
    // grab transactions since last block
    // parse transactions
    // update totals
    // bundle transactions
    // hash function
    // build post
    // post

}

main();