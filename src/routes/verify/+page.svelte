<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>
	Hello, {$page.data.user.username}, a verification code was sent to your email, please enter it
	below to verify your account.
</h1>

<form method="post" use:enhance>
	<div class="flex justify-center self-center">
		{#if form?.error === 'User already verified'}
			<p class=" text-red-700 font-bold">User already verified</p>
		{/if}
		{#if form?.error === 'Invalid verification code'}
			<p class=" text-red-700 font-bold">Invalid verification code</p>
		{/if}
		{#if form?.error === 'User not found'}
			<p class=" text-red-700 font-bold">User not found</p>
		{/if}
		{#if form?.error}
			<p class=" text-red-700 font-bold">{form?.error}</p>
		{/if}
	</div>
	<div class="m-4 mt-6 flex justify-center">
		<input
			type="number"
			name="code"
			placeholder="Verification Code"
			class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 self-center text-center font-bold placeholder-black"
			required
		/>
	</div>
	<div class="m-4 justify-center flex">
		<button type="submit" name="submit" class="bg-emerald-700 text-slate-100 p-2 rounded-3xl w-1/2"
			>Verify</button
		>
	</div>
</form>
