<template>
  <div class="bottom-nav">
    <div class="nav-item" :class="{ active: activeTab === 'schedule' }" @click="$emit('tab-change', 'schedule')">
      <div class="nav-icon">📅</div>
      <div class="nav-label">시간설정</div>
    </div>
    <div class="nav-item" :class="{ active: activeTab === 'friends' }" @click="$emit('tab-change', 'friends')">
      <div class="nav-icon">👥</div>
      <div class="nav-label">친구목록</div>
    </div>
    <div class="nav-item" :class="{ active: activeTab === 'timeline' }" @click="$emit('tab-change', 'timeline')">
      <div class="nav-icon">⏰</div>
      <div class="nav-label">지금만나기</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  emits: ['tab-change']
}
</script>
