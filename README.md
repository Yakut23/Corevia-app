# Corevia APK

1. Pakia (upload) faili ZOTE za folda hii kwenye repo mpya ya GitHub
   (hakikisha folda `.github` imepakiwa — ni folda iliyofichwa).
2. Fungua tab **Actions** -> **Build APK** -> **Run workflow** (au push tu).
3. Subiri dakika 5-10. Kisha fungua run iliyokamilika -> **Artifacts** -> pakua `corevia-debug-apk`.
4. Toa zip, weka `app-debug.apk` kwenye simu na usakinishe.

Kubadilisha UI: hariri `www/index.html` kisha push.
Kubadilisha jina la kifurushi: `capacitor.config.json` (appId) na `PKG` ndani ya `scripts/patch-android.js` (lazima zifanane).
