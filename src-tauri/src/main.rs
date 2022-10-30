#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use tauri::{ CustomMenuItem, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem };
use tauri::{ Manager, SystemTray };

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show").accelerator("cmdOrControl+Shift+B");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    // let toggle = CustomMenuItem::new("toggle".to_string(), "Toggle").accelerator("cmdOrControl+Shift+B");
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        // .add_item(toggle)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder
        ::default()
        .setup(|app| {
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            Ok(())
        })
        .on_window_event(|event| {
            match event.event() {
                tauri::WindowEvent::CloseRequested { api, .. } => {
                    event.window().hide().unwrap();
                    api.prevent_close();
                }
                _ => {}
            }
        })
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| {
            match event {
                // SystemTrayEvent::LeftClick {
                //     position: _,
                //     size: _,
                //     ..
                // } => {
                //     println!("system tray received a left click");
                // }
                // SystemTrayEvent::RightClick {
                //     position: _,
                //     size: _,
                //     ..
                // } => {
                //     println!("system tray received a right click");
                // }
                // SystemTrayEvent::DoubleClick {
                //     position: _,
                //     size: _,
                //     ..
                // } => {
                //     println!("system tray received a double click");
                // }
                SystemTrayEvent::MenuItemClick { id, .. } => {
                    let window = app.get_window("main").unwrap();

                    return match id.as_str() {
                        "quit" => {
                            std::process::exit(0);
                        }
                        // "toggle_visibility" => {
                        //     if window.is_visible().unwrap() {
                        //         window.hide().unwrap();
                        //     } else {
                        //         window.show().unwrap();
                        //     }
                        // }
                        "hide" => {
                            window.hide().unwrap();
                        }
                        "show" => {
                            window.show().unwrap();
                        }
                        _ => {}
                    };
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}