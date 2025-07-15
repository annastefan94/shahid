import os
import tkinter as tk
from tkinter import messagebox

def rename_files():
    # Get the prefix from the text entry
    prefix = entry.get().strip()
    
    if not prefix:
        messagebox.showerror("Error", "Please enter a prefix name")
        return
    
    # Get the current directory (where the script is located)
    folder_path = os.path.dirname(os.path.abspath(__file__))
    
    # Get all files in the directory
    files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    
    # Sort files to ensure consistent numbering
    files.sort()
    
    # Counter for numbering
    counter = 1
    
    # Rename each file
    for filename in files:
        # Skip the script file itself
        if filename == os.path.basename(__file__):
            continue
            
        # Get file extension
        file_ext = os.path.splitext(filename)[1]
        
        # Create new filename
        new_name = f"{prefix}{counter:02d}{file_ext}"
        
        # Create full paths
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_name)
        
        # Rename the file
        os.rename(old_path, new_path)
        counter += 1
    
    messagebox.showinfo("Success", f"Renamed {counter-1} files successfully!")

# Create GUI window
window = tk.Tk()
window.title("File Renamer")
window.geometry("300x150")

# Create label
label = tk.Label(window, text="Enter prefix for file names:")
label.pack(pady=10)

# Create entry field
entry = tk.Entry(window, width=30)
entry.pack(pady=10)

# Create rename button
button = tk.Button(window, text="Rename Files", command=rename_files)
button.pack(pady=10)

# Start the GUI
window.mainloop()
