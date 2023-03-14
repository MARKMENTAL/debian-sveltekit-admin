  <script lang="ts">
    import { onMount } from 'svelte';
    import { readable } from 'svelte/store';
    import Logo from '../Logo.svelte';
  
    const fileContent = readable('', (set) => {
    onMount(async () => {
      try {
        const response = await fetch('/apt_help.txt');
        const text = await response.text();
        set(text);
      } catch (error) {
        console.error(error);
        set(""); // set the value to empty to indicate that the file is not found
      }
    });
  });
  </script>

<a href="/" class="unstyledlink">
  <h1 class="unstyledlink"><Logo/>Debian Apt Help Page</h1>
</a>

{#if $fileContent !== null}
  <pre>{$fileContent}</pre>
{:else}
  <p>The file cannot be found. Please refresh the page.</p>
{/if}