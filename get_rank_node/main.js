const fs = require("fs");
const https = require("https");
const { callbackify } = require("util");
const config = require("./config.json");
const { Profile } = require('./type');

function request(battle_tag, callback) {
    var adress = `https://ow-api.com/v1/stats/pc/eu/${battle_tag}/profile`
    var body = ""

    const request = https.get(adress, (res) => {
        res.on('data', (data) => {
            body += data
        })
        res.on('end', () => {
            if (res.headers['content-type'] == "application/json") {
                body = JSON.parse(body)
            }
            callback(body)
        });
    });
}

function get_request(battle_tag, callback) {
    request(battle_tag, /** @param { Profile } body */(body) => {
        var ranks = { tank: {level: 0, icon: ""}, damage: {level: 0, icon: ""}, support: {level: 0, icon: ""} }
        if (body.ratings) {
            for (let i = 0; i < body.ratings.length; i++) {
                ranks[body.ratings[i].role].level = body.ratings[i].level
                ranks[body.ratings[i].role].icon = body.ratings[i].rankIcon
            }
        }
        var newProfile = {
            request: body,
            levels: {
                level: body.level + body.prestige * 100,
                endorsement: body.endorsement,
                endorsementIcon: body.endorsementIcon
            },
            ranks: ranks,
            battle_tag: body.name
        }
        console.log(`ACCOUNT ${newProfile.battle_tag} UPDATE`)
        callback(newProfile)
    });
};

function get_all_profile() {
    var profileList = []

    for (let i = 0; i < config.battle_tag.length; i++) {
        get_request(config.battle_tag[i], (profile) => {
            profileList.push(profile)
            if (profileList.length == config.battle_tag.length)
                console.table(profileList)
                fs.writeFileSync("allProfile.json", JSON.stringify(profileList))
                console.log("FILE GENERATE")
        });
    }
};

get_all_profile()