import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'  // Vue Router를 추가

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)  // Vue Router 사용
  .mount('#app')