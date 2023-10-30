<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import LoadingItem from "@/components/LoadingItem.vue";
import UploadImageItem from "@/components/UploadImageItem.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import MultipleSelectGenre from "@/components/MultipleSelectGenre.vue";

const route = useRoute();
const router = useRouter();
const mode = computed(() => route.meta?.mode || "create");
const id = route.params.id;

const loadingSubmit = ref(false);
const fileImage = ref(null);
const image_url = ref("");
const genres = ref([""]);
const form = reactive({
  title: "",
  director: "",
  summary: "",
  genres: [],
  movie_image: "",
});
const errorMessage = reactive({
  title: "",
  director: "",
  summary: "",
  genres: "",
  movie_image: "",
});

const fetchGenres = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_API}/genres`
    );

    genres.value = data;
  } catch (error) {}
};

const fetchDetailMovie = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_API}/movies/${id}`
    );

    const { title, director, summary, genres } = data;

    form.title = title;
    form.director = director;
    form.summary = summary;
    form.genres = genres.split(",");
    image_url.value = `${import.meta.env.VITE_APP_BASE_API}/${data.image_url}`;
  } catch (error) {}
};

const onSubmit = async () => {
  if (mode.value === "create") {
    handleMovieStore();
  } else {
    handleMovieUpdate();
  }
};

const handleMovieStore = async () => {
  if (loadingSubmit.value) return;
  clearErrorMessage();
  if (validation()) return;
  loadingSubmit.value = true;

  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    if (key === "genres" && form[key].length > 0) {
      const genreSplit = form.genres.join(",");
      formData.append(key, genreSplit || "");
    } else {
      formData.append(key, form[key] || "");
    }
  });

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BASE_API}/movies`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    router.push("/");
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loadingSubmit.value = false;
    }, 500);
  }
};

const handleMovieUpdate = async () => {
  if (loadingSubmit.value) return;
  clearErrorMessage();
  if (validation()) return;
  loadingSubmit.value = true;

  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    if (key === "genres" && form[key].length > 0) {
      const genreSplit = form.genres.join(",");
      formData.append(key, genreSplit || "");
    } else {
      formData.append(key, form[key] || "");
    }
  });

  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_APP_BASE_API}/movies/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    router.push("/");
  } catch (error) {
  } finally {
    setTimeout(() => {
      loadingSubmit.value = false;
    }, 500);
  }
};

const clearErrorMessage = () => {
  errorMessage.title = "";
  errorMessage.director = "";
  errorMessage.summary = "";
  errorMessage.genres = "";
  errorMessage.movie_image = "";
};

const validation = () => {
  let sendBack = false;

  if (form.title === "") {
    errorMessage.title = "Title must be required.";
    sendBack = true;
  }

  if (form.director === "") {
    errorMessage.director = "Director must be required.";
    sendBack = true;
  }

  if (form.summary === "") {
    errorMessage.summary = "Summary must be required.";
    sendBack = true;
  }

  if (form.genres.length === 0) {
    errorMessage.genres = "Genres must be required.";
    sendBack = true;
  }

  if (mode.value !== "edit" && form.movie_image === "") {
    errorMessage.movie_image = "Image must be required.";
    sendBack = true;
  }

  return sendBack;
};

onMounted(() => {
  if (mode.value === "edit") fetchDetailMovie();
  fetchGenres();
});
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center">
      <button
        type="button"
        @click="router.back"
        aria-label="Back"
        title="Back"
        class="rounded-full bg-white border p-2 mr-4"
      >
        <ChevronLeftIcon class="text-gray-500 h-5 w-5" />
      </button>
      <h2 class="font-semibold text-lg">{{ route.name }}</h2>
    </div>
    <hr class="my-4" />
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col">
          <label for="title" class="font-semibold">Title</label>
          <input
            type="text"
            v-model="form.title"
            class="px-2 py-2 rounded bg-gray-100 ring-1 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="title"
            autocomplete="off"
          />
          <ErrorMessage :error="errorMessage.title" />
        </div>
        <div class="flex flex-col">
          <label for="director" class="font-semibold">Director</label>
          <input
            type="text"
            v-model="form.director"
            class="px-2 py-2 rounded bg-gray-100 ring-1 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="director"
            autocomplete="off"
          />
          <ErrorMessage :error="errorMessage.director" />
        </div>
        <div class="flex flex-col">
          <label for="summary" class="font-semibold">Summary</label>
          <textarea
            v-model="form.summary"
            class="px-2 py-2 rounded bg-gray-100 ring-1 ring-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            id="summary"
            rows="3"
          />
          <ErrorMessage :error="errorMessage.summary" />
        </div>
        <div>
          <label for="genres" class="font-semibold">Genres</label>
          <MultipleSelectGenre :genres="genres" v-model="form.genres" />
          <ErrorMessage :error="errorMessage.genres" />
        </div>
        <div class="flex flex-col mb-6">
          <label for="" class="font-semibold">Image</label>
          <UploadImageItem
            v-model:imageUrl="image_url"
            v-model:imageFile="form.movie_image"
            v-model:errorMessage="errorMessage.movie_image"
          />
          <ErrorMessage :error="errorMessage.movie_image" />
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            class="bg-red-500 text-white font-semibold px-4 py-2 rounded flex gap-3 items-center ocus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <LoadingItem v-if="loadingSubmit" />
            {{ mode === "edit" ? "Update" : "Save" }}
          </button>
          <button
            type="submit"
            class="bg-gray-100 text-gray-500 border font-semibold px-3 py-2 rounded ocus:outline-none focus:ring-2 focus:ring-blue-400"
            @click="router.back()"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
