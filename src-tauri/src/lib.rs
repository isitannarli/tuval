use tauri_plugin_autostart::MacosLauncher;
use tauri::Manager; // Import the Manager trait to use get_window method

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn toggle_window(app_handle: tauri::AppHandle) {
  if let Some(window) = app_handle.get_webview_window("main") {
    let is_visible = window.is_visible().unwrap_or(false);
    if is_visible {
        print!("Hiding window");
      window.hide().unwrap();
    } else {
        print!("Showing window");
      window.show().unwrap();
    }
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"]) /* arbitrary number of args to pass to your app */))
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // Hide icon in macos dock
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![toggle_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
