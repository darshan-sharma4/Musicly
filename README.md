# Musicly

Musicly is a lightweight, client-side music streaming web application built with HTML, CSS, and JavaScript. It offers a clean and responsive interface for playing music, browsing playlists, and controlling playback. The application is designed to be simple, user-friendly, and visually appealing, with a focus on providing a seamless music listening experience.

## Features

- **Music Playback**: Play, pause, and skip tracks with an intuitive audio player.
- **Playlist Management**: Browse and select tracks from a predefined playlist.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic UI**: Interactive elements like progress bars and track information updates.
- **Custom Styling**: Modern and sleek design with CSS animations and transitions.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Audio Handling**: HTML5 Audio API
- **Styling**: Custom CSS with responsive design principles
- **Assets**: Local music files and album art (stored in the repository)

## Prerequisites

No special software is required to run Musicly, as it is a client-side web application. You only need:

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge)
- Git (optional, for cloning the repository)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/darshan-sharma4/Musicly.git
   cd Musicly
   ```

2. **Open the Application**:

   - Open `index.html` in a web browser. You can do this by:
     - Double-clicking the `index.html` file, or
     - Running a local server (recommended for proper asset loading):

       ```bash
       npx http-server
       ```

       Then navigate to `http://localhost:8080` in your browser.

   **Note**: If you encounter issues with audio or image loading due to browser security restrictions, using a local server (like `http-server`) is recommended.

## Usage

1. **Launch the App**: Open the application in your browser.
2. **Browse Playlist**: View available tracks in the playlist section.
3. **Play Music**: Click on a track to start playback, or use the play/pause button.
4. **Control Playback**: Use the progress bar to seek, adjust volume, or skip to the next/previous track.
5. **Responsive Experience**: Try resizing the browser or accessing it on a mobile device to experience the responsive design.

## Project Structure

```
Musicly/
├── assets/                  # Music files, album art, and other static assets
│   ├── music/              # Audio tracks
│   ├── images/             # Album covers and icons
├── css/                    # CSS styles
│   └── style.css           # Main stylesheet
├── js/                     # JavaScript files
│   └── main.js             # Core application logic
├── index.html              # Main HTML file
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and is compatible with JavaScript and HTML5 standards.
