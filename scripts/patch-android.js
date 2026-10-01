// Inaendeshwa baada ya `npx cap add android`.
// Inaweka fullscreen kamili (ficha status + navigation bar) na kuzuia screenshot.
const fs = require("fs");
const path = require("path");

const PKG = "com.corevia.app";
const javaDir = path.join("android", "app", "src", "main", "java", ...PKG.split("."));
fs.mkdirSync(javaDir, { recursive: true });

const main = `package ${PKG};

import android.os.Bundle;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Zuia screenshot na kurekodi skrini
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE,
                         WindowManager.LayoutParams.FLAG_SECURE);
    hideSystemBars();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) hideSystemBars();
  }

  private void hideSystemBars() {
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    WindowInsetsControllerCompat c =
        WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
    c.hide(WindowInsetsCompat.Type.systemBars());
    c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
  }
}
`;
fs.writeFileSync(path.join(javaDir, "MainActivity.java"), main);
console.log("MainActivity.java imeandikwa");

const stylesPath = path.join("android", "app", "src", "main", "res", "values", "styles.xml");
let x = fs.readFileSync(stylesPath, "utf8");
if (!x.includes("android:windowFullscreen")) {
  x = x.replace(
    /(<style name="AppTheme\.NoActionBar"[^>]*>)/,
    '$1\n        <item name="android:windowFullscreen">true</item>\n        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>'
  );
  fs.writeFileSync(stylesPath, x);
  console.log("styles.xml imeboreshwa");
}
