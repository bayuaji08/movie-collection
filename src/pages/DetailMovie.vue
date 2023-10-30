<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import axios from "axios";
import PopupConfirmDelete from "@/components/PopupConfirmDelete.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const baseApi = import.meta.env.VITE_APP_BASE_API;
const popupDelete = ref(null);
const movie = ref({
  createdAt: "",
  deletedAt: "",
  director: "",
  genres: "",
  id: "",
  image_url: "",
  summary: "",
  title: "",
  updatedAt: "",
});

const fetchDetailMovie = async () => {
  try {
    const [resGenres, resMovies] = await Promise.all([
      axios.get(`${import.meta.env.VITE_APP_BASE_API}/genres`),
      axios.get(`${import.meta.env.VITE_APP_BASE_API}/movies/${id}`),
    ]);

    movie.value = {
      ...resMovies.data,
      image_url: `${baseApi}/${resMovies.data.image_url}`,
      genres: genreFormat(resGenres.data, resMovies.data.genres),
    };
  } catch (error) {}
};

const genreFormat = (genres, text) => {
  const textSplit = text.split(",");

  const gen = textSplit.map((txt) => {
    const found = genres.find((genre) => genre.key == txt);

    return found.label;
  });

  return gen.join(", ");
};

const deleteMovie = async () => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_BASE_API}/movies/${id}`);

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchDetailMovie();
});
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center">
      <RouterLink
        to="/"
        aria-label="Back"
        title="Back"
        class="rounded-full bg-white border p-2 mr-4"
      >
        <ChevronLeftIcon class="text-gray-500 h-5 w-5" />
      </RouterLink>
      <h2 class="font-semibold text-lg">{{ route.name }}</h2>
    </div>
    <hr class="my-4" />
    <div class="flex flex-col gap-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div
          class="flex-none bg-gray-200 ring-1 ring-gray-400 rounded-lg h-72 w-full md:w-96 relative overflow-hidden"
        >
          <img
            :src="movie.image_url"
            class="object-cover object-center h-full w-full"
            :alt="movie && movie.title"
          />
        </div>
        <div class="md:ml-auto flex flex-row md:flex-col gap-4">
          <RouterLink
            :to="`/edit/${id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded flex gap-2 items-center focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <PencilSquareIcon class="h-5 w-5" />
            Edit</RouterLink
          >
          <button
            type="button"
            class="bg-red-600 text-white px-4 py-2 rounded flex gap-2 items-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            @click="popupDelete.open()"
          >
            <TrashIcon class="h-5 w-5" />
            Delete
          </button>
        </div>
      </div>
      <hr />
      <div class="flex flex-col">
        <div>
          <h2 class="font-semibold text-xl">{{ movie.title }}</h2>
        </div>
        <div>
          <p class="text-sm text-gray-700">Directed by {{ movie.director }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-700">Genre: {{ movie.genres }}</p>
        </div>
        <div>
          <h4 class="font-semibold">Summary</h4>
          <p class="text-sm text-gray-700">
            {{ movie.summary }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <PopupConfirmDelete ref="popupDelete" @onDelete="deleteMovie" />
</template>
