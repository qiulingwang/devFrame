<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NCard, NLayoutSider, NModal } from 'naive-ui'
import Tips from '../../tips.vue'
import List from './List.vue'
import Footer from './Footer.vue'
import Login from '@/views/login/index.vue'
import { useAppStore, useChatStore, useUserStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { getToken } from '@/store/modules/auth/helper'

const userStore = useUserStore()
const showModal = ref(false)
const appStore = useAppStore()
const chatStore = useChatStore()
const token = ref(getToken())

const { isMobile } = useBasicLayout()
const tab = ref('login')
const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: '新建问题', uuid: Date.now(), isEdit: false })
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

// 登录功能
function showModelEvent() {
  tab.value = 'login'
  showModal.value = true
}
function handleSubmit() {
  showModal.value = false
  userStore.residueCountAPI()
  token.value = getToken()
}

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
  <NLayoutSider
    :collapsed="collapsed" :collapsed-width="0" :width="200" :show-trigger="isMobile ? false : 'arrow-circle'"
    collapse-mode="transform" position="absolute" bordered :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed"
  >
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <NButton id="question-btn" dashed block @click="handleAdd">
            新建问题
          </NButton>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>
        <!-- 拓展功能区域 -->
        <div class="continuation">
          <Tips @login="showModelEvent" />
        </div>
        <!-- 登录功能 -->
        <NModal v-model:show="showModal" transform-origin="center">
          <NCard
            style="width:80%;max-width: 600px;" title="" :bordered="false" size="huge" role="dialog"
            aria-modal="true"
          >
            <Login :tab="tab" @loginSuccess="() => { handleSubmit() }" />
          </NCard>
        </NModal>
      </main>
      <Footer />
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 bg-black/40" @click="handleUpdateCollapsed" />
  </template>
</template>

<style lang="less">
.continuation {
  margin-bottom: 20px;
  margin-top: 5px;
}

.setting-main {
  width: 90%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  background-color: #323232;
  margin: 0 auto;
  margin-bottom: 10px;

  &:active {
    transform: scale(.96);
  }

  &:hover {
    background-color: #3c4250;
  }

  .setting-text {
    color: rgba(232, 236, 239, 0.75);
    font-size: 10px;
  }

  .setting-btn {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    margin-right: 12px;
  }
}

.title-h1 {
  margin: 10px 0px;
  color: #FF6666;
}

.title-h2 {
  color: #FF6666;
}

.tip-text-input1 {
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tip-text-input2 {
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  color: #FF6666;
  text-align: center;
}

.tip-text-input3 {
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
}

.shop-img {
  min-width: 260px;
  min-height: 260px;
  width: 260px;
  height: 260px;
  margin: 0 auto;
}

.n-card__content {}
</style>
