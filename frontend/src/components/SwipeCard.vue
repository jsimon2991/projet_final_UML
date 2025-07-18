<script setup>
const props = defineProps(['pet'])
const emit = defineEmits(['like', 'dislike'])
</script>

<template>
  <div class="swipe-card">
    <img :src="pet.photoUrl" class="pet-photo" :alt="pet.name" />
    <div class="info">
      <h2>{{ pet.name }}, {{ pet.age }} ans</h2>
      <p>{{ pet.species }} • {{ pet.size }}</p>
      <p>Énergie : {{ pet.energy }}</p>
      <div class="buttons">
        <button class="dislike" @click="$emit('dislike')">❌</button>
        <button class="like" @click="$emit('like', pet)">❤️</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swipe-card {
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 10px 32px #0001;
  max-width: 340px;
  width: 100%;
  padding: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 30px auto;
}
.pet-photo {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
.info {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
h2 {
  font-size: 1.4rem;
  font-weight: bold;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
button {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;
  cursor: pointer;
}
.like {
  background: #b1ffc6;
}
.dislike {
  background: #ffb1b1;
}
@media (max-width: 600px) {
  .swipe-card {
    max-width: 97vw;
  }
  .pet-photo {
    height: 170px;
  }
}
</style>
