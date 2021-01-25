import express from "express";
// const express = require("express");
const app = express();
// const Redis = require("./RedisWrapper.js");
import Redis from "./RedisWrapper.js";
const redisInstance = new Redis();

app.get("/set/:id/:token", (req, res) => {

    const slackId = req.params.id;
    const token = req.params.token;
    console.log(slackId+token);
    redisInstance.set(slackId, token);
    res.sendStatus(200);
});

app.get("/set/:id/:token/:expire", (req, res) => {

    const slackId = req.params.id;
    const token = req.params.token;
    const expire = req.params.expire;
    redisInstance.set(slackId, token, expire);
    res.sendStatus(200);
});

app.get("/expire/:id/:expire", (req, res) => {

    const slackId = req.params.id;
    const expire = req.params.expire;
    redisInstance.expire(slackId, expire);
    res.sendStatus(200);
});

app.get("/delete/:id/", (req, res) => {

    const slackId = req.params.id;
    redisInstance.delete(slackId);
    res.sendStatus(200);
});

app.get("/rename/:originKey/:rename", (req, res) => {

    const originKey = req.params.originKey;
    const rename = req.params.rename;
    redisInstance.rename(originKey, rename);
    res.sendStatus(200);
});

app.get("/get/:id/", async (req, res) => {

    const slackId = req.params.id;
    const token = await redisInstance.get(slackId);
    res.send("slackId: "+slackId+", token: "+token);
});

app.get("/exists/:id/", async (req, res) => {

    const slackId = req.params.id;
    const isExists = await redisInstance.exists(slackId);
    res.send("slackId: "+slackId+" isExists: "+isExists);
});

app.listen(3003, () => {
    console.log("Listening port 3003");
});