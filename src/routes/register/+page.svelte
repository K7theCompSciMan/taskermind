<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	// import Button from '$lib/Button.svelte';
	let email: string;
	let password: string;
	let username: string;
	let confirmed: string;
	export let form: ActionData;
</script>

<div class="flex justify-center">
	<div class="justify-center text-center w-[22rem] bg-blue-500 rounded-2xl m-4 shadow-2xl">
		<div class="m-2 font-bold text-2xl">Sign Up to TaskerMind</div>
		<form use:enhance method="post">
            <div class="flex justify-center align-self-center">
                {#if form?.notmatching}<p class=" text-red-700 font-bold">Passwords do not match</p>{/if}
                {#if form?.error === "User with the same email already exists"}<p class=" text-red-700 font-bold">User already exists</p>{/if}
            </div>
			<div class="m-4 mt-6">
				<input
					type="text"
                    name="email"
					required
					placeholder="Email"
					bind:value={email}
					class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
				/>
			</div>
			<div class="m-4">
				<input
					type="text"
                    name="username"
					required
					placeholder="Username"
					bind:value={username}
					class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
				/>
			</div>
			<div class="m-4">
				<input
					type="password"
                    name="password"
					required
					placeholder="Password"
					bind:value={password}
					class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
				/>
			</div>
			<div class="m-4">
				<input
					type="password"
                    name="confirmPassword"
					required
					placeholder="Confirm Password"
					bind:value={confirmed}
					class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100"
				/>
			</div>
			<div class="m-4 justify-center flex">
				<button
					type="submit"
					name="submit"
					class="bg-emerald-700 text-slate-100 p-2 rounded-3xl w-1/2">Register</button
				>
			</div>
		</form>
	</div>
</div>
