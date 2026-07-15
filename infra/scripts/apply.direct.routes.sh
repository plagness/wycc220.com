#!/usr/bin/env bash

set -euo pipefail

readonly routes_file="/etc/wycc220/direct.routes"
readonly public_ipv4="186.246.6.218/32"

while ip rule del pref 5255 2>/dev/null; do :; done
while ip rule del pref 5260 2>/dev/null; do :; done

# Keep replies for public SSH and HTTPS on the VDS uplink.
ip rule add pref 5260 from "${public_ipv4}" lookup main

while IFS= read -r route; do
  route="${route%%#*}"
  route="${route//[[:space:]]/}"
  [[ -z "${route}" ]] && continue
  ip rule add pref 5255 to "${route}" lookup main
done < "${routes_file}"
