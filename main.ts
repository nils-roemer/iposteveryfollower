require('dotenv/config');
const { IgApiClient } = require('instagram-private-api');

const follower = [];

(async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;
    const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const followersFeed = ig.feed.accountFollowers(auth.pk);
    followersFeed.items$.subscribe(
        followers => {
            followers.forEach((f) => follower.push(f))
        },
        error => console.error(error),
        () => console.log(follower),
    );

})();