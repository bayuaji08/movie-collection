<script setup>
import { reactive } from "vue";
import { VuePagination } from "vue3-tailwind-pagination";

const props = defineProps(["total", "currentPage", "perPage"]);
const emit = defineEmits(["changePage"]);

const classes = reactive({
    wrapper:
        "flex gap-1 rounded text-gray-500 text-center  dark:bg-dark mx-auto shadow-sm text-xs",
    element:
        "w-8 h-8 border rounded border-gray-300 bg-white table-cell hover:border-red-500/20",
    activeElement:
        "w-8 h-8 rounded border border-red-500 table-cell hover:border-secondary",
    disabledElement:
        "w-8 h-8 rounded border border-gray-300 bg-white table-cell cursor-not-allowed",
    activeButton:
        "bg-red-500 w-full h-full rounded text-white hover:bg-secondary transition duration-100 ease-in-out focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50",
    disabledButton:
        "opacity-70 w-full h-full rounded pointer-events-none transition duration-100 ease-in-out",
    button: "hover:bg-red-500/20 w-full h-full rounded transition duration-100 ease-in-out focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50",
});

const changePage = (page) => {
    emit("changePage", page);
};
</script>

<template>
    <VuePagination
        :total="props.total"
        v-model:value="props.currentPage"
        :perPage="parseInt(props.perPage)"
        @set="changePage"
        :classes="classes"
    />
</template>
