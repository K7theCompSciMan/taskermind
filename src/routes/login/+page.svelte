<script lang="ts">
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
    import Button from '$lib/Button.svelte';
	import type { ActionData } from './$types';
    let email: string;
    let password: string;
    export let form: ActionData;
</script>
<svelte:head>
	<title>Log in • Taskermind</title>
</svelte:head>
<div class="flex justify-center">
    <form use:enhance method="post">
    <div class="justify-center text-center w-[22rem] bg-blue-500 rounded-2xl m-4 shadow-2xl pt-2">
        <div class="m-2 font-bold text-2xl ">
            Login to TaskerMind
        </div>

        <div class="m-4 mt-6">
        <input type="text" name = "email" placeholder="Email" bind:value={email} class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100" required>
        </div>
        <div class="m-4">
            <input type="password" name = "password" placeholder="Password" bind:value={password} class="rounded-3xl  p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100" required>
        </div>
        <!-- <div class="m-6 mb-2">
            <label for="remember-me"><input type="checkbox"> Remember Me</label> |
            <a href="/forgot-password">Forgot Password?</a>
        </div> -->
        <div class="m-4 justify-center flex pb-6">
            <button type="submit" name  = "submit" class="bg-emerald-700 text-slate-100 p-2 rounded-3xl w-1/2">Login</button>
        </div>
    </div>
</form>
</div>