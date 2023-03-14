<!-- Index/Home Page -->
<script lang="ts">
    import Logo from './Logo.svelte';
    import { onMount } from 'svelte';
  
    let query = '';
  
    const handleSubmit = () => {
      window.location.href = `/aptsearch?${query}`;
    };
  
    onMount(() => {
      const input = document.querySelector('#query-input') as HTMLInputElement;
      input.focus();
    });
  </script>
  
  <a href="https://github.com/markmental/" class="unstyledlink" target ="_blank">
    <h1><Logo/>SvelteKit Debian Admin app</h1>
  </a>
  
  <a href="/apthelp" class="navbuttons">apthelp</a>
  <a href="/aptman" class="navbuttons">aptman</a>

  <div class="query-input">
    <h3>Search Debian Packages</h3>
    <input type="text" id="query-input" bind:value={query} placeholder="Enter query..." />
    <button class="navbuttons" on:click|preventDefault={handleSubmit}>Search</button>
  </div>
  
  <p>This is an admin app for reading about Debian's APT package manager. It should work on all Debian based distros with apt installed including Ubuntu. It also writes to an access log file.</p>
  