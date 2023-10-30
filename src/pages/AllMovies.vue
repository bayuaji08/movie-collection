<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import axios from "axios";
import MovieItem from "@/components/MovieItem.vue";
import GenreItem from "@/components/GenreItem.vue";
import SearchItem from "@/components/SearchItem.vue";
import Pagination from "@/components/Pagination.vue";

const movies = ref([]);
const genres = ref([]);
const params = reactive({
  limit: 12,
  order: "desc",
  search: "",
  genre: "",
});
const pagination = ref({});
const loadingCount = ref(0);

const fetchData = async (page = 1) => {
  try {
    if (params.search) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_API}/movies/search?page=${page}`,
        {
          params,
        }
      );

      movies.value = data.result;
      pagination.value = data.pagination;
    } else {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_API}/movies?page=${page}`,
        {
          params,
        }
      );
      movies.value = data.result;
      pagination.value = data.pagination;
    }
  } catch (error) {
  } finally {
    loadingCount.value = loadingCount.value + 1;
  }
};

const fetchGenres = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_API}/genres`
    );

    genres.value = [{ label: "All", key: "" }, ...data];
  } catch (error) {
  } finally {
    loadingCount.value = loadingCount.value + 1;
  }
};

watch(
  () => params.genre,
  () => {
    fetchData();
  }
);

watch(
  () => params.search,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      fetchData();
      params.genre = "";
    }
  }
);

onMounted(() => {
  fetchGenres();
  fetchData();
});
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row gap-4 md:items-start">
      <div class="flex-none">
        <SearchItem v-model="params.search" />
      </div>
      <div
        class="flex-1 flex overflow-x-auto gap-3 pt-2 pb-4 custom-scroll"
        style="scrollbar-gutter: stable both-edges"
      >
        <GenreItem
          v-for="genre in genres"
          v-bind="{ ...genre, keyword: genre.key }"
          :active="params.genre"
          @onSelect="(val) => (params.genre = val)"
        />
      </div>
    </div>
    <hr class="mb-4" />
    <div class="mt-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <MovieItem v-for="movie in movies" v-bind="{ ...movie }" />
      </div>
      <p
        v-if="!params.search && movies.length == 0"
        class="mt-8 text-gray-400 text-center"
      >
        Data is empty
      </p>
      <p
        v-if="params.search && movies.length == 0"
        class="mt-8 text-gray-400 text-center"
      >
        No matching results found
      </p>
      <div class="mt-6 flex justify-center">
        <Pagination
          v-if="pagination && pagination.count > pagination.limit"
          :total="pagination.count"
          :currentPage="pagination.page"
          :perPage="pagination.limit"
          @changePage="fetchData"
        />
      </div>
    </div>

    <RouterLink
      to="add"
      title="Add Movie"
      class="fixed bottom-4 right-4 bg-red-500 rounded-full p-2 z-20 shadow-lg"
    >
      <PlusIcon class="text-white w-7 h-7" />
    </RouterLink>
  </div>
</template>
