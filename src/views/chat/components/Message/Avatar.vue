<script lang="ts" setup>
import { NAvatar } from 'naive-ui'

interface Props {
  image?: boolean
}
defineProps<Props>()
</script>

<template>
  <NAvatar round :src="image ? 'https://img.wxcha.com/m00/2c/df/ad94ce41a34a333a02400a3f1c3745a1.jpg?down' : 'https://img.wxcha.com/m00/2c/df/ad94ce41a34a333a02400a3f1c3745a1.jpg?down'" />
</template>
