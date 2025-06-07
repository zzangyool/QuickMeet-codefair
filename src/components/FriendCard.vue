<template>
  <div class="friend-card">
    <div class="friend-info">
      <div class="friend-avatar">
        {{ friend.name.charAt(0) }}
      </div>
      <div class="friend-details">
        <h3>{{ friend.name }}</h3>
        <div class="friend-status" :class="friend.isAvailable ? 'status-available' : 'status-busy'">
          <div class="status-indicator"></div>
          {{ friend.isAvailable ? '지금 시간 있음!' : '바쁨' }}
        </div>
      </div>
    </div>
    <button 
      @click="$emit('invite', friend)"
      :disabled="!friend.isAvailable"
      class="hangout-btn"
    >
      {{ friend.isAvailable ? '놀자!' : '바쁨' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FriendCard',
  props: {
    friend: {
      type: Object,
      required: true
    }
  },
  emits: ['invite']
}
</script>
