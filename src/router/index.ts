import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/HomeComponent/HomeComponent.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeComponent,
  },
//   {
//     path: '/partidos',
//     name: 'Partidos',
//     component: MatchesComponent,
//   },
//   {
//     path: '/perfil',
//     name: 'Perfil',
//     component: ProfileComponent,
//   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
