# Production deployment

Production runs only from the `main` branch on the project VDS. The public entry
point is `https://wycc220.com`; the `.ru` and `elwycco` domains permanently
redirect to it while preserving the request path and query string.

## Layout

- `/srv/wycc220/repository` — clean checkout of `origin/main`;
- `wycc220.web.service` — Next.js standalone server bound to `127.0.0.1:3000`;
- Caddy — public HTTP/HTTPS endpoint, TLS renewal and canonical redirects;
- `wycc220` — unprivileged operating-system user running the application.

Production secrets must live outside the repository in root-owned environment
files. Never place API keys, bot tokens or private SSH keys in Git.

## Release flow

1. Develop and test changes in `dev`.
2. Review and fast-forward `main` to the approved `dev` commit.
3. Push `main` to GitHub.
4. On the VDS, run:

   ```bash
   sudo /usr/local/sbin/deploy.wycc220.web
   ```

The deployment script discards local server-side changes, installs the exact
lockfile dependencies, builds the web application and restarts the service.
The VDS is a deployment target, not a development workspace.

## Verification

```bash
systemctl status wycc220.web.service caddy
curl --fail --silent --show-error https://wycc220.com/
curl --head https://elwycco.com/example
```

The second request must return a permanent redirect to
`https://wycc220.com/example`.
