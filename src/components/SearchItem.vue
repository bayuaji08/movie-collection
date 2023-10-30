<script setup>
import { ref } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import LoadingItem from "./LoadingItem.vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const timeBound = ref("");
const loading = ref(false);

const onChange = (event) => {
    clearTimeout(timeBound.value);
    loading.value = true;

    timeBound.value = setTimeout(() => {
        emit("update:modelValue", event.target.value);
        loading.value = false;
    }, 500);
};
</script>

<template>
    <div
        class="flex rounded-full bg-white group overflow-hidden ring-1 ring-gray-400 focus-within:ring-2 focus-within:ring-blue-400"
    >
        <span
            aria-label="Search Button"
            class="w-12 bg-white flex justify-center items-center"
        >
            <LoadingItem v-if="loading" class="text-gray-500" />
            <MagnifyingGlassIcon v-else class="w-5 h-5" />
        </span>
        <input
            @input="onChange"
            type="search"
            class="w-full md:w-auto pl-2 pr-4 py-2 focus:outline-none group-focus:outline-none group-focus:ring-2 gruop-focus:ring-red-600"
            placeholder="Search by title, director, summary"
        />
    </div>
</template>
