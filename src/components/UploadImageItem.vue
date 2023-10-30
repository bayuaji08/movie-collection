<script setup>
import { ref } from "vue";
import { PencilIcon, PhotoIcon, TrashIcon } from "@heroicons/vue/24/outline";

const props = defineProps(["imageUrl", "imageFile", "errorMassage"]);
const emit = defineEmits([
    "update:imageUrl",
    "update:imageFile",
    "update:errorMessage",
]);

const fileImage = ref(null);
const handleImage = (e) => {
    const MAX_SIZE = 1500000; // 1MB

    if (e.target.files.length !== 0) {
        let file = e.target.files[0];

        const isValidFormat = file.type.includes("image");
        const isValidSize = file.size < MAX_SIZE;

        if (!isValidFormat) {
            emit(
                "update:errorMessage",
                `The image format you selected is not appropriate.`
            );
        }

        if (!isValidSize) {
            emit(
                "update:errorMessage",
                `The image size you have chosen exceeds 1.5 MB.`
            );
        }

        if (isValidFormat && isValidSize) {
            emit("update:imageFile", file);
            emit("update:imageUrl", URL.createObjectURL(file));
            emit("update:errorMessage", "");
        }
    }
};

const removeImage = () => {
    emit("update:imageFile", "");
    emit("update:imageUrl", "");
    emit("update:errorMessage", "");
};
</script>

<template>
    <div class="relative">
        <div
            class="bg-gray-200 ring-1 ring-gray-400 rounded-lg h-72 w-full md:w-96 relative overflow-hidden"
            @click="fileImage.click()"
        >
            <img
                v-if="props.imageUrl"
                :src="props.imageUrl"
                class="object-cover object-center h-full w-full"
            />
            <PhotoIcon
                v-else
                class="w-40 h-40 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
        <input
            type="file"
            ref="fileImage"
            class="mt-4 sr-only"
            accept="image/*"
            @change="handleImage"
        />
        <div v-if="props.imageUrl" class="absolute left-3 bottom-3">
            <div
                role="button"
                aria-label="Edit"
                title="Edit"
                class="bg-white flex gap-1 ring-1 ring-gray-500 rounded px-1 py-1 text-sm"
                @click="fileImage.click()"
            >
                <PencilIcon class="w-5 h-4 stroke-2" />
            </div>
            <div
                role="button"
                aria-label="Remove"
                title="Remove"
                class="mt-2 bg-white flex gap-1 ring-1 ring-gray-500 rounded px-1 py-1 text-sm"
                @click="removeImage"
            >
                <TrashIcon class="w-5 h-4 stroke-2" />
            </div>
        </div>
    </div>
</template>
