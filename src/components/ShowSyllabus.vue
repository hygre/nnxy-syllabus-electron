<template>
  <div id="ShowSyllabus" class="vh-100 my-bg14">

    <div class="d-flex align-items-center frame-height drag">
      <span class="badge rounded-pill my-bg1 ms-2 cursor-pointer no-drag" @click="getSyllabus()">本周</span>
      <span class="badge rounded-pill my-bg2 ms-2 cursor-pointer no-drag" @click="getSyllabus(currentZc > 1 ? --currentZc : currentZc)">上一周</span>
      <span class="badge rounded-pill my-bg8 ms-2 no-drag"><strong>第{{ currentZc }}周</strong></span>
      <span class="badge rounded-pill my-bg2 ms-2 cursor-pointer no-drag" @click="getSyllabus(++currentZc)">下一周</span>
    </div>

    <div class="container ms-1">

      <div class="row th-height">
        <div class="tr-start text-black-50"><strong>#</strong></div>
        <div class="col text-black-50"><strong>周一</strong></div>
        <div class="col text-black-50"><strong>周二</strong></div>
        <div class="col text-black-50"><strong>周三</strong></div>
        <div class="col text-black-50"><strong>周四</strong></div>
        <div class="col text-black-50"><strong>周五</strong></div>
        <div class="col text-black-50"><strong>周六</strong></div>
        <div class="col text-black-50"><strong>周日</strong></div>
      </div>

      <div v-for="(v, i) in syllabusData" :key="i" class="row tb-height pt-1">

        <div class="tr-start p-0">
          <div v-if="v[0]" class="h-100 text-black-50 text-center d-flex flex-column rounded-2">
            <h6 class="pt-1"><strong>{{ v[0].index }}</strong></h6>
            <h6 class="fs-sm"><strong>{{ v[0].start }}</strong></h6>
            <h6 class="fs-sm"><strong>{{ v[0].end }}</strong></h6>
          </div>
        </div>

        <div class="col">
          <div v-if="v[1]" class="h-100 my-bg10 text-light text-center d-flex flex-column rounded-2">
            <h6 class="fs-sm pt-1"><strong>{{ v[1].kcmc }}</strong></h6>
            <h6 class="fs-sm m-0">{{ v[1].jsmc }}</h6>
            <h6 class="fs-sm">{{ v[1].jsxm }}</h6>
          </div>
        </div>

        <div class="col">
          <div v-if="v[2]" class="h-100 my-bg5 text-light text-center d-flex flex-column rounded-2">
            <h6 class="fs-sm pt-1"><strong>{{ v[2].kcmc }}</strong></h6>
            <h6 class="fs-sm m-0">{{ v[2].jsmc }}</h6>
            <h6 class="fs-sm">{{ v[2].jsxm }}</h6>
          </div>
        </div>

        <div class="col">
          <div v-if="v[3]" class="h-100 my-bg6 text-light text-center d-flex flex-column rounded-2">
            <h6 class="fs-sm pt-1"><strong>{{ v[3].kcmc }}</strong></h6>
            <h6 class="fs-sm m-0">{{ v[3].jsmc }}</h6>
            <h6 class="fs-sm">{{ v[3].jsxm }}</h6>
          </div>
        </div>

        <div class="col">
          <div v-if="v[4]" class="h-100 my-bg7 text-light text-center d-flex flex-column rounded-2">
            <h6 class="fs-sm pt-1"><strong>{{ v[4].kcmc }}</strong></h6>
            <h6 class="fs-sm m-0">{{ v[4].jsmc }}</h6>
            <h6 class="fs-sm">{{ v[4].jsxm }}</h6>
          </div>
        </div>

        <div class="col">
          <div v-if="v[5]" class="h-100 my-bg8 text-light text-center d-flex flex-column rounded-2">
            <h6 class="fs-sm pt-1"><strong>{{ v[5].kcmc }}</strong></h6>
            <h6 class="fs-sm m-0">{{ v[5].jsmc }}</h6>
            <h6 class="fs-sm">{{ v[5].jsxm }}</h6>
          </div>
        </div>

        <div class="col">
          <div v-if="v[6]" class="h-100 my-bg9 text-light text-center d-flex flex-column rounded-2">
            <h6 class="fs-sm pt-1"><strong>{{ v[6].kcmc }}</strong></h6>
            <h6 class="fs-sm m-0">{{ v[6].jsmc }}</h6>
            <h6 class="fs-sm">{{ v[6].jsxm }}</h6>
          </div>
        </div>

        <div class="col">
          <div v-if="v[7]" class="h-100 my-bg3 text-light text-center d-flex flex-column rounded-2">
            <h6 class="fs-sm pt-1"><strong>{{ v[7].kcmc }}</strong></h6>
            <h6 class="fs-sm m-0">{{ v[7].jsmc }}</h6>
            <h6 class="fs-sm">{{ v[7].jsxm }}</h6>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ShowSyllabus",
  data () {
    return {
      syllabusData: [],
      currentZc: 0
    }
  },
  mounted() {
    this.currentZc = window.currentTime.zc
    this.getSyllabus()
  },
  methods: {
    getSyllabus(zc) {
      if (zc === undefined) this.currentZc = window.currentTime.zc
      window.api
          .getKbcxAzc(zc)
          .then(r => {
            this.syllabusData = [
              [{index: 1, start: '08:20', end: '09:50'},'','','','','','',''],
              [{index: 2, start: '10:05', end: '11:35'},'','','','','','',''],
              [{index: 3, start: '14:30', end: '16:00'},'','','','','','',''],
              [{index: 4, start: '16:10', end: '17:40'},'','','','','','',''],
              [{index: 5, start: '18:30', end: '19:55'},'','','','','','',''],
              [{index: 6, start: '20:05', end: '21:30'},'','','','','','','']
            ]
            r.forEach(v => {
              let week = parseInt(v.kcsj[0])
              let courseIndex = parseInt(v.kcsj.substr(3, 2)) / 2
              this.syllabusData[courseIndex - 1][week] = {kcmc: v.kcmc, jsmc: v.jsmc, jsxm: v.jsxm}
            })
          })
    }
  }
}
</script>

<style scoped>
* {
  /*border: solid 1px;*/
}
.tr-start {
 width: 30px;
}
.th-height {
  height: 36px;
}
.tb-height{
  height: 78px;
}
.fs-sm{
  font-size: 10px;
}
</style>