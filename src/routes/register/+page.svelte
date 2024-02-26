<script lang="ts">
    import Button from '$lib/Button.svelte';
    let email: string;
    let password: string;
    let username: string;
    let confirmed: string;
    const onclick = async () => {
        if (!email || !password || !username || !confirmed) {
            alert("Please fill in all fields");
            return;
        }
        if (! email.includes("@") || !email.includes(".")) {
            alert("Invalid email");
            return;
        }
        if (password !== confirmed) {
            alert("Passwords do not match");
            return;
        }
        console.log({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                tasks: []
            })});
        const response = await fetch('https://taskermind-api.fly.dev/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                tasks: []
            })
        });
        console.log(response);

    }
</script>
<div class="flex justify-center">
    <div class="justify-center text-center w-[22rem] bg-blue-500 rounded-2xl m-4 shadow-2xl">
        <div class="m-2 font-bold text-2xl ">
            Sign Up to TaskerMind
        </div>

        <div class="m-4 mt-6">
        <input type="text" required placeholder="Email" bind:value={email} class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-4">
        <input type="text" required placeholder="Username" bind:value={username} class="rounded-3xl p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-4">
            <input type="password" required placeholder="Password" bind:value={password} class="rounded-3xl  p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-4">
            <input type="password" required placeholder="Confirm Password" bind:value={confirmed} class="rounded-3xl  p-2 bg-transparent border-2 border-emerald-700 placeholder-slate-100">
        </div>
        <div class="m-4 justify-center flex">
            <Button type= "submit" name="Register" size="w-56" onclick={() => onclick()} hover={() => {}} leave={() => {}}/>
        </div>
    </div>
</div>