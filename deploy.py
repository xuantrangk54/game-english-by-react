import os
import ftplib
import shutil
import json


def build_react_code():
    try:
        print("Building React code...")
        os.system("npm run build .")  # Replace this command if it's different
        print("React code built successfully.")
    except Exception as e:
        print(f"Error during build: {e}")
        exit(1)

def upload_to_ftp(server, username, password, remote_dir, local_dir):
    try:
        print("Connecting to FTP server...")
        with ftplib.FTP(server) as ftp:
            ftp.login(username, password)
            ftp.cwd(remote_dir)
            
            for root, dirs, files in os.walk(local_dir):
                for directory in dirs:
                    local_path = os.path.join(root, directory)
                    relative_path = os.path.relpath(local_path, local_dir)
                    try:
                        ftp.mkd(relative_path)
                    except ftplib.error_perm:
                        pass  # Directory already exists

                for file in files:
                    local_file = os.path.join(root, file)
                    remote_file = os.path.relpath(local_file, local_dir)

                    with open(local_file, 'rb') as f:
                        ftp.storbinary(f'STOR {remote_file}', f)
                        print(f"Uploaded: {remote_file}")

        print("Files uploaded successfully.")
    except Exception as e:
        print(f"Error during FTP upload: {e}")
        exit(1)

if __name__ == "__main__":
    # Load configuration from JSON file
    config_file = "deploy_config.json"
    try:
        with open(config_file, "r") as file:
            config = json.load(file)
    except FileNotFoundError:
        print(f"Error: Configuration file '{config_file}' not found.")
        exit(1)
    except json.JSONDecodeError:
        print(f"Error: Failed to parse the configuration file '{config_file}'.")
        exit(1)

    # Extract values from the configuration
    FTP_SERVER = config.get("FTP_SERVER")
    FTP_USERNAME = config.get("FTP_USERNAME")
    FTP_PASSWORD = config.get("FTP_PASSWORD")
    FTP_REMOTE_DIR = config.get("FTP_REMOTE_DIR")
    LOCAL_BUILD_DIR = config.get("LOCAL_BUILD_DIR")

    # Validate configuration values
    if not all([FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_DIR, LOCAL_BUILD_DIR]):
        print("Error: Missing required configuration values.")
        exit(1)

    # Step 1: Build React code
    build_react_code()

    # Step 2: Copy files to FTP server
    upload_to_ftp(FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_DIR, LOCAL_BUILD_DIR)