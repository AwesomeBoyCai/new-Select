import { createApp } from 'vue';
//@ts-ignore
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 确保引入 Element Plus 样式
import './index.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
