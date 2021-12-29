var socket = io();

socket.on("connect", () => {
    socket.emit("profile")
});

var DOMTbody = document.getElementsByTagName("tbody")[0]
var DOMTfoot = document.getElementsByTagName("tfoot")[0]

socket.on("profile", (file) => {
    /** @type {import("../type").newProfile[]} */
    const profile = JSON.parse(file)
    console.log(profile)
    DOMTbody.innerHTML = ""
    if (profile.length) {
        var levelTotal = 0
        var AverageEndrosement = 0
        var AverageTank = 0
        var AverageDamage = 0
        var AverageSupport = 0
        var CountTank = 0
        var CountDamage = 0
        var CountSupport = 0

        for (let i = 0; i < profile.length; i++) {
            levelTotal += profile[i].levels.level
            AverageEndrosement += profile[i].levels.endorsement
            AverageTank += profile[i].ranks.tank.level
            AverageDamage += profile[i].ranks.damage.level
            AverageSupport += profile[i].ranks.support.level
            CountTank += profile[i].ranks.tank.level != 0
            CountDamage += profile[i].ranks.damage.level != 0
            CountSupport += profile[i].ranks.support.level != 0

            let tr = document.createElement("tr")

            let tdBtag = document.createElement("td")
            let tdNiveau = document.createElement("td")
            let tdRecomendation = document.createElement("td")
            let tdTank = document.createElement("td")
            let tdDamage = document.createElement("td")
            let tdSupport = document.createElement("td")
            let imgRecomendation = document.createElement("img")
            let imgTank = document.createElement("img")
            let imgDamage = document.createElement("img")
            let imgSupport = document.createElement("img")

            tdBtag.textContent = profile[i].battle_tag
            tdNiveau.textContent = profile[i].levels.level
            tdRecomendation.textContent = profile[i].levels.endorsement
            tdTank.textContent = profile[i].ranks.tank.level
            tdDamage.textContent = profile[i].ranks.damage.level
            tdSupport.textContent = profile[i].ranks.support.level

            imgRecomendation.src = profile[i].levels.endorsementIcon
            imgTank.src = profile[i].ranks.tank.icon
            imgDamage.src = profile[i].ranks.damage.icon
            imgSupport.src = profile[i].ranks.support.icon

            tdRecomendation.appendChild(imgRecomendation)
            tdTank.appendChild(imgTank)
            tdDamage.appendChild(imgDamage)
            tdSupport.appendChild(imgSupport)

            tr.appendChild(tdBtag)
            tr.appendChild(tdNiveau)
            tr.appendChild(tdRecomendation)
            tr.appendChild(tdTank)
            tr.appendChild(tdDamage)
            tr.appendChild(tdSupport)
            DOMTbody.appendChild(tr)
        }
        let tr = document.createElement("tr")

        let tdBtag = document.createElement("td")
        let tdNiveau = document.createElement("td")
        let tdRecomendation = document.createElement("td")
        let tdTank = document.createElement("td")
        let tdDamage = document.createElement("td")
        let tdSupport = document.createElement("td")

        tdNiveau.textContent = `Niveau total: ${levelTotal}`
        tdRecomendation.textContent = `Moyenne recomandation: ${Math.round(AverageEndrosement / profile.length)}`
        tdTank.textContent = `Moyenne Tank: ${Math.round(AverageTank / CountTank)}`
        tdDamage.textContent = `Moyenne Damage: ${Math.round(AverageDamage / CountDamage)}`
        tdSupport.textContent = `Moyenne Support: ${Math.round(AverageSupport / CountSupport)}`

        tr.appendChild(tdBtag)
        tr.appendChild(tdNiveau)
        tr.appendChild(tdRecomendation)
        tr.appendChild(tdTank)
        tr.appendChild(tdDamage)
        tr.appendChild(tdSupport)
        DOMTfoot.appendChild(tr)
    } else {}
});