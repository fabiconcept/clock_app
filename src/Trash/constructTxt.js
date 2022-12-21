
const constructTxt = () =>{
    let timeVal = data.time;
    let dh = timeVal.h
    let dm = timeVal.m
    let dateMain = new Date();
    let alDateMain = new Date();
    let Alday = 2;
    alDateMain.setDate(dateMain.getDate() + Alday)
    alDateMain.setHours(dh,dm,0)

    let diffL = alDateMain.getTime() - dateMain.getTime()
    setDiff(diffL)
    let daysDiff = Math.floor(diffL/24/60/60/1000)
    let minsDiff = alDateMain.getMinutes()-dateMain.getMinutes()
    let hrsDiff = Alday === 0 ? alDateMain.getHours() - dateMain.getHours() : (Math.floor(Math.abs(24-(diffL/60/60/1000)))) <= 12 ? (Math.floor(Math.abs(24-(diffL/60/60/1000)))) : (Math.floor(Math.abs(24-(diffL/60/60/1000))))%24
    // console.log({alDateMain: alDateMain.getMinutes(), dateMain: dateMain.getMinutes()})
    
    setLeftTxt(`in ${daysDiff > 0 ? `${daysDiff} ${daysDiff > 1 ? "days": "day"},`: ''} ${hrsDiff > 0 ? `${hrsDiff} ${hrsDiff > 1 ? "hours," : "hour,"}` : ''} ${minsDiff > 0 ? minsDiff : minsDiff+60} ${minsDiff > 1 ? "minutes" : "minute"}`)
}

setInterval(() => {
    constructTxt()
}, 1000);
