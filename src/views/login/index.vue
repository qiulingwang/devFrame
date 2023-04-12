<script lang="ts" setup>
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  NTabPane,
  NTabs,
  useMessage,
} from 'naive-ui'
import { reactive, ref } from 'vue'
import { useAuthStoreWithout } from '@/store'
import { login } from '@/api'
interface Emit {
  (e: 'loginSuccess'): void
}

const props = defineProps(['tab'])
const emit = defineEmits<Emit>()
function handleClick() {
  emit('loginSuccess')
}
const message = useMessage()
const tabStr = ref(props.tab || 'login')
// const router = useRouter()

const loginForm = reactive({
  email: '',
  password: '',
})

async function loginEvent() {
  try {
    const res = await login<any>(loginForm) as any
    const authStore = useAuthStoreWithout()

    authStore.setToken(res.loginToken)

    handleClick()
  }
  catch (error: any) {
    message.info(error.msg, { duration: 5000 })
  }
}
</script>

<template>
  <NTabs v-model:value="tabStr" justify-content="space-evenly" type="line">
    <NTabPane name="login" tab="登录">
      <NForm ref="formRef" :model="loginForm" :style="{ maxWidth: '640px' }" class="auto" style="margin:0 auto;">
        <NFormItem
          label="邮箱" path="email" :rule="{
            required: true,
            message: '请输入邮箱',
            trigger: ['input', 'blur'],
          }"
        >
          <NInput v-model:value="loginForm.email" placeholder="请输入邮箱" clearable />
        </NFormItem>
        <NFormItem
          label="密码" path="password" :rule="{
            required: true,
            message: '密码由字母、数字或下划线组成！',
            trigger: ['input', 'blur'],
          }"
        >
          <NInput
            v-model:value="loginForm.password" placeholder="密码由字母、数字或下划线组成！" type="password"
            show-password-on="mousedown"
          />
        </NFormItem>

        <NFormItem>
          <NSpace>
            <NButton attr-type="button" @click="loginEvent">
              登录
            </NButton>
          </NSpace>
        </NFormItem>
      </NForm>
    </NTabPane>
  </NTabs>
</template>
