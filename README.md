# Campus Navigation Website

A modern web-based application built with React and Vite that helps students, faculty, and staff easily navigate campus buildings, locate rooms, find faculty offices, and check real-time room availability.

## 🚀 Features

- **Home Page**: Overview of campus navigation with building information
- **Search Room**: Search for instructor offices by name, room number, or building
- **Search Office**: Find specific lecturer offices with detailed information
- **Room Availability**: Check currently available rooms and their time slots
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth transitions

## 🛠️ Technology Stack

- **React** - UI library
- **Leaflet*- JS library for interactive maps
- **Vite** - Build tool and dev server (Fast Refresh with HMR)
- **React Router** - Client-side routing
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6+)** - Modern JavaScript features
- 

## 📦 Project Structure

```
CampusNavigation/
├── public/                 # Static assets
│   ├── logo.png           # Campus logo
│   ├── hero-bg.jpg        # Hero background
│   ├── search-bg.jpg      # Search background
│   ├── main-building.jpg  # Building images
│   ├── library-gym.jpg
│   ├── tuwaiq-building.jpg
│   ├── najd-building.jpg
│   └── room-*.jpg         # Room images
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx     # Navigation header
│   │   └── Navigation.jsx # Action buttons
│   ├── screens/           # Page components
│   │   ├── Home.jsx
│   │   ├── SearchRoom.jsx
│   │   ├── SearchOffice.jsx
│   │   └── RoomAvailability.jsx
│   ├── App.jsx            # Router configuration
│   ├── App.css            # Global styles
│   └── main.jsx           # App entry point
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project folder:

   ```powershell
   cd CampusNavigation
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Start the development server:

   ```powershell
   npm run dev
   ```

4. Open your browser and visit the URL shown in terminal (usually `http://localhost:5173`)

## 🎨 Adding Images

Place your campus images in the `public/` folder with these names:

### Required Images:

- `logo.png` - Campus logo (200x50px recommended)
- `hero-bg.jpg` - Hero section background (1920x1080px)
- `search-bg.jpg` - Search pages background (1920x1080px)
- `main-building.jpg` - Main Building photo
- `library-gym.jpg` - Library & Gym photo
- `tuwaiq-building.jpg` - Tuwaiq Building photo
- `najd-building.jpg` - Najd Building photo
- `room-1.jpg` through `room-6.jpg` - Room photos

See `public/README-IMAGES.md` for more details.

## 📝 Customizing Content

### Update Building Information (Home.jsx)

Edit building descriptions in `src/screens/Home.jsx`

### Update Instructor Data (SearchRoom.jsx)

Modify the `instructorRooms` array in `src/screens/SearchRoom.jsx`:

```javascript
const instructorRooms = [
  {
    id: 1,
    instructorName: "Dr. Your Name",
    building: "Building Name",
    floor: "Floor Number",
    roomNumber: "Room Number",
    officeHours: "Days: Time",
    nearestLandmark: "Landmark",
    accessType: "Access Type",
  },
  // Add more instructors...
];
```

### Update Room Availability (RoomAvailability.jsx)

Modify the `availableRooms` array in `src/screens/RoomAvailability.jsx`

## 🎯 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🌐 Deployment

### Build for Production

```powershell
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy Options

1. **Vercel** (Recommended)

   - Connect your GitHub repo to Vercel
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Netlify**

   - Connect repo via Git
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **GitHub Pages**
   - Install: `npm install --save-dev gh-pages`
   - Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
   - Deploy: `npm run deploy`

## 🎨 Color Scheme

- **Primary**: `#ff8c42` (Orange)
- **Background**: `#000` (Black)
- **Text**: `#fff` (White)
- **Cards**: Gradient backgrounds (Green, Red, Blue, Gold)

## 👥 Team

- **Abdullah Meraj**
- **Ruqaya Siddiq**
- **Amro Elian**

Contact: gdsc@yu.edu.sa  
Location: Al Qassim Highway, Riyadh Region 11512

## 🔧 Troubleshooting

### Port Already in Use

Vite will automatically use the next available port (5174, 5175, etc.)

### Images Not Loading

- Ensure images are in the `public/` folder
- Check file names match exactly (case-sensitive)

### Routing Issues

- Use React Router's `<Link>` component, not `<a>` tags
- Verify all routes are defined in `App.jsx`

## 🚀 Future Enhancements

- [ ] Connect to real database for instructor/room data
- [ ] Add Google Maps integration
- [ ] Implement user authentication
- [ ] Class schedule integration
- [ ] Mobile app version
- [ ] QR code generation for rooms
- [ ] Real-time notifications

---

Made with ❤️ by the Campus Navigation Team
