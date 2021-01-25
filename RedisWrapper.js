import redis from "redis";
const client = redis.createClient(6379, "127.0.0.1");

client.on("error", (err) => {
    console.log("[Err] "+ err);
});
client.on("ready", () => {
    console.log("Redis is ready ");
});

let Store = class {

    set(slackId, token, expireTime){
        try {
            console.log("[redis.expire]start");
            console.log("[redis.set]slackId :" + slackId+", token: "+token);
            client.set(slackId, token);
            if(expireTime) {
                this.expire(slackId, expireTime);
            }    
        } catch (error) {
            throw(error);
        }
        

    };

    get(slackId){
        return new Promise((resolve, reject) => {
            try {
                client.get(slackId, (err, result) => {
                    if(err){
                        reject(resolve);
                    }
                    console.log("[redis.get]start");
                    console.log("[redis.get]slackId :" + slackId+", token: "+result);
                    resolve(result);
                });
            } catch (error) {
                throw(error)
            }
        });
    };
    
    expire(slackId, expireTime) {
        try {
            console.log("[redis.expire]start");
            console.log("[redis.expire]slackId :" + slackId+", expireTime: "+expireTime);
            client.expire(slackId, expireTime);
        } catch (error) {
            throw(error)
        }
    }

    exists(slackId){
        return new Promise((resolve, reject) => {
            client.exists(slackId, (err, result) => {
                if(err){
                    reject(resolve);
                }
                const isExists = result == "1"? true:false;
                resolve(isExists);
            });
        });
    };

    delete(key) {
        try {
            console.log("[redis.delete]start");
            console.log("[redis.delete]key :" + key);
            client.del(key);
        } catch (error) {
            throw(error)
        }
    }

    rename(originKey, rename) {
        console.log("[redis.rename]start");
        console.log("[redis.rename]originKey :" + originKey+", rename: "+rename);
        client.rename(originKey, rename);
    }

}

// module.exports = Store;
export default new Store();
