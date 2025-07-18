<template>
  <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md w-full max-w-md mx-auto mb-4">
    <img :src="match.pet?.photos?.[0] || fallback" alt="Animal" class="w-20 h-20 rounded-xl object-cover" />
    <div>
      <div class="font-bold text-lg">{{ match.pet?.name }}</div>
      <div class="text-sm text-gray-600">{{ match.pet?.species }} • {{ match.pet?.size }}</div>
      <div class="text-xs text-gray-400">Compatibilité : {{ match.compatibilite ? (match.compatibilite*100).toFixed(0) : "?" }}%</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ match: Object })
const fallback = 'https://via.placeholder.com/80x80?text=Pet'
</script>
