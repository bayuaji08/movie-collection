<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps([
    "id",
    "title",
    "director",
    "summary",
    "genres",
    "image_url",
]);

const baseApi = import.meta.env.VITE_APP_BASE_API;

const limitSumary = (text) => {
    const limit = 100;
    return text.length > 100 ? text.substr(0, 100) + "..." : text;
};
</script>

<template>
    <div
        @click="router.push(`/movie/${props.id}`)"
        role="button"
        tabindex="0"
        class="ring-1 ring-gray-300 h-60 bg-gray-200 rounded relative overflow-hidden group cursor-pointer"
    >
        <div class="absolute inset-0 z-0">
            <img
                :src="`${baseApi}/${props.image_url}`"
                alt="movie"
                class="w-full h-full object-cover"
            />
        </div>
        <div
            class="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent group-hover:bg-black/40 px-2 py-2 flex flex-col justify-end"
        >
            <h3 class="text-white font-semibold text-xl">{{ props.title }}</h3>
            <span class="text-yellow-300 font-semibold">{{
                props.director
            }}</span>
            <p class="text-white hidden group-hover:block text-sm">
                {{ props.summary && limitSumary(props.summary) }}
            </p>
        </div>
    </div>
</template>
