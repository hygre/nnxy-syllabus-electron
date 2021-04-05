<template>
  <div id="home">

    <div class="d-flex">

      <div id="sideBar" class="vh-100 bg-light d-flex flex-column">

        <div class="d-flex align-items-center frame-height drag">
          <NavBarCtrlBtn></NavBarCtrlBtn>
        </div>

        <div class="list-group">
          <a class="list-group-item list-group-item-action list-group-item-danger p-3 rounded-0 border-0"
             @click="$router.push({ name: 'ShowCalendar' })">
            🕺 Hello! {{ userData.user.username }}
          </a>
          <a class="list-group-item list-group-item-action list-group-item-warning p-3 rounded-0 border-0"
             @click="$router.push({ name: 'ShowSyllabus' })">
            📚 课程表
          </a>
          <a class="list-group-item list-group-item-action list-group-item-success p-3 rounded-0 border-0"
             @click="$router.push({ name: 'ShowScore' })">
            💯 查成绩
          </a>
        </div>

        <div class="mt-auto">
          <span @click="help" class="badge rounded-pill my-bg8 ms-2 cursor-pointer no-drag">💬 反馈</span>
          <span @click="loginOut" class="badge rounded-pill my-bg1 ms-2 cursor-pointer no-drag">🚪 登出</span>
        </div>

      </div>

      <div id="showArea" class="flex-fill">
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

    </div>

  </div>
</template>

<script>
import NavBarCtrlBtn from "@/components/NavBarCtrlBtn"

export default {
  name: 'Home',
  components: {
    NavBarCtrlBtn
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    loginOut() {
      localStorage.removeItem('userData')
      this.$router.push({name: 'Login'})
    },
    openDevTools() {
      window.ipcRenderer.send('openDevTools')
    },
    help() {
      window.shell.openExternal('http://wpa.qq.com/msgrd?v=3&uin=1969735685')
    }
  }
}
</script>

<style scoped>

.slide-fade-enter-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-leave-active {
  transition: all 0s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0.5;
}

/** {*/
/*  border: solid 1px;*/
/*}*/
#sideBar {
  width: 240px;
}

.frame-height {
  height: 36px;
}

.drag {
  -webkit-app-region: drag
}
</style>