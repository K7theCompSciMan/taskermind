<script lang="ts">
    import Button from '$lib/Button.svelte';
</script>
<div class="flex justify-center">
    <div class="justify-center text-center w-[22rem] bg-blue-500 rounded-2xl m-4">
        <div class="m-2 font-bold text-2xl ">
            Login to TaskerMind
        </div>

        <div class="m-4 mt-6">
        <input type="text" placeholder="Username" class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-4">
            <input type="password" placeholder="Password" class="rounded-3xl  p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-6 mb-2">
            <label for="remember-me"><input type="checkbox"> Remember Me</label> |
            <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div class="m-4">
            <Button name="Login |  Register" size="w-56" onclick={() => {}} hover={() => {}} leave={() => {}}/>
        </div>
    </div>
</div>