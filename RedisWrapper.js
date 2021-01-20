import redis from "redis";
const client = redis.createClient(6379, "127.0.0.1");

client.on("error", (err) => {
    console.log("[Err] "+ err);
});
client.on("ready", () => {
    console.log("Redis is ready ");
});

let Store = class {

    set(slackId, token){
        console.log("[redis]set");
        client.set(slackId, token);
    };

    get(slackId){
        return new Promise((resolve, reject) => {
            client.get(slackId, (err, result) => {
                resolve(result);
            });
        });

    };
}

// module.exports = Store;
export default Store;
