<script setup>
const props = defineProps(['label', 'keyword', 'active']);
const emit = defineEmits(['onSelect']);
</script>

<template>
  <div
    @click="$emit('onSelect', props.keyword)"
    class="border rounded-full px-3 py-1 text-sm font-semibold flex-none cursor-pointer"
    :class="
      props.active == props.keyword
        ? 'bg-red-500 text-white border-red-500'
        : 'bg-white text-gray-500'
    "
  >
    {{ props.label }}
  </div>
</template>
