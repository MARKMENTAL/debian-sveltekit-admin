# debian-sveltekit-admin

debian-sveltekit-admin is a web-based search engine for APT (Advanced Packaging Tool) on Debian-based Linux systems, built with SvelteKit. The search engine allows users to search for available packages on the local system using the apt search command, and generates static files containing the output of the search query.

## Developing

To start developing the project, clone the repository and install the dependencies with npm install, pnpm install, or yarn. Then, start the development server with the following command:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
