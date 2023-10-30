<script setup></script>

<template>
  <header class="h-14 bg-red-500">
    <div class="max-w-7xl mx-auto w-full h-full px-4 flex items-center">
      <h2 class="text-white font-bold text-xl">Movies</h2>
      <div class="ml-auto"></div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto w-full p-4">
    <slot></slot>
  </main>
</template>
