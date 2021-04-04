<template>

  <div id="NavBarCtrlBtn">

    <div class="d-flex no-drag">
      <div @click="winClose" class="redBtn ms-2 cursor-pointer"></div>
      <div @click="winMaximize" class="yellowBtn ms-1 cursor-pointer"></div>
      <div @click="winMinimize" class="greenBtn ms-1 cursor-pointer"></div>
    </div>

  </div>

</template>

<script>
export default {
  name: "NavBarCtrlBtn",
  data() {
    return {
      isMaximize: true
    }
  },
  methods: {
    winMinimize() {
      window.ipcRenderer.send('window:minimize')
    },
    winMaximize() {
      window.ipcRenderer.send('window:maximize')
      this.isMaximize = !this.isMaximize
    },
    winClose() {
      window.ipcRenderer.send('window:close')
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.no-drag {
  -webkit-app-region: no-drag
}
.redBtn {
  width: 16px;
  height: 16px;
  border: 1px solid #f46965;
  border-radius: 50%;
  background-color: #f46965;
}
.yellowBtn {
  width: 16px;
  height: 16px;
  border: 1px solid #e9cd06;
  border-radius: 50%;
  background-color: #e9cd06;
}
.greenBtn {
  width: 16px;
  height: 16px;
  border: 1px solid #81d95e;
  border-radius: 50%;
  background-color: #81d95e;
}

</style>