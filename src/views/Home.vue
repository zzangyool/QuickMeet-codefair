<template>
  <div class="app-container">
    <!-- 헤더 -->
    <div class="header">
      <h1>🚀 QuickMeet</h1>
      <p>친구들과 즉흥적으로 만나는 가장 쉬운 방법</p>
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 일정 설정 탭 -->
      <div class="tab-content" :class="{ active: activeTab === 'schedule' }">
        <div class="schedule-container">
          <div class="card">
            <div class="card-title">📅 내 여가시간 설정</div>
            
            <!-- 요일 선택 -->
            <div class="day-selector">
              <div 
                v-for="day in days" 
                :key="day"
                class="day-btn"
                :class="{ active: selectedDay === day }"
                @click="selectedDay = day"
              >
                {{ day }}
              </div>
            </div>

            <!-- 시간 선택 -->
            <div class="time-grid">
              <div 
                v-for="time in timeSlots" 
                :key="time"
                class="time-slot"
                :class="{ selected: isTimeSelected(selectedDay, time) }"
                @click="toggleTime(selectedDay, time)"
              >
                {{ time }}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-title">✅ 설정된 시간</div>
            <div v-if="getTotalSelectedTimes() === 0" class="empty-state">
              <div class="empty-state-icon">⏰</div>
              <h3>아직 설정된 시간이 없어요</h3>
              <p>위에서 여가시간을 선택해주세요!</p>
            </div>
            <div v-else>
              <div v-for="day in days" :key="day" v-if="selectedTimes[day] && selectedTimes[day].length > 0">
                <h4 style="margin-bottom: 8px; color: #667eea;">{{ day }}요일</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px;">
                  <span v-for="time in selectedTimes[day]" :key="time" class="friend-tag">
                    {{ time }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 친구 목록 탭 -->
      <div class="tab-content" :class="{ active: activeTab === 'friends' }">
        <div class="card">
          <div class="card-title">👥 친구 관리</div>
          
          <div class="add-friend-section">
            <div class="friend-input-container">
              <input 
                v-model="newFriendName" 
                @keyup.enter="addFriend"
                class="friend-input" 
                placeholder="친구 이름을 입력하세요"
              >
              <button @click="addFriend" class="add-btn">추가</button>
            </div>
          </div>

          <div class="friends-list">
            <div v-if="friends.length === 0" class="empty-state">
              <div class="empty-state-icon">👫</div>
              <h3>친구를 추가해보세요!</h3>
              <p>첫 번째 친구를 추가하고 약속을 잡아보세요</p>
            </div>
            <!-- 친구 카드 인라인 -->
            <div v-for="friend in friends" :key="friend.id" class="friend-card">
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
                @click="inviteFriend(friend)"
                :disabled="!friend.isAvailable"
                class="hangout-btn"
              >
                {{ friend.isAvailable ? '놀자!' : '바쁨' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 타임라인 탭 -->
      <div class="tab-content" :class="{ active: activeTab === 'timeline' }">
        <div class="timeline-section">
          <div class="current-time">
            <h2>{{ getCurrentTime() }}</h2>
            <p>{{ getCurrentDate() }}</p>
          </div>

          <div class="card">
            <div class="card-title">⏰ 지금 만날 수 있는 친구들</div>
            
            <div class="timeline-slots">
              <div v-if="todayAvailableSlots.length === 0" class="empty-state">
                <div class="empty-state-icon">😴</div>
                <h3>아직 만날 수 있는 친구가 없어요</h3>
                <p>친구들을 추가하고 시간을 설정해보세요!</p>
              </div>
              <div v-for="slot in todayAvailableSlots" :key="slot.time" class="timeline-slot">
                <div class="slot-time">{{ slot.time }}</div>
                <div class="slot-description">
                  {{ slot.friends.length }}명의 친구가 시간 있어요! 
                  <span v-if="slot.isCurrentTime" class="pulse" style="color: #22c55e;">● 지금!</span>
                </div>
                <div class="available-friends-tags">
                  <span v-for="friend in slot.friends" :key="friend" class="friend-tag">
                    {{ friend }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 네비게이션 인라인 -->
    <div class="bottom-nav">
      <div class="nav-item" :class="{ active: activeTab === 'schedule' }" @click="activeTab = 'schedule'">
        <div class="nav-icon">📅</div>
        <div class="nav-label">시간설정</div>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'friends' }" @click="activeTab = 'friends'">
        <div class="nav-icon">👥</div>
        <div class="nav-label">친구목록</div>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'timeline' }" @click="activeTab = 'timeline'">
        <div class="nav-icon">⏰</div>
        <div class="nav-label">지금만나기</div>
      </div>
    </div>

    <!-- 모달 인라인 -->
    <div v-if="currentModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-title">{{ currentModal.title }}</div>
        <div class="modal-message">{{ currentModal.message }}</div>
        
        <div v-if="currentModal.type === 'invite'" class="modal-actions">
          <button @click="acceptInvite" class="modal-btn btn-accept">수락</button>
          <button @click="declineInvite" class="modal-btn btn-decline">거절</button>
        </div>
        
        <div v-else-if="currentModal.type === 'loading'" style="display: flex; justify-content: center;">
          <div class="loading"></div>
        </div>
        
        <div v-else class="modal-actions">
          <button @click="closeModal" class="modal-btn btn-primary">확인</button>
        </div>

        <div v-if="currentModal.location" class="location-recommendation">
          <div class="location-title">📍 추천 만남 장소</div>
          <div class="location-name">{{ currentModal.location }}</div>
          <div class="location-distance">{{ currentModal.distance }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeTab: 'timeline',
      selectedDay: '월',
      days: ['월', '화', '수', '목', '금', '토', '일'],
      timeSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
      selectedTimes: {},
      friends: [
        { id: 1, name: '김민수', isAvailable: true },
        { id: 2, name: '박지영', isAvailable: false },
        { id: 3, name: '이준호', isAvailable: true },
        { id: 4, name: '최유진', isAvailable: true },
        { id: 5, name: '장서연', isAvailable: false },
        { id: 6, name: '이서준', isAvailable: true },
        { id: 7, name: '정하늘', isAvailable: false },
        { id: 8, name: '윤도현', isAvailable: true }
      ],
      newFriendName: '',
      currentModal: null,
      locations: [
        { name: '스타벅스 강남점', distance: '두 지점 중간 · 도보 5분' },
        { name: 'CGV 영등포', distance: '지하철 2호선 · 15분' },
        { name: '올림픽공원', distance: '버스 이용 · 20분' },
        { name: '코엑스몰', distance: '지하철 9호선 · 25분' },
        { name: '홍대 걷고싶은거리', distance: '지하철 6호선 · 30분' },
        { name: '한강공원', distance: '자전거 · 10분' },
        { name: '롯데월드타워', distance: '지하철 2호선 · 20분' }
      ]
    }
  },
  computed: {
    todayAvailableSlots() {
      const today = new Date().getDay()
      const todayName = this.days[today === 0 ? 6 : today - 1]
      const currentHour = new Date().getHours()
      
      return this.timeSlots.map(time => {
        const timeHour = parseInt(time.split(':')[0])
        const availableFriends = this.friends
          .filter(friend => friend.isAvailable)
          .map(friend => friend.name)
        
        return {
          time,
          friends: availableFriends,
          isCurrentTime: timeHour === currentHour
        }
      }).filter(slot => slot.friends.length > 0)
    }
  },
  methods: {
    isTimeSelected(day, time) {
      return this.selectedTimes[day] && this.selectedTimes[day].includes(time)
    },
    
    toggleTime(day, time) {
      if (!this.selectedTimes[day]) {
        this.selectedTimes[day] = []
      }
      const index = this.selectedTimes[day].indexOf(time)
      if (index > -1) {
        this.selectedTimes[day].splice(index, 1)
      } else {
        this.selectedTimes[day].push(time)
      }
    },
    
    getTotalSelectedTimes() {
      return Object.values(this.selectedTimes).reduce((total, times) => {
        return total + (times ? times.length : 0)
      }, 0)
    },
    
    addFriend() {
      if (this.newFriendName.trim()) {
        const newFriend = {
          id: Date.now(),
          name: this.newFriendName.trim(),
          isAvailable: Math.random() > 0.4
        }
        this.friends.push(newFriend)
        this.newFriendName = ''
      }
    },
    
    inviteFriend(friend) {
      this.currentModal = {
        type: 'loading',
        title: '초대 전송중...',
        message: `${friend.name}님에게 놀자고 메시지를 보내고 있어요!`
      }
      
      setTimeout(() => {
        const accepted = Math.random() > 0.3
        
        if (accepted) {
          this.currentModal = {
            type: 'accepted',
            title: `${friend.name}님이 수락했어요! 🎊`,
            message: '만남 장소를 추천해드릴게요!',
            location: this.getRandomLocation().name,
            distance: this.getRandomLocation().distance
          }
        } else {
          this.currentModal = {
            type: 'declined',
            title: '아쉽게도...',
            message: `${friend.name}님이 다음 기회에 만나자고 하네요 😅`
          }
        }
      }, 2000)
    },
    
    getRandomLocation() {
      return this.locations[Math.floor(Math.random() * this.locations.length)]
    },
    
    acceptInvite() {
      this.currentModal = {
        type: 'accepted',
        title: '약속 성사! 🎉',
        message: '만남 장소를 추천해드릴게요!',
        location: this.getRandomLocation().name,
        distance: this.getRandomLocation().distance
      }
    },
    
    declineInvite() {
      this.currentModal = null
    },
    
    closeModal() {
      this.currentModal = null
    },
    
    getCurrentTime() {
      return new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    },
    
    getCurrentDate() {
      return new Date().toLocaleDateString('ko-KR', { 
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      })
    }
  },
  
  mounted() {
    console.log('Home 컴포넌트가 마운트되었습니다!')
    
    // 초기 데이터 설정
    this.selectedTimes = {
      '월': ['18:00', '19:00', '20:00'],
      '화': ['17:00', '18:00', '21:00'],
      '수': ['16:00', '19:00', '20:00'],
      '목': ['18:00', '19:00'],
      '금': ['17:00', '18:00', '19:00', '20:00', '21:00'],
      '토': ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      '일': ['11:00', '14:00', '15:00', '16:00', '19:00', '20:00']
    }
    
    // 친구 상태 주기적 업데이트
    setInterval(() => {
      this.friends.forEach(friend => {
        if (Math.random() > 0.95) {
          friend.isAvailable = !friend.isAvailable
        }
      })
    }, 15000)
    
    // 시간 업데이트
    setInterval(() => {
      this.$forceUpdate()
    }, 60000)
    
    // 데모 초대 알림
    setTimeout(() => {
      if (!this.currentModal) {
        this.currentModal = {
          type: 'invite',
          title: '김민수님이 놀자고 해요! 🎮',
          message: '지금 시간 괜찮으세요? 근처 카페에서 만날까요?'
        }
      }
    }, 8000)
  }
}
</script>
