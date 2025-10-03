import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../components/HomeComponent/HomeComponent.vue"),
    },
    {
      path: "/signIn",
      name: "SignIn",
      component: () => import("../components/SignIn/SignIn.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/Login/Login.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../components/Profile/Profile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("No tienes acceso");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
