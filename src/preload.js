import {ipcRenderer, shell} from 'electron'
import axios from 'axios'
import dateFormat from 'dateformat'

const API = "http://jw.nnxy.cn/app.do?";
const WeatherUrl = "https://devapi.qweather.com/v7/weather/now?"
let userData = ''
let currentTime = ''
let admission = ''

let actions = {
    getAuthUser,
    getCurrentTime,
    getKbcxAzc,
    getCjcx,
    updateUserData,
    updateWeatherData
}

updateUserData()

window.ipcRenderer = ipcRenderer
window.shell = shell
window.api = actions


async function getQZApiData(config) {
    return await axios
        .get(API, config)
        .then(res => res.data)
}

async function getWeatherData(config) {
    return await axios
        .get(WeatherUrl, config)
        .then(res => res.data)
}

function getAuthUser(xh, pwd) {
    return getQZApiData({
        params: {
            method: 'authUser',
            xh: xh,
            pwd: pwd
        }
    });
}

function getCurrentTime(token = userData.token) {
    return getQZApiData({
        params: {
            method: 'getCurrentTime',
            currDate: dateFormat(new Date(), "isoDate").toString()
        },
        headers: {
            token: token
        }
    });
}

function getKbcxAzc(zc = currentTime.zc, xnxqid = currentTime.xnxqh, token = userData.token, xh = userData.user.useraccount) {
    return getQZApiData({
        params: {
            method: 'getKbcxAzc',
            xh: xh,
            xnxqid: xnxqid,
            zc: zc
        },
        headers: {
            token: token
        }
    });
}

function getCjcx(xnxqid = currentTime.xnxqh, token = userData.token, xh = userData.user.useraccount) {
    return getQZApiData({
        params: {
            method: 'getCjcx',
            xh: xh,
            xnxqid: xnxqid,
        },
        headers: {
            token: token
        }
    });
}

function updateUserData() {

    const localUserData = JSON.parse(localStorage.getItem('userData'))

    if (localUserData) {

        const xh = localUserData.user.useraccount
        const pwd = localUserData.user.userpasswd

        getAuthUser(xh, pwd)
            .then(res => {

                localStorage.setItem('userData', JSON.stringify(res))
                userData = JSON.parse(localStorage.getItem('userData'))
                admission = parseInt(userData.user.useraccount.substr(0, 4), 10)

                getCurrentTime().then(r => {
                    currentTime = r
                    window.userData = userData
                    window.currentTime = currentTime
                    window.admission = admission
                })
            })
    }
}

function updateWeatherData() {
    return getWeatherData({
            params: {
                key: 'af4b03230c4248818b63c1f27f7ad0a5',
                location: '101300103'
            }
        })
}