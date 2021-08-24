export default class DayWeather {
    constructor(id, description, temperature, date) {
        this.id = id;
        this.description = description;
        this.temperature = temperature;
        this.date = date;
    }

    findIco(hours) {
        if(this.id >= 200 && this.id < 300) {
            return "img/icons/thunderstorm.svg#storm";
        } else if(this.id >= 300 && this.id < 500) {
            return "img/icons/rain.svg#rain";
        } else if(this.id >= 500 && this.id < 600) {
            return "img/icons/rain.svg#rain";
        } else if(this.id >= 600 && this.id < 700) {
            return "img/icons/snowflake.svg#snow";
        } else if(this.id >= 700 && this.id < 800) {
            return "img/icons/mist.svg#fog";
        } else if(this.id == 800 && hours <= 6) {
            return "img/icons/moon-phase.svg#moon";
        } else if(this.id == 800 && hours < 22) {
            return "img/icons/sunny.svg#sunny";
        } else if(this.id == 800 && hours >= 22) {
            return "img/icons/moon-phase.svg#moon";
        } else if(this.id == 801 && hours <= 6) {
            return "img/icons/fewcloudsmoon.svg#fewmoon";
        } else if(this.id == 801 && hours < 22) {
            return "img/icons/fewcloudssunny.svg#fewsunny";
        } else if(this.id == 801 && hours >= 22) {
            return "img/icons/fewcloudsmoon.svg#fewmoon";
        } else if(this.id > 801) {
            return "img/icons/cloud-computing.svg#cloud";
        }
    }
}