<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

import { ref } from 'vue'

const loading = ref(false)
const inputVal = ref('')
const resText = ref({})


async function queryHandler(t) {
  // console.log(inputVal.value);

  try {
    loading.value = true
    const res = await requestWithFetchAbort(inputVal.value)
    console.log(res);
    resText.value = res
    loading.value = false
  } catch (e) {
    if(e.name !== 'AbortError') {
      console.error(e);
      loading.value = false
    }
  }
}

function request(keyword: string) {
  // return new Promise((resolve,reject) => {
  //   fetch('http://127.0.0.1:9090/api?keyword='+keyword)
  //   .then(res => res.json())
  //   .then(data=> {
  //     console.log(data);

  //     resolve(data)
  //   })
  //   .catch(err => {
  //     reject(err)
  //   })
  // })

  return fetch('http://127.0.0.1:9090/api?keyword=' + keyword).then(res => res.json())
}

let currentAbortController: AbortController | null = null
function requestWithFetchAbort(keyword: string) {
  // 取消上次未完成的请求
  if (currentAbortController) {
    currentAbortController.abort()
  }

  // 创建新的 AbortController
  currentAbortController = new AbortController()

  return fetch('http://127.0.0.1:9090/api?keyword=' + keyword, {
    signal: currentAbortController.signal
  }).then(res => res.json())
}
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->

  <!-- <button>点击发送请求</button> -->
  <input type="text" v-model="inputVal" @input="queryHandler">
  <p v-if="loading">正在发送请求 ...</p>
  <h3 style="color:blueviolet">结果: {{ resText }}</h3>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

input {
  padding: 8px 30px;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
