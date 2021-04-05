<template>

  <div id="ShowCalendar" class="vh-100 my-bg13">

    <div class="d-flex align-items-center frame-height drag">
      <span class="badge rounded-pill my-bg6 ms-2 no-drag">一览</span>
      <span class="badge rounded-pill my-bg5 ms-2 no-drag">南院天气</span>
      <span class="badge rounded-pill my-bg3 ms-2 no-drag">{{ weatherData.text }}</span>
      <span class="badge rounded-pill my-bg9 ms-2 no-drag">{{ weatherData.temp }}℃</span>
      <span class="badge rounded-pill my-bg10 ms-2 no-drag">{{ weatherData.windDir }}</span>
    </div>

    <div class="row">

      <div class="col ms-2">
        <div>
          <h1 class="text-black-50"><strong>Today</strong></h1>
          <h5 v-if="!curDayCurse[0]" class="text-black-50 mt-3"><strong>今天没课，快去图书馆自习吧! 😸</strong></h5>
          <h4 v-for="v in curDayCurse" :key="v.kcsj" class="text-black-50 mt-3"><strong>{{v.kssj + '-' +v.jssj + " " + v.kcmc }}</strong></h4>
        </div>
        <div class="mt-5">
          <h1 class="text-black-50"><strong>Tomorrow</strong></h1>
          <h5 v-if="!nextDayCurse[0]" class="text-black-50"><strong>明天没课，考虑跟小伙伴们到处去逛逛? 😹</strong></h5>
          <h4 v-for="v in nextDayCurse" :key="v.kcsj" class="text-black-50 mt-3"><strong>{{v.kssj + '-' +v.jssj + " " + v.kcmc }}</strong></h4>
        </div>
      </div>

      <div class="col d-flex">
        <div class="align-self-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 32 32"><g transform="translate(2170.028 611.663)"><rect width="8.5" height="4" x="-2167.028" y="-597.038" fill="#d7a99b"/><rect width="8.5" height="4" x="-2167.028" y="-593.038" fill="#e4c3bc"/><rect width="8.5" height="4" x="-2167.028" y="-589.038" fill="#d7a99b"/><g stroke="#586597" transform="translate(-2170.028 -1631.4)"><path fill="#cb9b9b" stroke="none" d="M 2.0000019,1032.3622 H 30.000002 v 2 H 2.0000019 Z"/><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M 2.0000019,1032.3622 H 30.000002 v 2 H 2.0000019 Z"/><g transform="translate(-1.419)"><path fill="#f7e17b" stroke="none" d="m 22.987312,1024.1954 c 0.550553,-0.6013 1.486505,-0.6445 2.090588,-0.096 0.60407,0.5479 0.647523,1.4797 0.09697,2.081 -0.550554,0.6014 -2.710651,-1.4106 -2.160073,-2.0119 z"/><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="m 25.375683,1030.8622 h 3.543349"/><path fill="none" stroke-linejoin="round" d="m 26.825739,1030.6663 2.066954,-3.8209 -2.362233,-3.233 -1.034244,0.4498"/><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="m 22.987312,1024.1954 c 0.550553,-0.6013 1.486505,-0.6445 2.090588,-0.096 0.60407,0.5479 0.647523,1.4797 0.09697,2.081 -0.550554,0.6014 -2.710651,-1.4106 -2.160073,-2.0119 z"/></g><path fill="none" d="M3.000002 1034.3622v14M29.000002 1034.3622v14M29.000001 1046.2294H2.9921894M11.5 1034.3622v12M3.0000019 1038.3622H11.499999M3.0000019 1042.3622H11.499999"/><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M6.5071211 1036.3622H7.993261M17 1027.8622H12M16 1029.3622H11M17 1030.8622H12M6.5071211 1040.3622H7.993261M6.5071211 1044.3622H7.993261"/></g></g></svg>
        </div>

      </div>
    </div>

    <div class="row">
      <div class="col"></div>
      <div class="col mt-5">
        <h2 class="me-5 text-center text-black-50"><strong>第 {{curWeek}} 周</strong></h2>
        <h2 class="ms-5 mt-3 text-center text-black-50"><strong>星期{{ weekList[day] }}</strong></h2>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "ShowCalendar",
  data() {
    return {
      weekList: ['天', '一', '二', '三', '四', '五', '六'],
      day: 0,
      curWeek: 0,
      curDayCurse: [],
      nextDayCurse: [],
      weatherData: []
    }
  },
  mounted() {
    this.getDaySyllabus()
    this.updateWeather()
  },
  methods: {
    getDaySyllabus(zc) {
      window.api
          .getKbcxAzc(zc)
          .then(r => {
            let curDay = new Date().getDay() === 0 ? 7 : new Date().getDay()
            let nextDay = (curDay + 1) % 7
            this.day = curDay
            this.curWeek = window.currentTime.zc
            this.curDayCurse = r.filter(v => v.kcsj[0] === curDay.toString())
            console.log('hello')
            if (curDay === 7) {
              window.api
                  .getKbcxAzc(window.currentTime.zc + 1)
                  .then(res => {
                    this.nextDayCurse = res.filter(v => v.kcsj[0] === nextDay.toString())
                  })
            } else this.nextDayCurse = r.filter(v => v.kcsj[0] === nextDay.toString())
          })
    },
    updateWeather() {
      window.api
          .updateWeatherData()
          .then(r => this.weatherData = r.now)
    }
  }
}
</script>

<style scoped>
*{
  /*border: solid 1px;*/
}
</style>