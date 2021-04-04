<template>
  <div id="ShowScore">
    <div class="flex-fill vh-100 my-bg15">

      <div class="d-flex align-items-center frame-height drag">
        <span class="badge rounded-pill my-bg1 ms-2 cursor-pointer no-drag" @click="getScore()">本学期</span>
        <span class="badge rounded-pill my-bg10 ms-4 cursor-pointer no-drag" @click="getScore(admission + '-' + (admission+1) + '-' + 1)">大一上</span>
        <span class="badge rounded-pill my-bg10 ms-1 cursor-pointer no-drag" @click="getScore(admission + '-' + (admission+1) + '-' + 2)">大一下</span>
        <span class="badge rounded-pill my-bg9 ms-4 cursor-pointer no-drag" @click="getScore((admission + 1) + '-' + (admission+2) + '-' + 1)">大二上</span>
        <span class="badge rounded-pill my-bg9 ms-1 cursor-pointer no-drag" @click="getScore((admission + 1) + '-' + (admission+2) + '-' + 2)">大二下</span>
        <span class="badge rounded-pill my-bg5 ms-4 cursor-pointer no-drag" @click="getScore((admission + 2) + '-' + (admission+3) + '-' + 1)">大三上</span>
        <span class="badge rounded-pill my-bg5 ms-1 cursor-pointer no-drag" @click="getScore((admission + 2) + '-' + (admission+3) + '-' + 2)">大三下</span>
        <span class="badge rounded-pill my-bg4 ms-4 cursor-pointer no-drag" @click="getScore((admission + 3) + '-' + (admission+4) + '-' + 1)">大四上</span>
        <span class="badge rounded-pill my-bg4 ms-1 cursor-pointer no-drag" @click="getScore((admission + 3) + '-' + (admission+4) + '-' + 2)">大四下</span>
      </div>

    <table class="table table-hover table-borderless">
      <thead class="text-black-50">
      <tr>
        <th v-for="(val, index) in table.thead" :key="index" scope="col">{{ val }}</th>
      </tr>
      </thead>
      <tbody>
      <h5 v-if="!table.tbody[0]" class="text-black-50"><strong>本学期还没成绩哦</strong></h5>
      <tr v-for="val in table.tbody" :key="val.kcmc">
        <th scope="row" class="text-black-50">{{ val.kcmc }}</th>
        <td class="text-black-50">{{ val.zcj }}</td>
        <td class="text-black-50">{{ val.xf }}</td>
        <td class="text-black-50">{{ val.kcxzmc }}</td>
      </tr>
      </tbody>
    </table>

    </div>
  </div>
</template>

<script>

export default {
  name: "ShowScore",
  data() {
    return {
      table: {
        thead: ['课程名称', '成绩', '学分', '课程属性'],
        tbody: ''
      },
      admission: window.admission
    }
  },
  mounted() {
    this.getScore()
  },
  methods: {
    getScore(xnxqid) {
      window.api
          .getCjcx(xnxqid)
          .then(r => {
            this.table.tbody = r.result
          })
    }
  }
}
</script>

<style scoped>

</style>