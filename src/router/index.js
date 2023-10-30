import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Movies",
            component: () => import("@/pages/AllMovies.vue"),
        },
        {
            path: "/add",
            name: "Add Movie",
            component: () => import("@/pages/CreateEditMovie.vue"),
        },
        {
            path: "/movie/:id",
            name: "Detail Movie",
            component: () => import("@/pages/DetailMovie.vue"),
        },
        {
            path: "/edit/:id",
            name: "Edit Movie",
            component: () => import("@/pages/CreateEditMovie.vue"),
            meta: {
                mode: "edit",
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = `Movies - ${to.name}`;

    next();
});

export default router;
