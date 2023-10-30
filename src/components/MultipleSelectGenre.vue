<script setup>
const props = defineProps(["genres", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const addGenre = (key) => {
    if (!props.modelValue.includes(key)) {
        emit("update:modelValue", [...props.modelValue, key]);
    } else {
        emit(
            "update:modelValue",
            props.modelValue.filter((genre) => genre !== key)
        );
    }
};
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <div
            v-for="genre in props.genres"
            tabindex="0"
            class="border rounded-full px-3 py-1 text-sm font-semibold flex-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            :class="
                props.modelValue.includes(genre.key)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-500 '
            "
            @click="addGenre(genre.key)"
        >
            {{ genre.label }}
        </div>
    </div>
</template>
