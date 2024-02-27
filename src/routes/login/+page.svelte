<script lang="ts">
    import Button from '$lib/Button.svelte';
    let email: string;
    let password: string;

    const onclick = async () => {
        
        const response = await fetch('https://taskermind-api.fly.dev/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        
        console.log(data);

    }
</script>

<div class="flex justify-center">
    <form action="">
    <div class="justify-center text-center w-[22rem] bg-blue-500 rounded-2xl m-4 shadow-2xl pt-2">
        <div class="m-2 font-bold text-2xl ">
            Login to TaskerMind
        </div>

        <div class="m-4 mt-6">
        <input type="text" placeholder="Email" bind:value={email} class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-4">
            <input type="password" placeholder="Password" bind:value={password} class="rounded-3xl  p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-6 mb-2">
            <label for="remember-me"><input type="checkbox"> Remember Me</label> |
            <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div class="m-4 justify-center flex pb-6">
            <Button type="submit" name="Login |  Register" size="w-56" onclick={() => onclick()} hover={() => {}} leave={() => {}}/>
        </div>
    </div>
</form>
</div>