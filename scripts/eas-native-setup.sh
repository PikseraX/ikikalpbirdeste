#!/usr/bin/env bash
set -euo pipefail

if [[ "${EAS_BUILD_PLATFORM:-}" == ios ]]; then
  npx --no-install cap sync ios
  exit 0
fi
if [[ "${EAS_BUILD_PLATFORM:-}" != android ]]; then
  exit 0
fi

java_major=$(java -XshowSettings:properties -version 2>&1 | awk -F ' = ' '/java.specification.version =/ {print $2}')
if [[ "$java_major" != 21 ]]; then
  sudo apt-get update
  sudo apt-get install -y openjdk-21-jdk-headless
  java_home="/usr/lib/jvm/java-21-openjdk-$(dpkg --print-architecture)"
  "$java_home/bin/java" -version
  set-env JAVA_HOME "$java_home"
  set-env PATH "$java_home/bin:$PATH"
fi

npx --no-install cap sync android
chmod +x android/gradlew
