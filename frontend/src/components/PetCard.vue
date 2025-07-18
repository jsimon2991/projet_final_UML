<template>
  <div class="pet-card">
    <img :src="pet.photos?.[0] || fallback" alt="Photo animal" />
    <div class="pet-details">
      <div class="title"><b>{{ pet.name }}</b>, {{ pet.age }} ans</div>
      <div class="subtitle">{{ pet.breed || pet.species }} • {{ pet.size || 'Taille inconnue' }}</div>
      <div class="info">Énergie : {{ pet.energy || 'inconnue' }}</div>
    </div>
    <div class="actions">
      <button class="dislike" @click="$emit('dislike', pet.id)">✖️</button>
      <button class="like" @click="$emit('like', pet.id)">❤️</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ pet: Object })
const fallback = 'https://via.placeholder.com/400x250?text=Photo+indisponible'
</script>

<style scoped>
.pet-card {
  width: 340px;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 4px 18px 0 rgba(180,101,231,0.09);
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 20px;
  transition: box-shadow 0.3s;
}
.pet-card img {
  width: 100%;
  height: 270px;
  object-fit: cover;
}
.pet-details {
  padding: 18px 20px 10px 20px;
}
.title { font-size: 1.3rem; margin-bottom: 4px; }
.subtitle { color: #555; margin-bottom: 2px; font-size: 1rem; }
.info { color: #888; font-size: 0.95em; }
.actions {
  display: flex;
  justify-content: center;
  gap: 35px;
  margin-bottom: 20px;
  margin-top: 10px;
}
button.like, button.dislike {
  width: 56px; height: 56px;
  border-radius: 50%;
  font-size: 2.0rem;
  border: none;
  transition: background 0.2s, transform 0.1s;
  box-shadow: 0 2px 8px #e9c4ff60;
  background: #fa72683a;
  cursor: pointer;
}
button.like:hover { background: #c2ffba; transform: scale(1.08);}
button.dislike:hover { background: #ffb1b1; transform: scale(1.08);}
@media (max-width: 600px) {
  .pet-card { width: 98vw; }
  .pet-card img { height: 40vw; min-height: 170px; }
}
</style>
