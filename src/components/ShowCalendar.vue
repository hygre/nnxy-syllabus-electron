<template>

  <div id="ShowCalendar" class="vh-100 my-bg13">

    <div class="d-flex align-items-center frame-height drag">
      <span class="badge rounded-pill my-bg6 ms-2 no-drag">一览</span>
      <span class="badge rounded-pill my-bg5 ms-2 no-drag">南院天气</span>
      <span class="badge rounded-pill my-bg3 ms-2 no-drag">{{ weatherData.text }}</span>
      <span class="badge rounded-pill my-bg9 ms-2 no-drag">{{ weatherData.temp }}℃</span>
      <span class="badge rounded-pill my-bg10 ms-2 no-drag">{{ weatherData.windDir }}</span>
      <span class="badge rounded-pill my-bg1 ms-2 no-drag">第{{ curWeek }}周</span>
      <span class="badge rounded-pill my-bg2 ms-2 no-drag">星期{{ weekList[day] }}</span>
    </div>

    <div class="row">

      <div class="col">

        <div class="ms-2">
          <h1 class="text-black-50"><strong>Today</strong></h1>
          <h6 v-if="!curDayCurse[0]" class="text-black-50 mt-3"><strong>今天没课，快去图书馆自习吧! 😸</strong></h6>
          <div v-for="v in curDayCurse" :key="v.kcsj">
            <h6 class="text-black-50 mt-2"><strong>{{ v.kssj + '-' + v.jssj }}</strong></h6>
            <h6 class="text-black-50 mt-2"><strong>{{ v.kcmc + ' ' + v.jsmc }}</strong></h6>
          </div>
        </div>

      </div>

      <div class="col">

        <div>
          <h1 class="text-black-50"><strong>Tomorrow</strong></h1>
          <h5 v-if="!nextDayCurse[0]" class="text-black-50"><strong>明天没课，考虑跟小伙伴们到处去逛逛? 😹</strong></h5>
          <div v-for="v in nextDayCurse" :key="v.kcsj">
            <h6 class="text-black-50 mt-2"><strong>{{ v.kssj + '-' + v.jssj }}</strong></h6>
            <h6 class="text-black-50 mt-2"><strong>{{ v.kcmc + ' ' + v.jsmc }}</strong></h6>
          </div>
        </div>

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
* {
  /*border: solid 1px;*/
}
</style>