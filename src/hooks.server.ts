
import fs from 'fs';
import { exec } from 'child_process';
import type { Handle } from '@sveltejs/kit';

const lockFile = './delete_lock';

// I like putting my server side code in hooks.server.ts for now

export const handle: Handle = async ({ event, resolve }) => {

  exec('apt help > static/apt_help.txt', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  
  
  exec('man apt > static/apt_man.txt', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  if (event.url.pathname.startsWith('/aptsearch')) {
    // function to delete apt_search files once every 30 mins
    const deleteAPTSearchFiles = (() => {
      return () => {
        // Check if lock file exists
        if (fs.existsSync(lockFile)) {
          console.log('Deletion already in progress');
          return;
        }
        
        // Create lock file
        fs.writeFileSync(lockFile, '');
        
        // Delete files
        exec('rm ./static/apt_search*', (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          
          // Remove lock file
          fs.unlinkSync(lockFile);
        });
      };
    })();
    
    
    // call the function every 30 mins
    setInterval(deleteAPTSearchFiles, 30 * 60 * 1000);
    
    
    const date = new Date().toLocaleString();
    const parsedDate = date.replace(/[^a-zA-Z0-9]/g, '');
    const path = event.request.url;
    const browser = event.request.headers.get('user-agent');
    const ip = event.getClientAddress().split(':')[event.getClientAddress().split(':').length - 1];
    let query: string = event.request.url.split('?')[1];

    const alphanumeric = /^[a-zA-Z0-9_-]+$/;
    if (!alphanumeric.test(query)|| (query.includes('&') || query.includes(';'))) {
      query = "InvalidSearchError";
    }

    const fileName = `apt_search_${ip}_${query}_${parsedDate}.txt`;

    const sanitizedQuery = query.replace(new RegExp(`[^${alphanumeric.source}]`, "g"), "");

    console.log(sanitizedQuery);

    const aptQuery = `apt search ${sanitizedQuery} > static/${fileName}`;
    
    console.log(aptQuery);

    exec(aptQuery, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  
    // return a response with a link to download the file
    const loadingLink = '<link rel="stylesheet" href="/global.css"> <p>Loading...</p>';
    const downloadLink = `<a href="/" class="unstyledlink" target ="_blank"><h1><img src="debian-logo.png" class="deblogo" alt="Debian logo" width="50" height="50">Your ${query} search is ready!</h1></a> <pre class="dlmsg">Search files are deleted every 30 mins... Refresh if you get a 404 error. <a target="_blank" class="navbuttons" href="${fileName}">View</a> <a class="navbuttons" href="${fileName}" download="${fileName}">Download</a>  <button class="navbuttons" onclick="location.reload()">Refresh</button></pre>`;
    const responseHtml = ` <title>Search Results</title><link rel="icon" href="/debian-logo.png" />${loadingLink}\n<script>setTimeout(() => { document.body.innerHTML = '${downloadLink}'; }, 3000);</script>`;
    return new Response(responseHtml, { headers: { 'Content-Type': 'text/html' } });
  }
  
  


    if (event.url.pathname.startsWith('/')) {
        const date = new Date().toLocaleString();
        const path = event.request.url;
        const browser = event.request.headers.get('user-agent');
        const ip = event.getClientAddress().split(':')[event.getClientAddress().split(':').length - 1];
        const data = `SvelteKit App Access Instance On: ${date}\n${path}\n${browser}\n${ip}\n\n`;
        fs.appendFile("./static/accesslog.txt", data, (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });
        // return new Response('Data written to file');
    }

    const response = await resolve(event);
    return response;
  };