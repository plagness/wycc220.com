#!/usr/bin/env bash

set -euo pipefail

readonly repository_dir="/srv/wycc220/repository"
readonly repository_url="https://github.com/plagness/wycc220.com.git"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script as root." >&2
  exit 1
fi

if [[ ! -d "${repository_dir}/.git" ]]; then
  install -d -o wycc220 -g wycc220 /srv/wycc220
  sudo -u wycc220 git clone --branch main --single-branch "${repository_url}" "${repository_dir}"
fi

sudo -u wycc220 git -C "${repository_dir}" fetch origin main
sudo -u wycc220 git -C "${repository_dir}" checkout main
sudo -u wycc220 git -C "${repository_dir}" reset --hard origin/main
sudo -u wycc220 /usr/local/bin/pnpm --dir "${repository_dir}" install --frozen-lockfile
sudo -u wycc220 /usr/local/bin/pnpm --dir "${repository_dir}" --filter @wycc220/web build
install -d -o wycc220 -g wycc220 "${repository_dir}/apps/web/.next/standalone/apps/web/.next"
rm -rf "${repository_dir}/apps/web/.next/standalone/apps/web/.next/static"
cp -a "${repository_dir}/apps/web/.next/static" \
  "${repository_dir}/apps/web/.next/standalone/apps/web/.next/static"
chown -R wycc220:wycc220 "${repository_dir}/apps/web/.next/standalone/apps/web/.next/static"

systemctl restart wycc220.web.service
systemctl reload caddy
