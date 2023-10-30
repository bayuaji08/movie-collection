<script setup>
defineProps(["error"]);
</script>

<template>
    <div v-if="error" class="mt-1 text-xs text-red-600">
        {{ error }}
    </div>
</template>
