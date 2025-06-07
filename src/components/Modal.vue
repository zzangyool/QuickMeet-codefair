<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-title">{{ modal.title }}</div>
      <div class="modal-message">{{ modal.message }}</div>
      
      <div v-if="modal.type === 'invite'" class="modal-actions">
        <button @click="$emit('accept')" class="modal-btn btn-accept">수락</button>
        <button @click="$emit('decline')" class="modal-btn btn-decline">거절</button>
      </div>
      
      <div v-else-if="modal.type === 'loading'" style="display: flex; justify-content: center;">
        <div class="loading"></div>
      </div>
      
      <div v-else class="modal-actions">
        <button @click="$emit('close')" class="modal-btn btn-primary">확인</button>
      </div>

      <div v-if="modal.location" class="location-recommendation">
        <div class="location-title">📍 추천 만남 장소</div>
        <div class="location-name">{{ modal.location }}</div>
        <div class="location-distance">{{ modal.distance }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  emits: ['accept', 'decline', 'close']
}
</script>
