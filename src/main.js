import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'  // Vue Router를 추가
import store from './store'  // Vuex 스토어를 가져옵니다.


loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)  // Vue Router 사용
  .use(store)  // Vuex 스토어를 사용합니다.
  .mount('#app')