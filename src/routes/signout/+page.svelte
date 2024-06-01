<script lang="ts">
	import { goto } from "$app/navigation";
    goto("/login", {
        invalidateAll: true
    });
</script>

You are signed out