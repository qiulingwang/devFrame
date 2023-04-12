<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NCard, NInput, NModal } from 'naive-ui'
import { Message } from './components'
import { useScroll } from './hooks/useScroll'
import { SvgIcon } from '@/components/common'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore } from '@/store'
import Login from '@/views/login/index.vue'
import { t } from '@/locales'

const showModal = ref(false)
const appStore = useAppStore()
appStore.setTheme('dark')
const { isMobile } = useBasicLayout()
const { scrollRef } = useScroll()
const prompt = ref<string>('')

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    handleSubmit()
  }
}
function handleSubmit() {
  alert('你好')
}

const placeholder = computed(() => {
  if (isMobile.value)
    return t('chat.placeholderMobile')
  return t('chat.placeholder')
})

const wrapClass = computed(() => {
  if (isMobile.value)
    return ['pt-14']
  return []
})

const footerClass = computed(() => {
  let classes = ['p-4', 'pt-0']
  if (isMobile.value)
    classes = ['sticky', 'left-0', 'bottom-0', 'right-0', 'p-2', 'pt-0', 'pr-4', 'overflow-hidden']
  return classes
})

const myItem = ref({
  key: 1,
  dateTime: '2023/4/12 10:09:48',
  text: '你好,chart',
  inversion: 1,
})

const chatItem = ref({
  key: 2,
  dateTime: '2023/4/12 10:10:48',
  text: '你好,世界',
  inversion: 0,
})
</script>

<template>
  <div class="flex flex-col w-full h-full" :class="wrapClass">
    <main class="flex-1 overflow-hidden">
      <div id="scrollRef" ref="scrollRef" class="h-full overflow-hidden overflow-y-auto">
        <div id="image-wrapper" class="w-full max-w-screen-xl m-auto" :class="[isMobile ? 'p-2' : 'p-4']">
          <div>
            <Message :key="myItem.key" :date-time="myItem.dateTime" :text="myItem.text" :inversion="myItem.inversion" />
            <Message
              :key="chatItem.key" :date-time="chatItem.dateTime" :text="chatItem.text"
              :inversion="chatItem.inversion"
            />
          </div>
        </div>
      </div>
    </main>
    <!-- <Tips @login="showModelEvent" /> -->
    <footer :class="footerClass">
      <div class="w-full max-w-screen-xl m-auto">
        <div class="moss-btns flex items-center justify-between space-x-2">
          <!-- 左侧拓展区域 -->
          <div class="left-btns" />
          <NInput
            v-if="!prompt || prompt[0] !== '/'" v-model:value="prompt" autofocus type="textarea"
            :autosize="{ minRows: 1, maxRows: 5 }" :placeholder="placeholder" clearable @keydown="handleEnter"
          />

          <!-- 发送按钮 -->
          <div class="btn-style">
            <NButton id="ask-question" type="primary" @click="handleSubmit">
              <template #icon>
                <span class="dark:text-black">
                  <SvgIcon icon="ri:send-plane-fill" />
                </span>
              </template>
            </NButton>
          </div>
        </div>
      </div>
    </footer>
    <NModal v-model:show="showModal" transform-origin="center">
      <NCard style="width:80%;max-width: 600px;" title="" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <Login @loginSuccess="() => { handleSubmit() }" />
      </NCard>
    </NModal>
  </div>
</template>

<style lang="less">
.no-data-info {
  margin-top: 5%;

  .no-data-info-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 600;
    width: 100%;
    color: #6C7275;
    text-align: center;

    span {
      position: absolute;
      margin-left: 10px;
    }
  }

  .no-data-info-tip {
    font-size: 12px;
    line-height: 12px;
    font-weight: 600;
    width: 100%;
    color: #6C7275;
    text-align: center;
    margin-top: 14px;
    margin-bottom: -14px;
  }

  .no-data-btns-list {
    width: 80%;
    max-width: 520px;
    height: auto;
    margin: 0 auto;
    margin-top: 40px;

    .no-data-btns-item {
      width: 100%;
      padding: 20px 20px;
      height: auto;
      border: 1px solid #343839;
      border-radius: 6px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      /* 显示小手 */
      &:hover {
        border: 1px solid #3c9af7;
      }

      .btns-item-img {
        width: 20px;
        height: 20px;
      }

      .btns-item-text {
        width: 400px;
        margin-left: 20px;
        margin-right: 20px;
        color: #c9c9c9;
      }

      .btns-item-right-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.tip {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.sustain {
  height: 20px;
  font-size: 0.75rem;
  letter-spacing: 0.2rem;
  color: #666;
  width: auto;
  text-align: center;
  margin-right: 20px;
}

.n-input.n-input--textarea {
  border-radius: 50px;
}

/* 隐藏滚动进度条 */
::-webkit-scrollbar {
  display: none;
}

.moss-btns {
  position: relative;
}

.btn-style {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-style button {
  width: 50px;
  height: 30px;
}

.moss-text {
  width: 80px;
  font-size: 12px;
  text-align: center;
  margin-top: 2px;
  white-space: nowrap;
}

.setting {
  width: 100%;
  padding: 0px 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .setting-main {
    display: flex;
    align-items: center;
    cursor: pointer;

    .setting-text {
      color: #FF6666;
      font-size: 10px;
    }

    .setting-btn {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
  }
}

.line {
  margin-top: 10px;
  margin-bottom: 10px;
}

.color {
  color: #f87171;
}

.tip-text {
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.mt10 {
  margin-top: 10px;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.van-notice-bar {
  background-color: #111114 !important;
  color: #fff;
  text-align: center;

  .van-notice-bar__wrap {
    display: flex;
    justify-content: center;

    .van-swipe-item {
      color: #FF6666;
      font-size: 12px;
    }
  }
}

.relevance-main {
  display: flex;
  justify-items: center;
  color: #FF6666 !important;
  align-items: center;
  margin-right: 20px;

  .relevance-main-text {
    font-size: 12px;
    margin-left: 6px;
  }
}

:root:root {
  --van-switch-size: 15px;
}

.shake {
  transform-origin: bottom bottom;
  animation: animashake 1.5s .2s ease-in-out both infinite;
}

@keyframes animashake {

  0%,
  100% {
    transform: rotate(0deg);
    transform-origin: 50% 0;
  }

  5% {
    transform: rotate(2deg);
  }

  10%,
  20%,
  30% {
    transform: rotate(-4deg);
  }

  15%,
  25%,
  35% {
    transform: rotate(4deg);
  }

  40% {
    transform: rotate(-2deg);
  }

  45% {
    transform: rotate(2deg);
  }

  50% {
    transform: rotate(0deg);
  }
}

#scrollRef {
  display: flex;
}

.left-btns {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .network-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
    filter: grayscale(0%);

    &:active {
      transform: scale(.96);
    }
  }

  .network-btn-filter {
    filter: grayscale(90%);
  }
}
</style>
