import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'Login',
			meta: { layout: 'auth' },
			component: () => import('@/views/auth/Login.vue')
		},
		{
			path: '/main',
			name: 'Main',
			meta: { layout: 'main' },
			component: () => import('@/views/Main.vue')
		},
		{
			path: '/:catchAll(.*)',
			name: 'NotFound',
			meta: { layout: 'auth' },
			component: () => import('@/views/NotFound.vue')
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.name !== 'Login' && !localStorage.getItem('userId'))
		next({ name: 'Login' })
	else if (to.name === 'Login' && localStorage.getItem('userId'))
		next({ name: 'Main' })
	else next()
})

export default router
